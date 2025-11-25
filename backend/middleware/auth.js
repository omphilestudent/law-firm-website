import { verifyToken } from '../utils/jwt.js';
import User from '../models/User.js';

export const requireAuth = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    const token = req.cookies?.access_token || (header?.startsWith('Bearer ') ? header.slice(7) : null);
    if (!token) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }
    const payload = verifyToken(token);
    const user = await User.findById(payload.sub);
    if (!user || !user.active) {
      return res.status(401).json({ success: false, message: 'Invalid or inactive user' });
    }
    req.user = { id: user._id.toString(), role: user.role, username: user.username, name: user.name };
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

export const requireRole = (...roles) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ success: false, message: 'Authentication required' });
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ success: false, message: 'Insufficient permissions' });
  }
  next();
};
