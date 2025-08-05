const express = require('express');
const cors = require('cors');
const connectDB = require('./config');
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Connect MongoDB
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
