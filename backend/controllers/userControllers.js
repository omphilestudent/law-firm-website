import bcrypt from 'bcryptjs';
import User, { USER_ROLES } from '../models/User.js';
import AuditLog from '../models/AuditLog.js';

export const listUsers = async (req, res) => {
  const users = await User.find().select('-passwordHash').sort({ createdAt: -1 });
  res.json({ success: true, data: users });
};

export const createUser = async (req, res) => {
  try {
    const { username, name, email, phone, role = 'employee', password, active = true } = req.body;
    if (!username || !password || !USER_ROLES.includes(role)) {
      return res.status(400).json({ success: false, message: 'username, password, and valid role are required' });
    }
    const exists = await User.findOne({ username: username.toLowerCase() });
    if (exists) return res.status(400).json({ success: false, message: 'Username already exists' });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ username: username.toLowerCase(), name, email, phone, role, passwordHash, active });
    await AuditLog.create({ actor: req.user.id, action: 'user.created', entityType: 'User', entityId: user._id, metadata: { role } });
    res.status(201).json({ success: true, data: { id: user._id, username: user.username, role: user.role } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to create user' });
  }
};

export const getUser = async (req, res) => {
  const user = await User.findById(req.params.id).select('-passwordHash');
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });
  res.json({ success: true, data: user });
};

export const updateUser = async (req, res) => {
  try {
    const { name, email, phone, role, active } = req.body;
    const update = {};
    if (name !== undefined) update.name = name;
    if (email !== undefined) update.email = email;
    if (phone !== undefined) update.phone = phone;
    if (role !== undefined) {
      if (!USER_ROLES.includes(role)) return res.status(400).json({ success: false, message: 'Invalid role' });
      update.role = role;
    }
    if (active !== undefined) update.active = !!active;
    const user = await User.findByIdAndUpdate(req.params.id, update, { new: true }).select('-passwordHash');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    await AuditLog.create({ actor: req.user.id, action: 'user.updated', entityType: 'User', entityId: user._id, metadata: update });
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update user' });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    if (!password || password.length < 8) return res.status(400).json({ success: false, message: 'Password too short' });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.findByIdAndUpdate(req.params.id, { passwordHash }, { new: true });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    await AuditLog.create({ actor: req.user.id, action: 'user.password_reset', entityType: 'User', entityId: user._id });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to reset password' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    await AuditLog.create({ actor: req.user.id, action: 'user.deleted', entityType: 'User', entityId: user._id });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete user' });
  }
};
