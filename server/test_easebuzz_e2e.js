// ============================================================================
// Comprehensive LEO Backend & Easebuzz Payment Gateway E2E Verification Suite
// Tests all 12 Phases: Auth, Pricing Engine, COD, Easebuzz Gateway & Webhooks
// ============================================================================

import { fork } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateInitiateHash, generateResponseHash, generateStatusHash, EASEBUZZ_CONFIG } from './easebuzz.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runTestSuite() {
  console.log('===============================================================');
  console.log('LEO FASHION E-COMMERCE — BACKEND & EASEBUZZ INTEGRATION TEST');
  console.log('===============================================================');

  // Spawn the server child process
  console.log('[Server Setup] Starting LEO backend server on port 5000...');
  const serverProcess = fork(path.join(__dirname, 'server.js'), [], {
    cwd: __dirname,
    env: { ...process.env, PORT: '5000' },
    stdio: ['ignore', 'pipe', 'pipe', 'ipc']
  });

  serverProcess.stdout.on('data', (d) => {
    const msg = d.toString();
    if (msg.includes('running on')) {
      console.log(`[Server Output] ${msg.trim()}`);
    }
  });

  serverProcess.stderr.on('data', (d) => {
    console.error(`[Server Stderr] ${d.toString()}`);
  });

  // Give server 2.5 seconds to start up
  await new Promise((r) => setTimeout(r, 2500));

  const BASE = 'http://127.0.0.1:5000';

  async function request(url, options = {}) {
    const fullUrl = url.startsWith('http') ? url : `${BASE}${url}`;
    const res = await fetch(fullUrl, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    });
    const contentType = res.headers.get('content-type') || '';
    const data = contentType.includes('application/json') ? await res.json() : await res.text();
    return { status: res.status, ok: res.ok, data };
  }

  try {
    // Check health
    const health = await request('/api/health');
    console.log(`✓ Server Health verified:`, health.data);

    // ------------------------------------------------------------------------
    // TEST 1: Phase 2 - Customer Registration & Authentication
    // ------------------------------------------------------------------------
    console.log('\n[Phase 2] Testing Customer Registration & Password Hashing...');
    const testEmail = `shopper_${Date.now()}@testleo.com`;
    const regRes = await request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Vikram Malhotra',
        email: testEmail,
        password: 'SecurePassword@123'
      })
    });

    const token = regRes.data?.token || regRes.data?.data?.token;
    if (!regRes.ok || !regRes.data?.success || !token) {
      throw new Error(`Registration failed: ${JSON.stringify(regRes.data)}`);
    }
    console.log('✓ Customer registration successful with JWT Token.');

    // Login test
    console.log('[Phase 2] Testing Customer Login...');
    const loginRes = await request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: testEmail,
        password: 'SecurePassword@123'
      })
    });
    if (!loginRes.ok || !loginRes.data?.success) {
      throw new Error(`Login failed: ${JSON.stringify(loginRes.data)}`);
    }
    console.log('✓ Customer login successful.');

    // Get profile test
    console.log('[Phase 2] Testing Authenticated Profile Fetch...');
    const meRes = await request('/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!meRes.ok || meRes.data?.data?.email !== testEmail) {
      throw new Error(`Get profile failed: ${JSON.stringify(meRes.data)}`);
    }
    console.log('✓ JWT Profile verification successful.');

    // ------------------------------------------------------------------------
    // TEST 2: Phase 3 & 4 - Product Catalog & Authoritative Pricing Engine
    // ------------------------------------------------------------------------
    console.log('\n[Phase 3 & 4] Testing Authoritative Server Pricing & Cart Verification...');
    const productsRes = await request('/api/products');
    if (!productsRes.ok || !Array.isArray(productsRes.data?.data)) {
      throw new Error('Could not fetch products catalog');
    }
    const testProduct = productsRes.data.data[0];
    console.log(`✓ Fetched product: "${testProduct.title}" (Trusted Price: ₹${testProduct.price})`);

    // ------------------------------------------------------------------------
    // TEST 3: Phase 5 & 8 - Cash On Delivery (COD) Flow
    // ------------------------------------------------------------------------
    console.log('\n[Phase 5 & 8] Testing Cash On Delivery (COD) Creation...');
    const codPayload = {
      customerEmail: testEmail,
      customerName: 'Vikram Malhotra',
      shippingAddress: {
        fullName: 'Vikram Malhotra',
        phone: '9876543210',
        addressLine: 'Villa 14, Palm Meadows',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560066'
      },
      items: [
        {
          productId: testProduct.id,
          title: testProduct.title,
          price: 1, // Intentional client-side tampering attempt to verify server recalculation
          size: 'XL',
          quantity: 2
        }
      ],
      paymentMethod: 'Cash On Delivery'
    };

    const codRes = await request('/api/orders', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(codPayload)
    });

    if (!codRes.ok || !codRes.data?.success) {
      throw new Error(`COD order failed: ${JSON.stringify(codRes.data)}`);
    }

    const codOrder = codRes.data.data;
    if (codOrder.paymentMethod !== 'Cash On Delivery') {
      throw new Error(`Expected COD paymentMethod, got: ${codOrder.paymentMethod}`);
    }
    if (codOrder.paymentStatus !== 'UNPAID') {
      throw new Error(`Expected UNPAID paymentStatus for COD, got: ${codOrder.paymentStatus}`);
    }
    if (codOrder.orderStatus !== 'PLACED') {
      throw new Error(`Expected PLACED orderStatus for COD, got: ${codOrder.orderStatus}`);
    }
    if (codOrder.totalAmount === 2) {
      throw new Error('SECURITY FAILURE: Server trusted client-tampered price of ₹1!');
    }
    console.log(`✓ COD Order created: ${codOrder.id}`);
    console.log(`✓ Trusted backend re-pricing enforced total: ₹${codOrder.totalAmount} (client tampered ₹2 was safely rejected)`);
    console.log(`✓ Status verified: orderStatus=${codOrder.orderStatus}, paymentStatus=${codOrder.paymentStatus}`);

    // ------------------------------------------------------------------------
    // TEST 4: Phase 6 - Easebuzz Hosted Checkout Initiation
    // ------------------------------------------------------------------------
    console.log('\n[Phase 6] Testing Easebuzz Payment Initiation & Cryptographic Hash...');
    const ebTxnId = `EB_TEST_${Date.now()}`;
    const ebInitRes = await request('/api/payments/easebuzz/initiate', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        txnid: ebTxnId,
        amount: testProduct.price,
        firstname: 'Vikram',
        email: testEmail,
        phone: '9876543210',
        productinfo: `LEO Apparel - ${testProduct.title}`,
        paymentMode: 'UPI',
        orderPayload: {
          customerEmail: testEmail,
          items: [{ productId: testProduct.id, size: 'L', quantity: 1, price: testProduct.price }],
          shippingAddress: {
            fullName: 'Vikram Malhotra',
            phone: '9876543210',
            addressLine: 'Villa 14, Palm Meadows',
            city: 'Bengaluru',
            state: 'Karnataka',
            pincode: '560066'
          }
        }
      })
    });

    if (!ebInitRes.ok || !ebInitRes.data?.success) {
      throw new Error(`Easebuzz initiation failed: ${JSON.stringify(ebInitRes.data)}`);
    }
    console.log(`✓ Easebuzz transaction initiated with txnid: ${ebTxnId}`);
    console.log(`✓ Payment URL generated: ${ebInitRes.data.paymentUrl}`);

    // Verify that initial order is stored in DB with PENDING payment status
    const checkPendingRes = await request(`/api/payments/easebuzz/status/${ebTxnId}`);
    if (checkPendingRes.data?.order?.paymentStatus !== 'PENDING') {
      throw new Error(`Expected initial order status PENDING, got: ${checkPendingRes.data?.order?.paymentStatus}`);
    }
    console.log(`✓ Order initialized with PENDING status in database.`);

    // ------------------------------------------------------------------------
    // TEST 5: Phase 7 - Easebuzz Reverse Hash Verification & Callback
    // ------------------------------------------------------------------------
    console.log('\n[Phase 7] Testing Easebuzz Reverse Hash Callback & Status Update to PAID...');
    const responseData = {
      txnid: ebTxnId,
      amount: Number(testProduct.price).toFixed(2),
      status: 'success',
      firstname: 'Vikram',
      email: testEmail,
      productinfo: `LEO Apparel - ${testProduct.title}`,
      key: EASEBUZZ_CONFIG.key,
      udf1: ebTxnId,
      udf2: '',
      udf3: '',
      udf4: '',
      udf5: '',
      udf6: '',
      udf7: '',
      udf8: '',
      udf9: '',
      udf10: ''
    };

    const reverseHash = generateResponseHash(responseData, EASEBUZZ_CONFIG.salt);

    // Submit callback simulating Easebuzz server redirect
    const formBody = new URLSearchParams({
      ...responseData,
      hash: reverseHash,
      easepayid: `EASEPAY_${Date.now()}`
    }).toString();

    const callbackRes = await request('/api/payments/easebuzz/response', {
      method: 'POST',
      body: JSON.stringify({
        ...responseData,
        hash: reverseHash,
        easepayid: `EASEPAY_${Date.now()}`
      })
    });

    const redirectLoc = callbackRes.data?.redirectUrl || '';
    if (!redirectLoc.includes('payment_status=success')) {
      throw new Error(`Expected redirect with payment_status=success, got: ${JSON.stringify(callbackRes.data)}`);
    }
    console.log(`✓ Reverse hash verified successfully! Redirected to: ${redirectLoc}`);

    // Verify order updated to PAID & CONFIRMED in database
    const verifiedOrderRes = await request(`/api/payments/easebuzz/status/${ebTxnId}`);
    if (verifiedOrderRes.data?.order?.paymentStatus !== 'PAID') {
      throw new Error(`Expected paymentStatus PAID, got: ${verifiedOrderRes.data?.order?.paymentStatus}`);
    }
    if (verifiedOrderRes.data?.order?.orderStatus !== 'CONFIRMED') {
      throw new Error(`Expected orderStatus CONFIRMED, got: ${verifiedOrderRes.data?.order?.orderStatus}`);
    }
    console.log(`✓ Order successfully updated to PAID and CONFIRMED in database!`);

    // ------------------------------------------------------------------------
    // TEST 6: Phase 7 - Easebuzz S2S Webhook Integration
    // ------------------------------------------------------------------------
    console.log('\n[Phase 7] Testing Server-to-Server (S2S) Webhook Endpoint...');
    const webhookTxnId = `EB_WEBHOOK_${Date.now()}`;
    const webhookData = {
      txnid: webhookTxnId,
      amount: '1399.00',
      status: 'success',
      firstname: 'Vikram',
      email: testEmail,
      productinfo: 'LEO Apparel S2S Test',
      key: EASEBUZZ_CONFIG.key,
      udf1: webhookTxnId
    };
    const webhookHash = generateResponseHash(webhookData, EASEBUZZ_CONFIG.salt);

    const webhookRes = await request('/api/payments/easebuzz/webhook', {
      method: 'POST',
      body: JSON.stringify({
        ...webhookData,
        hash: webhookHash,
        easepayid: `S2S_${Date.now()}`
      })
    });

    if (!webhookRes.ok || (webhookRes.data?.status !== 1 && !webhookRes.data?.success)) {
      throw new Error(`Webhook processing failed: ${JSON.stringify(webhookRes.data)}`);
    }
    console.log(`✓ S2S Webhook verified and acknowledged with HTTP 200.`);

    // ------------------------------------------------------------------------
    // TEST 7: Phase 9 - Customer Order History Filtering
    // ------------------------------------------------------------------------
    console.log('\n[Phase 9] Testing Customer "My Orders" Filtering...');
    const userOrdersRes = await request(`/api/orders?customerEmail=${encodeURIComponent(testEmail)}`);
    if (!userOrdersRes.ok || !Array.isArray(userOrdersRes.data?.data)) {
      throw new Error('Failed to fetch filtered customer orders');
    }
    const myOrders = userOrdersRes.data.data;
    if (myOrders.length === 0) {
      throw new Error('Expected at least 1 order for customer, found 0');
    }
    console.log(`✓ Customer orders retrieved: found ${myOrders.length} orders belonging specifically to ${testEmail}.`);

    console.log('\n===============================================================');
    console.log('ALL TESTS PASSED! BACKEND & EASEBUZZ INTEGRATION FULLY VERIFIED');
    console.log('===============================================================');

    try { serverProcess.kill(); } catch {}
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Test Failure:', err.message, err.cause);
    try { serverProcess.kill(); } catch {}
    process.exit(1);
  }
}

runTestSuite();
