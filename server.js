const express = require('express');
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // req.body

app.get('/', (req, res) => {
    res.send('Welcome to my hotel... How i can help you');
})


// Import the router files
const personRoutes = require('./routes/personRoute');
const menuRoutes = require('./routes/menuItemRoutes')

// use the routers
app.use('/person', personRoutes);
app.use('/menu', menuRoutes);

app.listen(3000, () => {
    console.log('listening on port 3000');
    
});