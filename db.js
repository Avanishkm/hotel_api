const mongoose = require('mongoose');
require('dotenv').config();


const mongoURl = process.env.MONGODB_URL_LOCAL;
// const mongoURl = process.env.MONGODB_URL;

mongoose.connect(mongoURl, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
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