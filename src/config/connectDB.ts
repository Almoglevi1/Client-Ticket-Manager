import mongoose from 'mongoose';

// Connect to MongoDB
const connectDB = async () => { 
    try {
        await mongoose.connect('mongodb://localhost:27017/consist', {});
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${(error as Error).message}`);
        // Exit the process with an error
        process.exit(1);
    }
};

export default connectDB;

