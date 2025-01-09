const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true,
    })
);
app.options('*', cors());

// Database Path
const dbPath = process.env.NODE_ENV === 'production'
    ? '/tmp/database.sqlite'
    : path.resolve(__dirname, 'database.sqlite');

// Ensure Database File Exists
if (!fs.existsSync(dbPath)) {
    console.error('Database file not found. Creating a new one...');
    fs.writeFileSync(dbPath, '');
}

// Connect to SQLite Database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to SQLite database:', err.message);
    } else {
        console.log('Connected to SQLite database');
    }
});

// Configure Database Timeout
db.configure('busyTimeout', 5000); // 5 seconds

// Create Users Table if Not Exists
db.run(
    `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        mobileNumber TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    )`,
    (err) => {
        if (err) {
            console.error('Error creating users table:', err.message);
        } else {
            console.log('Users table ready');
        }
    }
);

// Middleware for Request Logging
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - Start`);
    res.on('finish', () => {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - Finished`);
    });
    next();
});

// Register Endpoint
app.post('/register', async (req, res) => {
    const { firstName, lastName, mobileNumber, password } = req.body;

    if (!firstName || !lastName || !mobileNumber || !password) {
        return res.status(400).send('All fields are required');
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.get(`SELECT * FROM users WHERE mobileNumber = ?`, [mobileNumber], (err, row) => {
            if (err) {
                console.error('Error checking user existence:', err.message);
                return res.status(500).send('Error registering user');
            }

            if (row) {
                return res.status(400).send('Mobile number already registered');
            }

            db.run(
                `INSERT INTO users (firstName, lastName, mobileNumber, password) VALUES (?, ?, ?, ?)`,
                [firstName, lastName, mobileNumber, hashedPassword],
                (err) => {
                    if (err) {
                        console.error('Error inserting user:', err.message);
                        return res.status(500).send('Error registering user');
                    }
                    res.status(201).send('User registered successfully');
                }
            );
        });
    } catch (error) {
        console.error('Error hashing password:', error.message);
        res.status(500).send('Error registering user');
    }
});

// Login Endpoint
app.post('/login', async (req, res) => {
    const { mobileNumber, password } = req.body;

    if (!mobileNumber || !password) {
        return res.status(400).send('Mobile number and password are required');
    }

    db.get(`SELECT * FROM users WHERE mobileNumber = ?`, [mobileNumber], async (err, row) => {
        if (err) {
            console.error('Error querying user:', err.message);
            return res.status(500).send('Error logging in');
        }

        if (!row) {
            return res.status(401).send('Invalid mobile number or password');
        }

        const isPasswordValid = await bcrypt.compare(password, row.password);
        if (!isPasswordValid) {
            return res.status(401).send('Invalid mobile number or password');
        }

        const token = jwt.sign(
            { id: row.id, mobileNumber: row.mobileNumber },
            process.env.JWT_SECRET || 'default_secret',
            { expiresIn: '1h' }
        );

        res.status(200).send({
            message: 'Login successful',
            token,
            user: {
                id: row.id,
                firstName: row.firstName,
                lastName: row.lastName,
                mobileNumber: row.mobileNumber,
            },
        });
    });
});


// Start Server
const PORT = process.env.PORT || 3008;
app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
});
