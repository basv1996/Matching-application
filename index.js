/**
 @author Bas Vugts
 @description First index.js for project for block-tech
 */

const express = require('express');  
const app = express();  
const path = require('path');
//const mongo = require('mongodb');
const port = 8080;
const router = require('./router/route.js');

// set the view engine to ejs
app.set('view engine', 'ejs');

//using static files
app.use(express.static(__dirname + "/public"));
//app.use("/public", express.static(__dirname + "/public"));

app.listen(port, function() {
//watch out, there are different quotes here
    console.log(`localhost${port}`)
});

//using the router when you are on the index
app.use('/', router);

//serving static files
//app.use(express.static('public'));

//Error handling
//this can return any content, but must be valled after all other app.use()
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });