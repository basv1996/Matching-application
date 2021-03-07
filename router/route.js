const { response } = require('express');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: './public/uploads/'})

let data;
const db = require('../models/connect');
const dbName = process.env.DB_NAME;
const collectionName = process.env.COLLECTION_NAME;
const  ObjectID = require('mongodb').ObjectID;



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
        dbCollection.insertOne(bodyData, function(error, result) {
            if (error) throw error
            console.log("the body data from post within function is: ", bodyData); // gives { Firstname: 'Bas', Age: '100', Email: 'iets@mail.com', _id: 60674738638ABVAVAVA }
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
//this one works
router.get('/edit/:email', function(req, res){
    console.log("Je zit nu in de get route voor findOne()");
    const bodyData = {
        id: req.body.ID,
        name: req.body.Firstname,
        age: req.body.Age,
        console: req.body.console,
        email: req.body.Email
    }
    console.log("de body data is gelijk aan: ", bodyData);
    const userEmail = req.params.email;
    db.initialize(dbName, collectionName, function(dbCollection) {
             dbCollection.findOne(
                 {Email: userEmail}, 
                 function(error, result){
                     console.log("de body data is gelijk aan: ", bodyData);
                     console.log("req params binnen in functie =: ", req.params); //{ email: 'bas.vugts@gmail.com' }
                     console.log("userID binnen in functie =: ", userEmail); // bas.vugts@gmail.com
                    console.log("result items are: ", result); // {_id: 6040e6962454530c304d41d9, Firstname: 'blbla', Age: '20' etc etc}
                    console.log("Result.id is gelijk: ", result._id);
                   
                     if (error) throw error;
                     res.render('pages/edit', {
                         title: 'edit user: ' + userEmail ,
                            data: result
                         });
                 });
                });
            });



router.post('/update', function(req, res){
    const updatedUser = {
        id: req.body.ID,
        Firstname: req.body.Firstname,
        Age: req.body.Age,
        console: req.body.console,
        Email: req.body.Email
    }
    const updatedUserID = typeof(req.body.ID);
    const newUserID = ObjectID(req.body.ID);

    db.initialize(dbName, collectionName, function(dbCollection) {
                      dbCollection.findOneAndUpdate({"_id": newUserID}, {$set: updatedUser},function(error, result){
                          if (error) throw error;
                          res.redirect('/allUsers');
});
    });
});



             
//Display all users from database
router.get('/allUsers', function(req, res){
   
    db.initialize(dbName, collectionName, function(dbCollection) {
        dbCollection.find().toArray(function(error, result){
            if (error) throw error;
                data = result;
                res.render('pages/allUsers', {
                    title: 'all users',
                    data: result
                })
            });
        })
})    

//deleting a single user
// router.delete('/delete/:email', function(req, res){
//     const userEmail = req.params.email;
//     console.log("Delete item with email: ", userEmail);
//     db.initialize(dbName, collectionName, function(dbCollection) {
//       dbCollection.deleteOne({"Email": userEmail}, function(error, result){
//           if (error) throw error;
//           dbCollection.find().toArray(function(_error, _result){
//               if (_error) throw _error;
//           res.json(_result);
//       });
// });
// });
// });

router.delete('/delete/:id', function(req, res){
    const userID = req.params.id;
    console.log("Delete item with email: ", userID);
    db.initialize(dbName, collectionName, function(dbCollection) {
      dbCollection.deleteOne({"_id": userID}, function(error, result){
          if (error) throw error;
          dbCollection.find().toArray(function(_error, _result){
              if (_error) throw _error;
          res.json(_result);
      });
});
});
});

// router.post('/delete/:email', function(req, res){
//     const updatedUser = {
//         userID: req.body.userID,
//         name: req.body.Firstname,
//         age: req.body.Age,
//         console: req.body.console,
//         email: req.body.Email
//     }

//     const userEmail = req.body.Email;
//     const bodyData = req.body;
//     const paraEmail = req.params.email;
//     console.log("Delete item with email: ", paraEmail);
//     db.initialize(dbName, collectionName, function(dbCollection) {
//       dbCollection.deleteOne({email: userEmail}, function(error, result){
//           if (error) throw error;
//           dbCollection.find().toArray(function(_error, _result){
//               if (_error) throw _error;
//           //res.json(_result);
//           console.log("user data updated is: ", updatedUser)
//           console.log("user email is: ", userEmail);
//           console.log("body data is: ", bodyData);
//           console.log("req param is: ", paraEmail);
//           res.render('pages/delete-succes', {
//             title: 'delete succes',
//             updatedUser: updatedUser
//           });
//       });
// });
// });
// });

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