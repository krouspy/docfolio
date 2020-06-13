const MongoClient = require('mongodb').MongoClient;
const { MONGODB_URI, DB_NAME } = require('../config/mongo');

const makeQuery = (collectionName, callback) => {
  MongoClient.connect(MONGODB_URI, { useUnifiedTopology: true }, (error, client) => {
    if (error) {
      callback(error, null, client);
    }
    const collection = client.db(DB_NAME).collection(collectionName);
    callback(error, client, collection);
  });
};

module.exports = makeQuery;
