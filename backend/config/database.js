import mogoose from 'mongoose';

const connectDB = async () => {
    try{
        const conn = await monogoose.connect(process.env.MONGO_URI,{
            userNewUrlParser: true,
            useUnifiedTopology: true,
            });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }catch(error){
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;