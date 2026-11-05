// ============================================================================
// LEO — Customer Authentication & Security Controller
// Features:
// 1. Password hashing with PBKDF2 (SHA-512, 100,000 iterations, 16-byte salt)
// 2. Stateless JSON Web Token (JWT) generation & verification
// 3. Register, Login, Profile & Session validation endpoints
// 4. Auth Middleware for protected endpoints
// ============================================================================

import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'leo_fashion_secret_jwt_signing_key_2026';

/**
 * Hash password with PBKDF2
 */
export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return { salt, hash };
}

/**
 * Verify password against salt and stored hash
 */
export function verifyPassword(password, salt, hash) {
  if (!password || !salt || !hash) return false;
  const verifyHash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return crypto.timingSafeEqual(Buffer.from(verifyHash, 'hex'), Buffer.from(hash, 'hex'));
}

/**
 * Generate standard base64url HMAC-SHA256 JWT
 */
export function generateToken(payload, expiresInMs = 7 * 24 * 60 * 60 * 1000) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const exp = Date.now() + expiresInMs;
  const body = { ...payload, exp };

  const b64Header = Buffer.from(JSON.stringify(header)).toString('base64url');
  const b64Body = Buffer.from(JSON.stringify(body)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(`${b64Header}.${b64Body}`)
    .digest('base64url');

  return `${b64Header}.${b64Body}.${signature}`;
}

/**
 * Verify JWT signature & expiration
 */
export function verifyToken(token) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;

  const [b64Header, b64Body, signature] = parts;
  const expectedSig = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(`${b64Header}.${b64Body}`)
    .digest('base64url');

  if (signature !== expectedSig) return null;

  try {
    const payload = JSON.parse(Buffer.from(b64Body, 'base64url').toString('utf8'));
    if (payload.exp && Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

/**
 * Express middleware to authenticate customer token
 */
export function authMiddleware(readDB) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      req.user = null;
      return next();
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    if (!decoded || !decoded.id) {
      req.user = null;
      return next();
    }

    const db = readDB();
    const user = (db.users || []).find(u => u.id === decoded.id);
    if (user) {
      const { passwordHash, salt, ...safeUser } = user;
      req.user = safeUser;
    } else {
      req.user = null;
    }
    next();
  };
}

/**
 * Express middleware that strictly requires authentication
 */
export function requireAuth(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'Customer authentication required' });
  }
  next();
}

/**
 * Register Customer Authentication Routes
 */
export function registerAuthRoutes(app, readDB, writeDB) {
  /**
   * POST /api/auth/register
   * Create new customer account
   */
  app.post('/api/auth/register', (req, res) => {
    try {
      const { name, email, phone, password, address } = req.body;

      if (!name || !name.trim()) {
        return res.status(400).json({ success: false, message: 'Full name is required' });
      }
      if (!email || !email.includes('@')) {
        return res.status(400).json({ success: false, message: 'Valid email address is required' });
      }
      if (!password || password.length < 6) {
        return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
      }

      const db = readDB();
      if (!db.users) db.users = [];
      if (!db.customers) db.customers = [];

      const cleanEmail = email.toLowerCase().trim();
      const existing = db.users.find(u => u.email.toLowerCase() === cleanEmail);
      if (existing) {
        return res.status(409).json({ success: false, message: 'An account with this email already exists' });
      }

      const { salt, hash: passwordHash } = hashPassword(password);
      const userId = `usr_${Date.now()}`;
      const addresses = [];

      if (address) {
        addresses.push({
          id: `addr-${Date.now()}`,
          name: 'Default Address',
          fullName: name.trim(),
          phone: phone || '',
          ...address,
          isDefault: true
        });
      }

      const newUser = {
        id: userId,
        name: name.trim(),
        email: cleanEmail,
        phone: phone || '',
        salt,
        passwordHash,
        isAdmin: cleanEmail === (process.env.ADMIN_DEFAULT_EMAIL || 'admin@leomenswear.com').toLowerCase(),
        joinedAt: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        addresses,
        createdAt: new Date().toISOString()
      };

      db.users.push(newUser);

      // Keep customers list in sync for admin operations
      db.customers.push({
        id: `CUST-${userId.slice(-5)}`,
        userId,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        joinedDate: new Date().toISOString().slice(0, 10),
        lastOrderDate: new Date().toISOString().slice(0, 10),
        tier: 'Bronze Member',
        totalSpent: 0,
        totalOrders: 0
      });

      writeDB(db);

      const token = generateToken({ id: newUser.id, email: newUser.email, isAdmin: newUser.isAdmin });
      const { passwordHash: _, salt: __, ...safeUser } = newUser;

      res.status(201).json({
        success: true,
        message: 'Account registered successfully',
        token,
        user: safeUser,
        data: { token, user: safeUser }
      });
    } catch (err) {
      console.error('Registration error:', err);
      res.status(500).json({ success: false, message: 'Registration failed due to server error' });
    }
  });

  /**
   * POST /api/auth/login
   * Authenticate existing customer
   */
  app.post('/api/auth/login', (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required' });
      }

      const db = readDB();
      const cleanEmail = email.toLowerCase().trim();
      const user = (db.users || []).find(u => u.email.toLowerCase() === cleanEmail || u.phone === cleanEmail);

      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }

      const isValid = verifyPassword(password, user.salt, user.passwordHash);
      if (!isValid) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }

      const token = generateToken({ id: user.id, email: user.email, isAdmin: user.isAdmin });
      const { passwordHash: _, salt: __, ...safeUser } = user;

      res.json({
        success: true,
        message: 'Login successful',
        token,
        user: safeUser,
        data: { token, user: safeUser }
      });
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ success: false, message: 'Login failed due to server error' });
    }
  });

  /**
   * GET /api/auth/me
   * Return authenticated customer profile
   */
  app.get('/api/auth/me', (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'No authentication token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ success: false, message: 'Token is invalid or expired' });
    }

    const db = readDB();
    const user = (db.users || []).find(u => u.id === decoded.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User account not found' });
    }

    const { passwordHash, salt, ...safeUser } = user;
    res.json({ success: true, user: safeUser, data: safeUser });
  });

  /**
   * PUT /api/auth/profile
   * Update address or customer profile
   */
  app.put('/api/auth/profile', (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ success: false, message: 'Invalid session' });
    }

    const db = readDB();
    const idx = (db.users || []).findIndex(u => u.id === decoded.id);
    if (idx === -1) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const current = db.users[idx];
    const updated = {
      ...current,
      name: req.body.name || current.name,
      phone: req.body.phone || current.phone,
      addresses: req.body.addresses || current.addresses
    };

    db.users[idx] = updated;
    writeDB(db);

    const { passwordHash, salt, ...safeUser } = updated;
    res.json({ success: true, user: safeUser });
  });

  /**
   * POST /api/auth/logout
   */
  app.post('/api/auth/logout', (req, res) => {
    res.json({ success: true, message: 'Logged out successfully' });
  });
}

