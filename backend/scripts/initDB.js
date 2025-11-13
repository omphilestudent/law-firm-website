import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const initDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(' Connected to database for initialization');


        await mongoose.connection.db.collection('contacts').createIndex({ email: 1 });
        await mongoose.connection.db.collection('appointments').createIndex({ preferredDate: 1, preferredTime: 1 });

        console.log(' Database indexes created');



        console.log(' Database initialization completed');
        process.exit(0);
    } catch (error) {
        console.error(' Database initialization failed:', error);
        process.exit(1);
    }
};

initDatabase();