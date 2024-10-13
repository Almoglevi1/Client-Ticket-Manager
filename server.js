import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './config/connectDB.js';
import webhookRoutes from './api/routes/webhookRoutes.js';
import errorHandler from './api/middlewares/errorHandler.js';

dotenv.config();

const app = express();
const port = 3000;

// Connect to MongoDB
connectDB();

app.use(cors()); // Enable CORS for all requests
app.use(express.json()); // Parse JSON body

// Use webhook routes
app.use('/', webhookRoutes);

// Use the error handler middleware
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});