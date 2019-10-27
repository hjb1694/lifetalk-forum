const express = require('express');
const path =  require('path');
const {HOST, PORT} = require('./config/config');

//Initialize Express
const app = express();

//Serve static Files
app.use(express.static(path.join(__dirname + 'public')));

//Parse incoming requests
app.use(express.json());
app.use(express.urlencoded({extended : false}));

//Setup Views 
app.set('view engine', 'ejs');
app.set('views', 'views');

//Import Routes
const generalRoutes = require('./routes/general');

//Use Routes
app.use(generalRoutes);


app.listen(PORT, HOST, () => console.log(`Listening on port ${PORT} on ${HOST}!`));