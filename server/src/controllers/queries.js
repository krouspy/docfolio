const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;

const find_documents = (collection_name, res, query) => {
  MongoClient.connect(MONGO_URI, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
      console.log(err);
      res.send({
        statusCode: 500,
        result: 'Error Categories: MongoClient failed',
      });
      return;
    }
    const collection = client.db(DB_NAME).collection(collection_name);
    collection.find(query, { projection: { _id: 0 } }).toArray((error, docs) => {
      assert.equal(null, error);
      client.close();
      res.send({
        statusCode: 200,
        result: docs,
      });
    });
  });
};

const find_distinct_documents = (collection_name, res) => {
  MongoClient.connect(MONGO_URI, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
      console.log(err);
      res.send({
        statusCode: 500,
        result: 'Error Categories: MongoClient failed',
      });
      return;
    }
    const collection = client.db(DB_NAME).collection(collection_name);
    collection.distinct('category', (error, result) => {
      if (error) {
        console.log(error);
        res.send({
          statusCode: 500,
          result: 'Error Categories: MongoClient failed',
        });
        return;
      }
      res.send({
        statusCode: 200,
        result: result,
      });
    });
  });
};

const insert_one = (col_name, query, res) => {
  MongoClient.connect(MONGO_URI, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
      console.log(err);
      res.send({
        statusCode: 500,
        result: 'Error Insert: MongoClient failed',
      });
      return;
    }
    const collection = client.db(DB_NAME).collection(col_name);
    collection.insertOne(query, (error, result) => {
      if (error) {
        console.log('error', error);
        res.send({
          statusCode: 500,
          result: 'Error Insert: insertOne route',
        });
        return;
      }

      res.send({
        statusCode: 200,
        result: 'insertOne route',
      });
    });
  });
};

module.exports = {
  find_documents,
  find_distinct_documents,
  insert_one,
};
