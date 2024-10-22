import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './config/connectDB';
import webhookRoutes from './routes/webhookRoutes';
import errorHandler from './middlewares/errorHandler';

dotenv.config();

const app = express();
const PORT = 3000;

// Connect to MongoDB
connectDB();

app.use(cors()); // Enable CORS for all requests
app.use(express.json()); // Parse JSON body

// Use webhook routes
app.use('/', webhookRoutes);

// Use the error handler middleware
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});