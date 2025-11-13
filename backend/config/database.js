import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        console.log(`📊 Database: ${conn.connection.name}`);

        mongoose.connection.on('error', (err) => {
            console.error('❌ MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('⚠️ MongoDB disconnected');
        });

        mongoose.connection.on('reconnected', () => {
            console.log('🔄 MongoDB reconnected');
        });

        process.on('SIGINT', async () => {
            try {
                await mongoose.connection.close();
                console.log('📦 MongoDB connection closed through app termination');
                process.exit(0);
            } catch (error) {
                console.error('Error closing MongoDB connection:', error);
                process.exit(1);
            }
        });

    } catch (error) {
        console.error(`❌ Database connection failed: ${error.message}`);
        console.log('💡 Make sure:');
        console.log('   1. MongoDB is running');
        console.log('   2. Your MONGODB_URI in .env is correct');
        console.log('   3. Your IP is whitelisted (if using MongoDB Atlas)');
        process.exit(1);
    }
};

export default connectDB;