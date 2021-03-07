const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// assert checked of een functie outcome true of false is. Bij true runt die de functie en bij false geeft die een error

// Connection URL
const url = process.env.DB_URL;

// Database Name
const dbName = process.env.DB_NAME;

function initialize(
    dbName,
    dbCollectionName,
    successCallback,
    failureCallback
) {
    MongoClient.connect(url, function(err, dbInstance) {
        if (err) {
            console.log(`[MongoDB connection] ERROR: ${err}`);
            failureCallback(err); // this should be "caught" by the calling function
        } else {
            const dbObject = dbInstance.db(dbName);
            const dbCollection = dbObject.collection(dbCollectionName);
            console.log("[MongoDB connection] SUCCESS");

            successCallback(dbCollection);
        }
    });
}

module.exports = {
    initialize
};



// // Use connect method to connect to the server
// MongoClient.connect(url, function(err, client) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");

//   const db = client.db(dbName);

//   client.close();
// });