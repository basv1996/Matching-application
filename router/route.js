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


//Matches Page route
router.get('/matches', function(req, res){
    db.initialize(dbName, collectionName, function(dbCollection) {
        dbCollection.find().toArray(function(error, result){
            if (error) throw error;
                data = result;
                res.render('pages/matches', {
                    title: 'matched users',
                    data: result
                })
            });
        })
});





//Create entry into database
router.post('/profile', function(req, res){
    const bodyData = {
        Firstname: req.body.Firstname,
        Age: req.body.Age,
        console: req.body.console,
        Email: req.body.Email,
        Dislike: req.body.Dislike,
        Like: req.body.Like
    }
   
    console.log("body data :", bodyData);
    db.initialize(dbName, collectionName, function(dbCollection) {
        dbCollection.insertOne(bodyData, function(error, result) {
            if (error) throw error
                   res.render('pages/addUser-succes', {
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
        Firstname: req.body.Firstname,
        Age: req.body.Age,
        console: req.body.console,
        Email: req.body.Email,
        Dislike: req.body.Dislike,
        Like: req.body.Like
    }
    const userEmail = req.params.email;
    const bodyDataID = ObjectID(req.body.ID);;
    db.initialize(dbName, collectionName, function(dbCollection) {
             dbCollection.findOne(
                 {Email: userEmail}, 
                 function(error, result){
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
        Firstname: req.body.Firstname,
        Age: req.body.Age,
        console: req.body.console,
        Email: req.body.Email,
        Dislike: req.body.Dislike,
        Like: req.body.Like
    }
    const DBUserID = ObjectID(req.body.ID);

    db.initialize(dbName, collectionName, function(dbCollection) {
                      dbCollection.findOneAndUpdate({"_id": DBUserID}, {$set: updatedUser},function(error, result){
                          if (error) throw error;
                          res.redirect('/allUsers');
});
    });
});

//liking a profile 
router.post('/like', function(req, res){
    const LikeMe = {
        Like: "True",
        Dislike: "False"
    }
    const DBUserID = ObjectID(req.body.ID);

    db.initialize(dbName, collectionName, function(dbCollection) {
                      dbCollection.findOneAndUpdate({"_id": DBUserID}, {$set: LikeMe},function(error, result){
                          if (error) throw error;
                          res.redirect('/allUsers');
        });
    });
});

//disliking a profile
router.post('/Dislike', function(req, res){
    const DislikeMe = {
        Dislike: "True",
        Like: "False"
    }
    const DBUserID = ObjectID(req.body.ID);
    db.initialize(dbName, collectionName, function(dbCollection) {
                      dbCollection.findOneAndUpdate({"_id": DBUserID}, {$set: DislikeMe},function(error, result){
                          if (error) throw error;
                          //res.redirect('/allUsers');
                          res.redirect('matches');
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
router.post('/delete', function(req, res){
const DeleteUser = {
    Firstname: req.body.Firstname,
    Age: req.body.Age,
    console: req.body.console,
    Email: req.body.Email
}
const DeleteUserID = typeof(req.body.ID);
const DBUserID = ObjectID(req.body.ID);

db.initialize(dbName, collectionName, function(dbCollection) {
                  dbCollection.deleteOne({"_id": DBUserID}, function(error, result){
                      if (error) throw error;
                      res.render('pages/delete-succes', {
                        title: 'Delete was succesfull'
                      });
});
});
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

//With this I make the part router available outside this router module
module.exports = router;