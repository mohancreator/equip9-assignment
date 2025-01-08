const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

const uri = process.env.MONGO_URI;

mongoose.connect(uri)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    console.log('Hello from GET');
    res.status(200).send('Hello from GET');
});

app.listen(3008, () => {
    console.log('Server running on Port 3008');
});
