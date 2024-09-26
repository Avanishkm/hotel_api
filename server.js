const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('./auth');
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // req.body
const PORT = process.env.PORT ||3000;

// Middleware function => middleware is a phase there are multiple function can be run between the req and res 
const logRequest = (req, res, next) =>{
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
    next(); // move on the next phase   
}
app.use(logRequest)



app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false});

app.get('/',  (req, res) => {
    res.send('Welcome to my hotel');
})


// Import the router files
const personRoutes = require('./routes/personRoute');
const menuRoutes = require('./routes/menuItemRoutes');

// use the routers
app.use('/person',localAuthMiddleware, personRoutes);
app.use('/menu', menuRoutes);

app.listen(PORT, () => {
    console.log('listening on port 3000');
    
});