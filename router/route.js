const express = require('express');
const router = express.Router();

//Home Page route
router.get('/', function(req, res){
    res.render('pages/index', {
        title: 'Home page'
    });
});

//Profile Page route
router.get('/profile', function(req, res){
    res.render('pages/profile', {
        title: 'Profile Page'
    });
});

//Profile Page route
router.get('/chats', function(req, res){
    res.render('pages/chats', {
        title: 'Chats Page'
    });
});

//form Route get test
router.get('/testForm/:fname', function(req, res){
    res.render('pages/testForm', {
        title: 'test form submit',
        output: req.params.fname});
});

//form Route post test
router.post('/testForm/submit', function(req, res){
    //for post request all parameters is sent in the body of the request
    let name = req.body.fname;
    console.log(req.body);
    res.redirect('/testForm/' + name);
});

//route for 404 page
router.get('*', function(req, res){
    //console.log('404');
    res.render('pages/404', {
        title: '404 Page'
    });
});
//Source: https://stackoverflow.com/questions/11500204/how-can-i-get-express-js-to-404-only-on-missing-routes/11500298
//res.render compiles my template
module.exports = router;