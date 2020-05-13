const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;
const COLLECTION_NAME = process.env.COLLECTION_NAME;

const find_all = (req, res) => {
  MongoClient.connect(MONGO_URI, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
      console.log(error);
    }

    const collection = client.db(DB_NAME).collection(COLLECTION_NAME);
    collection.find({}).toArray((error, docs) => {
      assert.equal(null, error);
      client.close();
      res.send({
        statusCode: 200,
        result: docs,
      });
    });
  });
};

const insert_one = (req, res) => {
  const uri = req.body.uri;
  console.log(uri);

  MongoClient.connect(MONGO_URI, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
      console.log(error);
    }

    const collection = client.db(DB_NAME).collection(COLLECTION_NAME);
    collection.insertOne(uri, (error, result) => {
      if (error) {
        console.log('error', error);
      }
    });
  });

  res.send({
    statusCode: 200,
    result: 'insertOne route',
  });
};

module.exports = {
  find_all,
  insert_one,
};
