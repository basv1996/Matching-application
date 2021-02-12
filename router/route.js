const express = require('express');
const router = express.Router();

//Home Page route
router.get('/', function(req, res){
    res.render('pages/index');
});

//About Page route
router.get('/profile', function(req, res){
    res.render('pages/profile');
});

//route for 404 page
router.get('*', function(req, res){
    //console.log('404');
    res.render('pages/404');
});
//Source: https://stackoverflow.com/questions/11500204/how-can-i-get-express-js-to-404-only-on-missing-routes/11500298
//res.render compiles my template
module.exports = router;