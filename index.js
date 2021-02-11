/**
 @author Bas Vugts
 @description First index.js for project for block-tech
 */

var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
const port = 8080;


app.get('/', onhome).listen(port);

function onhome(req, res) {
    res.send("<h1>Hello Client</h1>");
}
