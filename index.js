/**
 @author Bas Vugts
 @description First index.js for project for block-tech
 */

var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/node_modules'));  
app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/index.js');
});

server.listen(4200);