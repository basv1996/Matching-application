/**
 @author Bas Vugts
 @description First index.js for project for block-tech
 */

const express = require('express');  
const http  = require('http');
const app = express();  
//const dotenv = require('dotenv').config();
require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');

const port = process.env.PORT || 8080;
//supporting encoded bodies & json encoded bodies
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

const router = require('./router/route.js');

const db = require('./models/connect');
const dbName = process.env.DB_NAME;
const collectionName = process.env.COLLECTION_NAME;

db.initialize(dbName, collectionName, function(dbCollection) {

    dbCollection.find().toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
    })
}, function(err) {
    throw (err);
});



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


//Error handling
//this can return any content, but must be valled after all other app.use()
app.use(function(err, req, res) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });