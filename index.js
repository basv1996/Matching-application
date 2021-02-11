/**
 @author Bas Vugts
 @description First index.js for project for block-tech
 */

const express = require('express');  
const app = express();  
//var server = require('http').createServer(app);  
const port = 8080;
const router = require('./router/route.js');


app.get('/', function(req, res){
res.send('Hello World')
});

app.listen(port, function() {
        //watch out, there are different quotes here
    console.log(`localhost${port}`)

})

app.use('/', router);