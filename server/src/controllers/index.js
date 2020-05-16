const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;
const COL_RESOURCES = process.env.COL_RESOURCES;
const COL_WORKSPACES = process.env.COL_WORKSPACES;

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

    const query = {
      category: req.params.category,
    };

    const collection = client.db(DB_NAME).collection(COL_RESOURCES);
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

const find_categories = (_, res) => {
  MongoClient.connect(MONGO_URI, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
      console.log(err);
      res.send({
        statusCode: 500,
        result: 'Error Categories: MongoClient failed',
      });
      return;
    }

    const collection = client.db(DB_NAME).collection(COL_RESOURCES);
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

const find_workspaces = (_, res) => {
  MongoClient.connect(MONGO_URI, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
      console.log(err);
      res.send({
        statusCode: 500,
        result: 'Error Categories: MongoClient failed',
      });
      return;
    }

    const collection = client.db(DB_NAME).collection(COL_WORKSPACES);
    collection.find({}, { projection: { _id: 0 } }).toArray((error, docs) => {
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
  MongoClient.connect(MONGO_URI, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
      console.log(err);
      res.send({
        statusCode: 500,
        result: 'Error Insert: MongoClient failed',
      });
      return;
    }

    const { url } = req.body;
    const category = req.body.category.toLowerCase();

    const collection = client.db(DB_NAME).collection(COL_RESOURCES);
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

module.exports = {
  find_category,
  find_categories,
  find_workspaces,
  insert_one,
};
