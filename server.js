const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// config
dotenv.config();

// app
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
const authMiddleware = require('./middleware/authMiddleware');



// routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
})
.catch((error) => {
    console.log('MongoDB connection error:', error);
});

// Protected route (testing JWT authMiddleware)
app.get('/api/auth/protected', authMiddleware, (req, res) => {
    res.json({ message: `Hello ${req.user.id}, you are authorized ✅` });
});

