import mongoose from 'mongoose';

const roles = ['admin', 'attorney', 'receptionist', 'employee'];

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minlength: 3,
    maxlength: 50
  },
  name: {
    type: String,
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/, 'Please provide a valid email']
  },
  phone: {
    type: String,
    trim: true,
    maxlength: 30
  },
  role: {
    type: String,
    enum: roles,
    required: true,
    default: 'employee'
  },
  passwordHash: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  },
  lastLoginAt: {
    type: Date
  }
}, { timestamps: true });

userSchema.index({ role: 1 });

export const USER_ROLES = roles;
const User = mongoose.model('User', userSchema);
export default User;
