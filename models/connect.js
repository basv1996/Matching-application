const MongoClient = require("mongodb").MongoClient;

// Connection URL
const url = process.env.DB_URL;

// Database Name
//const dbName = process.env.DB_NAME;

function initialize(
  dbName,
  dbCollectionName,
  successCallback,
  failureCallback
) {
  MongoClient.connect(url, function (err, dbInstance) {
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
  initialize,
};
