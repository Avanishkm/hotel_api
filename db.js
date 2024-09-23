const mongoose = require('mongoose');

const mongoURl = 'mongodb://127.0.0.1:27017/hotels';

mongoose.connect(mongoURl, {
    useNewUrlParser: true, useUnifiedTopology: true
})

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to MongoDB server');
})

db.on('error', () => {
    console.log('Connection error');
})

db.on('disconnected', () => {
    console.log('disconnected error');
})

module.exports = db;