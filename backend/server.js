require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const postRoutes = require('./routes/postRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Validation for Environment Variables
const requiredEnv = [
  'DB_CONNECT_STRING',
  'CLOUDINARY_NAME',
  'CLOUDINARY_KEY',
  'CLOUDINARY_SECRET'
];

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.error(`FATAL ERROR: Environment variable ${key} is missing in .env`);
    process.exit(1);
  }
});

// Middleware
const corsOptions = {
  origin: [
    process.env.FRONTEND_URL, 
    'http://localhost:5173', 
    'http://localhost:5174',
    'http://localhost:5175'
  ].filter(Boolean),
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/posts', postRoutes);

// Database Connection
const mongoURI = (process.env.DB_CONNECT_STRING || "").trim();

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });
