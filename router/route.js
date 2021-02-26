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

//Personal Profile page
router.get('/profile/:username', function(req, res){
    res.render('pages/profile', {
        title: req.params.username + ' ' + 'Profiles page',
        person: req.params.username
    });
})

//Profile Page route
router.get('/chats', function(req, res){
    res.render('pages/chats', {
        title: 'Chats Page'
    });
});

router.get('/contact', function(req, res){
    res.render('pages/contact', {
        title: 'contact page',
    });
});

router.post('/contact', function(req, res){
    console.log(req.body);
    res.render('pages/contact', {
        title: 'contact page',
        outcome: req.body
    });
});


//route for posting to the contact succes page
router.post('/profile', function(req, res){
    console.log(req.body);
    res.render('pages/contact-succes', {
    title: 'succes page',
    filledInData: req.body
    });
});

router.post('profile', upload.single('Avatar'), function(req, res){
    console.log(req.file);
    res.render('pages/contact-succes', {
        title: 'succes page',
        filledInData: req.body
    });
});


// //form Route get test
// router.get('/testForm/:like', function(req, res){
//     res.render('pages/testForm', {
//         title: 'test form submit',
//         output: req.params.like});
// });

// //form Route post test
// router.post('/testForm/submit', function(req, res){
//     //for post request all parameters is sent in the body of the reques
//     router.post('/testForm/submit', function(req, res){
//     const liking = req.body;
//     res.redirect('/testForm/' + liking );
//     });
// }); 

//route for 404 page
router.get('*', function(req, res){
    //console.log('404');
    res.render('pages/404', {
        title: '404 Page'
    });
});

//Source: https://stackoverflow.com/questions/11500204/how-can-i-get-express-js-to-404-only-on-missing-routes/11500298
//res.render compiles my template

//With this I make the part router available outside this router module
module.exports = router;