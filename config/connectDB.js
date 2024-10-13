const mongoose = require('mongoose'); 
require('dotenv').config();

// Connect to MongoDB
const connectDB = async () => { 
    try {
        await mongoose.connect('mongodb://localhost:27017/consist', {});
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;

