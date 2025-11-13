import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/database.js';

dotenv.config();

const exit = (code) => {
  setTimeout(() => process.exit(code), 0);
};

const run = async () => {
  console.log('🔍 Testing MongoDB connection...');
  console.log(`🌎 NODE_ENV: ${process.env.NODE_ENV || 'development'}`);

  if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI is not set in your .env file.');
    console.error('   Please add MONGODB_URI in your .env file.');
    return exit(1);
  }

  const started = Date.now();
  try {
    await connectDB();

    await mongoose.connection.db.admin().command({ ping: 1 });

    const { host, name } = mongoose.connection;
    const ms = Date.now() - started;
    console.log(`✅ Connected to MongoDB @ ${host}, db: ${name} (${ms} ms)`);
    console.log('📡 Ping successful');

    return exit(0);
  } catch (err) {
    console.error('❌ Database connection test failed:');
    console.error(err?.message || err);
    console.log('💡 Troubleshooting tips:');
    console.log('   1) Is MongoDB running/accessible?');
    console.log('   2) Is your MONGODB_URI correct in .env?');
    console.log('   3) If using MongoDB Atlas, is your IP whitelisted?');
    return exit(1);
  } finally {
    try {
      if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.close();
        console.log('📦 MongoDB connection closed');
      }
    } catch (closeErr) {
      console.warn('Warning while closing MongoDB connection:', closeErr?.message || closeErr);
    }
  }
};

run();
