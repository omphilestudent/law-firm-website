import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { signAccessToken } from '../utils/jwt.js';

const COOKIE_NAME = 'access_token';

const cookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 24 * 60 * 60 * 1000 // 1 day
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required' });
    }

    const user = await User.findOne({ username: username.toLowerCase() });
    if (!user || !user.active) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    user.lastLoginAt = new Date();
    await user.save();

    const token = signAccessToken({ sub: user._id.toString(), role: user.role });
    res.cookie(COOKIE_NAME, token, cookieOptions);
    return res.json({ success: true, data: { id: user._id, username: user.username, name: user.name, role: user.role } });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Login failed' });
  }
};

export const logout = async (req, res) => {
  res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: 0 });
  return res.json({ success: true });
};

export const me = async (req, res) => {
  if (!req.user) return res.status(401).json({ success: false, message: 'Not authenticated' });
  const user = await User.findById(req.user.id).select('-passwordHash');
  return res.json({ success: true, data: user });
};
