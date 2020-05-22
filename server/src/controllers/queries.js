const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;

const find_documents = (collectionName, res, query) => {
  MongoClient.connect(MONGO_URI, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
      console.log(err);
      res.send({
        statusCode: 500,
        result: 'Error Categories: MongoClient failed',
      });
      return;
    }
    const collection = client.db(DB_NAME).collection(collectionName);
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

const find_distinct_documents = (collectionName, res) => {
  MongoClient.connect(MONGO_URI, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
      console.log(err);
      res.send({
        statusCode: 500,
        result: 'Error Categories: MongoClient failed',
      });
      return;
    }
    const collection = client.db(DB_NAME).collection(collectionName);
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

const insert_document = (collectionName, query, res) => {
  MongoClient.connect(MONGO_URI, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
      console.log(err);
      res.send({
        statusCode: 500,
        result: 'Error Insert: MongoClient failed',
      });
      return;
    }

    const collection = client.db(DB_NAME).collection(collectionName);
    collection.insertOne(query, (error, response) => {
      if (error) {
        console.log('error', error);
        res.send({
          statusCode: 500,
          result: 'Error Insert: insertOne route',
        });
        return;
      }
      const result = response.ops[0];
      delete result._id;

      res.send({
        statusCode: 200,
        result,
      });
    });
  });
};

const update_document = (collectionName, filter, query, res) => {
  MongoClient.connect(MONGO_URI, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
      console.log(err);
      res.send({
        statusCode: 500,
        result: 'Error Insert: MongoClient failed',
      });
      return;
    }

    const collection = client.db(DB_NAME).collection(collectionName);
    collection.updateOne(filter, query, (error, result) => {
      if (error) {
        console.log('error', error);
        res.send({
          statusCode: 500,
          result: 'Error Update: update route',
        });
        return;
      }
      res.send({
        statusCode: 200,
        result: 'Update successful',
      });
    });
  });
};

module.exports = {
  find_documents,
  find_distinct_documents,
  insert_document,
  update_document,
};
