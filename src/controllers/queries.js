const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;

const MONGO_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME;

const find_headings_of_workspace = (collectionName, res, query) => {
  MongoClient.connect(MONGO_URI, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
      console.log(err);
      res.send({
        statusCode: 500,
        result: 'Error Content: MongoClient failed',
      });
      return;
    }
    const collection = client.db(DB_NAME).collection(collectionName);
    collection.find(query, { projection: { _id: 0, content: 1 } }).toArray((error, docs) => {
      assert.equal(null, error);
      client.close();
      const content = docs[0].content;
      const lines = content.split('\n');
      const headings = lines.filter(line => {
        // remove start spaces in case user inserted some => will be detected as headings otherwise
        line = line.trimStart();
        return line[0] === '#';
      });
      const result = headings.map(heading => heading.substring(2));
      res.send({
        statusCode: 200,
        result,
      });
    });
  });
};

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
    collection.find(query).toArray((error, docs) => {
      assert.equal(null, error);
      client.close();
      res.send({
        statusCode: 200,
        result: docs,
      });
    });
  });
};

const find_distinct_documents = (collectionName, key, filter, res) => {
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
    collection.distinct(key, filter, (error, result) => {
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

      res.send({
        statusCode: 200,
        result: response.ops[0],
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

const delete_document = (collectionName, query, res) => {
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
    collection.removeOne(query, (error, result) => {
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
  find_headings_of_workspace,
  insert_document,
  update_document,
  delete_document,
};
