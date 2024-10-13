require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/connectDB.js');
const webhookRoutes = require('./api/routes/webhookRoutes.js');
const errorHandler = require('./api/middlewares/errorHandler');

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