const express = require('express');
const router = express.Router();

//Home Page route
router.get('/', function(req, res){
    res.send('Home page');
});

//About Page route
router.get('/about', function(req, res){
    res.send('About Page');
});

// Contact us route
router.get('/contact', function(req, res){
    res.send('Contact Us');
});

module.exports = router;