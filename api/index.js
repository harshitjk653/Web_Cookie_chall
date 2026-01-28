require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

// MongoDB Connection with caching for serverless
let cachedDb = null;

async function connectToDatabase() {
    if (cachedDb) {
        return cachedDb;
    }

    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jwt_ctf', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        });

        cachedDb = connection;
        console.log('MongoDB Connected');
        return connection;
    } catch (err) {
        console.log('MongoDB Connection Error:', err);
        throw err;
    }
}

// Routes
app.use('/api', require('../routes/auth'));

// Serve HTML files
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public', 'login.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, '../public', 'login.html')));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, '../public', 'register.html')));
app.get('/profile', (req, res) => res.sendFile(path.join(__dirname, '../public', 'profile.html')));
app.get('/Admin', (req, res) => res.sendFile(path.join(__dirname, '../public', 'Admin.html')));

// Profile API Logic (VULNERABLE BY DESIGN)
app.get('/api/profile', (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    try {
        // VULNERABILITY: Decoding the token without verifying the signature correctly
        // Or trusting the payload blindly after decoding.
        // We use jwt.decode() which DOES NOT verify the signature.
        const decoded = jwt.decode(token);

        if (!decoded) {
            return res.status(400).json({ message: 'Invalid token' });
        }

        const { username, role } = decoded;

        // If role is admin, show the flag
        if (role === 'admin') {
            return res.json({
                username,
                role,
                flag: process.env.FLAG || 'AKIRA{jwt_role_escalation_success}'
            });
        }

        // Return standard user info
        res.json({
            username,
            role,
            message: 'Access Denied: Admins Only'
        });

    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Token manipulation detected' });
    }
});

// Export for Vercel serverless
module.exports = async (req, res) => {
    await connectToDatabase();
    return app(req, res);
};
