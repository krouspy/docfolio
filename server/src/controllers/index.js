const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;
const COLLECTION_NAME = process.env.COLLECTION_NAME;

const capitalize = s => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const find_category = (req, res) => {
  MongoClient.connect(MONGO_URI, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
      console.log(err);
      res.send({
        statusCode: 500,
        result: 'Error: MongoClient failed',
      });
      return;
    }

    const category = capitalize(req.params.category);
    const query = {};

    if (category !== 'All') {
      query.category = category;
    }

    console.log(`finding category ${category}`);

    const collection = client.db(DB_NAME).collection(COLLECTION_NAME);
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

const insert_one = (req, res) => {
  const { url, category } = req.body;

  MongoClient.connect(MONGO_URI, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
      console.log(err);
      res.send({
        statusCode: 500,
        result: 'Error Insert: MongoClient failed',
      });
      return;
    }

    const collection = client.db(DB_NAME).collection(COLLECTION_NAME);
    collection.insertOne({ url, category }, (error, result) => {
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

const find_categories = (req, res) => {
  MongoClient.connect(MONGO_URI, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
      console.log(err);
      res.send({
        statusCode: 500,
        result: 'Error Categories: MongoClient failed',
      });
      return;
    }

    const collection = client.db(DB_NAME).collection(COLLECTION_NAME);
    collection.distinct('category', (error, result) => {
      if (error) {
        console.log(error);
        res.send({
          statusCode: 500,
          result: 'Error Categories: MongoClient failed',
        });
        return;
      }
      result = ['All'].concat(result);
      res.send({
        statusCode: 200,
        result: result,
      });
    });
  });
};

module.exports = {
  find_category,
  find_categories,
  insert_one,
};
