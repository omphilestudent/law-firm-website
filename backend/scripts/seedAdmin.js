import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';
import User from '../models/User.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

async function run() {
  try {
    if (!process.env.MONGODB_URI) {
      console.error('MONGODB_URI is not set in environment');
      process.exit(1);
    }
    if (!process.env.JWT_SECRET) {
      console.warn('Warning: JWT_SECRET is not set. Set it before running the app.');
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const username = 'admins-inc'; // stored as lowercase
    const password = 'Genesis@2025!!';
    const existing = await User.findOne({ username });
    if (existing) {
      console.log('Admin user already exists:', existing.username);
    } else {
      const passwordHash = await bcrypt.hash(password, 10);
      const user = await User.create({
        username,
        name: 'GS Admin',
        email: 'admin@example.com',
        role: 'admin',
        passwordHash,
        active: true
      });
      console.log('Admin user created:', user.username);
    }

    await mongoose.connection.close();
    console.log('Done.');
    process.exit(0);
  } catch (err) {
    console.error('Seed admin failed:', err);
    process.exit(1);
  }
}

run();
