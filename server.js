const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // req.body
const PORT = process.env.PORT ||3000;

app.get('/', (req, res) => {
    res.send('Welcome to my hotel... How i can help you');
})


// Import the router files
const personRoutes = require('./routes/personRoute');
const menuRoutes = require('./routes/menuItemRoutes')

// use the routers
app.use('/person', personRoutes);
app.use('/menu', menuRoutes);

app.listen(PORT, () => {
    console.log('listening on port 3000');
    
});