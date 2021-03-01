/**
 @author Bas Vugts
 @description First index.js for project for block-tech
 */

const express = require('express');  
const http  = require('http');
const app = express();  
const dotenv = require('dotenv').config()
const path = require('path');
const bodyParser = require('body-parser');
//const mongo = require('mongodb');
const mongoose = require('mongoose');
const port = 8080;
//supporting encoded bodies & json encoded bodies
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

const router = require('./router/route.js');


// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//using static files
app.use(express.static(__dirname + "/public"));
//app.use("/public", express.static(__dirname + "/public"));

app.listen(port, function() {
//watch out, there are different quotes here
    console.log(`localhost${port}`)
});

//using the router when you are on the index
app.use('/', router);


// posting images or something
// app.post('/profile', upload.single('profilePic'), function add(req, res) {
//     console.log("the uploaded post route gives " + req.body);
//     console.log("the uploaded post route gives " + req.file);
// });

//serving static files
//app.use(express.static('public'));

//connect to mongodb
mongoose.connect('mongodb://localhost/projectTechDB');
mongoose.Promise = global.Promise;

//Error handling
//this can return any content, but must be valled after all other app.use()
app.use(function(err, req, res) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });