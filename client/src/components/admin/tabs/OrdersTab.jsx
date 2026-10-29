import React, { useState } from 'react';
import {
  Search,
  Eye,
  Download,
  Copy,
  Check,
  Plus,
  Trash2
} from 'lucide-react';
import { ORDER_STATUS_FLOW, exportToCsv } from '../adminData';

const OrdersTab = ({
  orders = [],
  onUpdateOrderStatus,
  onCreateOrder,
  onDeleteOrder,
  triggerToast
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [newOrder, setNewOrder] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400050',
    addressLine: '',
    productTitle: 'LEO 240 GSM Oversized Tee',
    size: 'L',
    quantity: 1,
    totalAmount: 999,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    status: 'Placed'
  });

  const getOrderStatus = (o) => o.status || o.orderStatus || 'Placed';
  const getCustomerName = (o) => o.customer?.name || o.customerName || 'Customer';
  const getCustomerEmail = (o) => o.customer?.email || o.customerEmail || 'customer@leofashion.in';
  const getCustomerPhone = (o) => o.customer?.phone || o.customerPhone || '+91 98201 44521';

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    const status = getOrderStatus(o);
    const custName = getCustomerName(o);
    const custPhone = getCustomerPhone(o);
    const city = o.shippingAddress?.city || '';
    const q = search.toLowerCase();

    const matchSearch =
      !q ||
      (o.id && o.id.toLowerCase().includes(q)) ||
      custName.toLowerCase().includes(q) ||
      custPhone.includes(search) ||
      city.toLowerCase().includes(q);

    const matchStatus = statusFilter === 'all' || status === statusFilter;
    const matchPayment = paymentFilter === 'all' || (o.paymentStatus || 'Paid') === paymentFilter;

    return matchSearch && matchStatus && matchPayment;
  });

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportCsv = () => {
    const headers = ['Order ID', 'Date', 'Customer Name', 'Phone', 'City', 'Status', 'Payment Method', 'Payment Status', 'Items Count', 'Total (INR)'];
    const rows = filteredOrders.map(o => [
      o.id,
      o.createdAt ? new Date(o.createdAt).toLocaleDateString() : '2026-10-28',
      getCustomerName(o),
      getCustomerPhone(o),
      o.shippingAddress?.city || 'Mumbai',
      getOrderStatus(o),
      o.paymentMethod || 'UPI',
      o.paymentStatus || 'Paid',
      o.items?.length || 1,
      o.totalAmount || 1599
    ]);
    exportToCsv('leo_customer_orders', headers, rows);
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (onCreateOrder) {
      await onCreateOrder({
        customerName: newOrder.customerName,
        customerEmail: newOrder.customerEmail,
        customerPhone: newOrder.customerPhone,
        customer: {
          name: newOrder.customerName,
          email: newOrder.customerEmail,
          phone: newOrder.customerPhone
        },
        shippingAddress: {
          addressLine: newOrder.addressLine || 'Flat 402, Sea Green Heights',
          city: newOrder.city,
          state: newOrder.state,
          pincode: newOrder.pincode
        },
        items: [
          {
            title: newOrder.productTitle,
            size: newOrder.size,
            quantity: Number(newOrder.quantity) || 1,
            price: Number(newOrder.totalAmount) || 999
          }
        ],
        totalAmount: Number(newOrder.totalAmount) || 999,
        paymentMethod: newOrder.paymentMethod,
        paymentStatus: newOrder.paymentStatus,
        status: newOrder.status
      });
    }
    setIsCreateModalOpen(false);
    setNewOrder({
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050',
      addressLine: '',
      productTitle: 'LEO 240 GSM Oversized Tee',
      size: 'L',
      quantity: 1,
      totalAmount: 999,
      paymentMethod: 'UPI',
      paymentStatus: 'Paid',
      status: 'Placed'
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              Order Fulfillment & Shipments ({filteredOrders.length})
            </h2>
            <span className="bg-blue-100 text-blue-900 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-200">
              7-Step Pipeline
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Create manual orders, update live fulfillment statuses, inspect order timelines, or remove test orders
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-stretch sm:self-auto">
          <button
            onClick={handleExportCsv}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer justify-center border border-slate-200/60"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2 text-xs font-bold text-[#0f142b] bg-[#dec562] hover:bg-[#c9b150] rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer justify-center"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Create Order</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Order #, Customer Name, Phone, City..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-medium"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-semibold text-slate-700"
        >
          <option value="all">All Order Statuses</option>
          {ORDER_STATUS_FLOW.map(s => <option key={s} value={s}>{s}</option>)}
          <option value="Cancelled">Cancelled</option>
        </select>

        <select
          value={paymentFilter}
          onChange={(e) => setPaymentFilter(e.target.value)}
          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-semibold text-slate-700"
        >
          <option value="all">All Payment Statuses</option>
          <option value="Paid">Paid (Prepaid UPI/Card)</option>
          <option value="Pending">Pending (COD Verification)</option>
          <option value="Refunded">Refunded</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/90 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-4">Order ID & Date</th>
                <th className="p-4">Customer & City</th>
                <th className="p-4">Items / Details</th>
                <th className="p-4">Payment & Amount</th>
                <th className="p-4">Fulfillment Status</th>
                <th className="p-4">Courier & Tracking</th>
                <th className="p-4 text-right">CRUD Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredOrders.map((ord) => {
                const status = getOrderStatus(ord);
                const custName = getCustomerName(ord);
                const custPhone = getCustomerPhone(ord);
                const dateStr = ord.createdAt
                  ? new Date(ord.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                  : 'Today, 10:24 AM';

                return (
                  <tr key={ord.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Order ID */}
                    <td className="p-4">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-black text-slate-900 text-xs">#{ord.id}</span>
                        <button
                          onClick={() => handleCopy(ord.id)}
                          className="text-slate-400 hover:text-slate-600 cursor-pointer"
                          title="Copy ID"
                        >
                          {copiedId === ord.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">{dateStr}</p>
                    </td>

                    {/* Customer */}
                    <td className="p-4">
                      <p className="font-bold text-slate-900 truncate max-w-[150px]">
                        {custName}
                      </p>
                      <p className="text-[10px] text-slate-500">{ord.shippingAddress?.city || 'Mumbai'}</p>
                      <p className="text-[10px] text-slate-400">{custPhone}</p>
                    </td>

                    {/* Items */}
                    <td className="p-4">
                      <span className="font-bold text-slate-800">
                        {ord.items?.length || 1} {ord.items?.length === 1 ? 'item' : 'items'}
                      </span>
                      <p className="text-[10px] text-slate-500 truncate max-w-[180px]">
                        {ord.items?.[0]?.title || 'LEO Menswear Staple'}
                      </p>
                    </td>

                    {/* Payment */}
                    <td className="p-4">
                      <div className="font-black text-slate-900 text-xs">₹{ord.totalAmount || 1599}</div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                          (ord.paymentStatus || 'Paid') === 'Paid'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {ord.paymentStatus || 'Paid'}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">({ord.paymentMethod || 'UPI'})</span>
                      </div>
                    </td>

                    {/* Status with dropdown */}
                    <td className="p-4">
                      <select
                        value={status}
                        onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value)}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                          status === 'Delivered'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : status === 'Shipped' || status === 'Out for Delivery'
                            ? 'bg-blue-50 text-blue-800 border-blue-300'
                            : status === 'Cancelled'
                            ? 'bg-rose-50 text-rose-800 border-rose-300'
                            : 'bg-amber-50 text-amber-800 border-amber-300'
                        }`}
                      >
                        {ORDER_STATUS_FLOW.map(s => <option key={s} value={s}>{s}</option>)}
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>

                    {/* Courier & Tracking */}
                    <td className="p-4">
                      <p className="font-semibold text-slate-800 text-[11px]">
                        {ord.courier || 'BlueDart Express'}
                      </p>
                      <p className="font-mono text-[10px] text-slate-400">
                        {ord.trackingNumber || `BD-${ord.id?.slice(-6) || '88102'}`}
                      </p>
                    </td>

                    {/* Action */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedOrder(ord)}
                          className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Details</span>
                        </button>
                        {onDeleteOrder && (
                          <button
                            onClick={() => onDeleteOrder(ord.id)}
                            className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete Order"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Order Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">Create New Customer Order</h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Customer Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rohan Mehta"
                    value={newOrder.customerName}
                    onChange={(e) => setNewOrder({ ...newOrder, customerName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    placeholder="+91 98201 11223"
                    value={newOrder.customerPhone}
                    onChange={(e) => setNewOrder({ ...newOrder, customerPhone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="rohan@example.com"
                    value={newOrder.customerEmail}
                    onChange={(e) => setNewOrder({ ...newOrder, customerEmail: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-bold mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={newOrder.city}
                    onChange={(e) => setNewOrder({ ...newOrder, city: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-slate-600 font-bold mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    value={newOrder.productTitle}
                    onChange={(e) => setNewOrder({ ...newOrder, productTitle: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Size</label>
                  <select
                    value={newOrder.size}
                    onChange={(e) => setNewOrder({ ...newOrder, size: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                  >
                    {['S', 'M', 'L', 'XL', 'XXL'].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Total Amount (₹)</label>
                  <input
                    type="number"
                    required
                    value={newOrder.totalAmount}
                    onChange={(e) => setNewOrder({ ...newOrder, totalAmount: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Payment Method</label>
                  <select
                    value={newOrder.paymentMethod}
                    onChange={(e) => setNewOrder({ ...newOrder, paymentMethod: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                  >
                    <option value="UPI">UPI</option>
                    <option value="Card">Credit/Debit Card</option>
                    <option value="COD">Cash on Delivery</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Initial Status</label>
                  <select
                    value={newOrder.status}
                    onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                  >
                    {ORDER_STATUS_FLOW.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-[#0f142b] bg-[#dec562] hover:bg-[#c9b150] rounded-lg font-bold cursor-pointer"
                >
                  Create Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Details Modal with Timeline Stepper */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-black text-slate-900">Order #{selectedOrder.id}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    getOrderStatus(selectedOrder) === 'Delivered'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {getOrderStatus(selectedOrder)}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Placed on {selectedOrder.createdAt ? new Date(selectedOrder.createdAt).toLocaleString() : '2026-10-28 10:24 AM'}
                </p>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm cursor-pointer p-1"
              >
                ✕
              </button>
            </div>

            {/* Visual 7-Step Timeline Stepper */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-3">
                Order Timeline Flow
              </h4>
              <div className="grid grid-cols-7 gap-1 text-center">
                {ORDER_STATUS_FLOW.map((step, idx) => {
                  const currentIdx = ORDER_STATUS_FLOW.indexOf(getOrderStatus(selectedOrder));
                  const isDone = currentIdx >= idx;
                  const isCurrent = currentIdx === idx;

                  return (
                    <div key={step} className="flex flex-col items-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold mb-1 transition-all ${
                        isDone
                          ? 'bg-emerald-500 text-white shadow-xs'
                          : 'bg-slate-200 text-slate-500'
                      } ${isCurrent ? 'ring-2 ring-emerald-300 ring-offset-1' : ''}`}>
                        {isDone ? '✓' : idx + 1}
                      </div>
                      <span className={`text-[9px] leading-tight ${isCurrent ? 'font-black text-slate-900' : 'text-slate-400'}`}>
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Customer & Shipping Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Customer Details</span>
                <p className="font-bold text-slate-900 text-sm">{getCustomerName(selectedOrder)}</p>
                <p className="text-slate-600">{getCustomerEmail(selectedOrder)}</p>
                <p className="text-slate-600">{getCustomerPhone(selectedOrder)}</p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Delivery Address</span>
                <p className="font-bold text-slate-900">{selectedOrder.shippingAddress?.addressLine || 'Flat 402, Sea Green Heights'}</p>
                <p className="text-slate-600">
                  {selectedOrder.shippingAddress?.city || 'Mumbai'}, {selectedOrder.shippingAddress?.state || 'Maharashtra'} - {selectedOrder.shippingAddress?.pincode || '400050'}
                </p>
                <p className="text-[11px] text-blue-600 font-semibold mt-1">
                  Courier: {selectedOrder.courier || 'BlueDart Express'} • Tracking: {selectedOrder.trackingNumber || 'BD-882109'}
                </p>
              </div>
            </div>

            {/* Order Items */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Purchased Items</span>
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                {(selectedOrder.items && selectedOrder.items.length > 0
                  ? selectedOrder.items
                  : [
                      {
                        title: 'LEO Classic Polo T-Shirt',
                        price: 799,
                        quantity: 2,
                        size: 'L',
                        color: 'Navy Blue',
                        image: '/images/products/POLOPDP-5_5c355606-1884-4943-b73a-f1503bc04014.jpg'
                      }
                    ]
                ).map((item, i) => (
                  <div key={i} className="p-3 flex items-center justify-between text-xs hover:bg-slate-50">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image || '/images/products/POLOPDP-5_5c355606-1884-4943-b73a-f1503bc04014.jpg'}
                        alt={item.title}
                        className="w-10 h-10 object-cover rounded-lg bg-slate-100 border"
                      />
                      <div>
                        <p className="font-bold text-slate-900">{item.title}</p>
                        <p className="text-[10px] text-slate-400">Size: {item.size || 'M'} • Color: {item.color || 'Standard'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-slate-900">₹{item.price}</span>
                      <p className="text-[10px] text-slate-400">Qty: {item.quantity || 1}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Summary */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <span className="font-bold text-slate-600">Total Order Amount (incl. Taxes & Shipping)</span>
              <span className="text-base font-black text-slate-900">₹{selectedOrder.totalAmount || 1599}</span>
            </div>

            {/* Actions footer */}
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => {
                  onUpdateOrderStatus(selectedOrder.id, 'Cancelled');
                  setSelectedOrder(null);
                }}
                className="px-3.5 py-2 text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                Cancel Order
              </button>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2 text-white bg-slate-900 hover:bg-black rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersTab;
