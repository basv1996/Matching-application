const { response } = require('express');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: './public/uploads/'})

let data;
const db = require('../models/connect');
const dbName = process.env.DB_NAME;
const collectionName = process.env.COLLECTION_NAME;


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

//Chat Page route
router.get('/chats', function(req, res){
    res.render('pages/chats', {
        title: 'Chats Page'
    });
});

//Contact Page route
router.get('/contact', function(req, res){
    res.render('pages/contact', {
        title: 'contact page',
    });
});

//Matches Page route
router.get('/matches', function(req, res){
    res.render('pages/matches', {
        title: 'My matches',
    });
});

// kan hier alleen op komen nadat je hebt gesubmit
router.post('/contact', function(req, res){
    console.log(req.body);
    res.render('pages/contact', {
        title: 'Succes contact page',
        outcome: req.body
    });
});


//Create entry into database
router.post('/profile', function(req, res){
    console.log("the body data from post outside function is: ", req.body); //gives { Firstname: 'Bas', Age: '100', Email: 'iets@mail.com' }
    const bodyData = req.body;
    db.initialize(dbName, collectionName, function(dbCollection) {
        dbCollection.insertOne(bodyData, (error, result) => {
            if (error) throw error
            console.log("the body data from post within function is: ", bodyData); // gives { Firstname: 'Bas', Age: '100', Email: 'iets@mail.com' }
                   res.render('pages/contact-succes', {
                  title: 'succes page',
                  //filledInData: req.body
                  data: bodyData
                 });
            });
        });
    });

//Read 1 entry from database
//When I click on edit then this route get excecuted
router.get('/edit/:email', function(req, res){
    const userEmail = req.params.email;
    console.log("usermail is: ", userEmail);
    db.initialize(dbName, collectionName, function(dbCollection) {
             dbCollection.findOne(
                 {Email: userEmail}, 
                 function(error, result){
                     if (error) throw error;
                     //return item
                     //res.json(result)
                     res.render('pages/edit', {
                         title: 'edit user: ' + userEmail ,
                            data: result
                         });
                 });
                });
            });


//Update one entry from database
router.put('/edit/:email', function(req, res){     
    const userEmail = req.params.email;
    const updatedUser = req.body;
    console.log("Editing user: ", userEmail, " to become ", updatedUser);
    db.initialize(dbName, collectionName, function(dbCollection) {
             dbCollection.updateOne(
                 {Email: userEmail},
                 {$set: updatedUser},
                 function(error, result){
                     if (error) throw error;
                     // send back entire updated list, to make sure frontend data is up-to-date
                       dbCollection.find().toArray(function(_error, _result) {
                        if (_error) throw _error;
                       res.json(_result);
                 });
                });
            });
        });
             
             

// //read all entries from database
// router.get('/everybody', function(req, res){
//     db.initialize(dbName, collectionName, function(dbCollection) { //succes callback
//         //get all items
//         const bodyData = req.body;
//         dbCollection.find().toArray(function(error, result){
//             if (error) throw error; 
//             data = result;  
//             console.log("dit is ",result);
//         });
//                 const naam = bodyData.Firstname;
//                 const age = bodyData.age;
//                 const email = bodyData.email;
//                 res.render('pages/allUsers', {
//                     title: 'all users',
//                     filterData: data,
//                     username: naam,
//                     age: age,
//                     email: email
//                 });
//             }, function(error) { // failureCallback
//                 throw (error);
//             });
//         });



// //read one entry from database
// router.get('/edit/:email', function(req, res){
//     console.log("get route with email");
//     const bodyDataEmail = req.params.email;
//     console.log("read one entry requestes parameters are: ", req.params); // gives { id: 'the input from the url after profile/'}
//     console.log("read one entry bodyDataEmail is: ", bodyDataEmail); // gives the input from the url after profile/
//     console.log("read one entry requestes params.age: ", req.params.age); // empty object
//     db.initialize(dbName, collectionName, function(dbCollection) {
//     dbCollection.findOne(
//         {email: bodyDataEmail },
//          function(error, result){
//         if(error) throw error
//         data = result;
//         //return item
//         // res.render('pages/edit', {
//         //     title: 'edit page',
//         //     data: result
//         //     });
//         res.json(data);
//         });
//     });
// });


// //Update an entry from the database
// router.put('edit/:id', function(req, res){
//     const bodyDataID = req.params.id; 
//     const bodyData = req.body;
//     console.log("Editing item: ", bodyDataID, " to be ", bodyData);
//     db.initialize(dbName, collectionName, function(dbCollection) {
//         dbCollection.updateOne(
//             {id: bodyDataID }, 
//             { $set: bodyData }, 
//             function(error, result){
//             if (error) throw error;
//             // send back entire updated list, to make sure frontend data is up-to-date
//             dbCollection.find().toArray(function(_error, _result){
//                 if (_error) {
//                     throw _error
//                 } else {
//                         //res.json(result);
//                         res.render('pages/edit', {
//                             title: 'edit page',
//                             data: result
//                             })
//                     }
//             })
//         });
//     });
// });

// //delete an entry from the database
// router.delete('profile/:id', function(req, res){
//     const bodyDataID = req.params.id;
//     console.log("Delete item with id: " + bodyDataID);
//     db.initialize(dbName, collectionName, function(dbCollection) {
//         dbCollection.deleteOne(
//             {id: bodyDataID }, 
//             function(error, result){
//                 if (error) throw error;
//                 // send back entire updated list after successful request
//                 dbCollection.find().toArray(function(_error, _result) {
//                     if (_error) throw _error;
//                     res.json(_result);
//              });
//          });
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