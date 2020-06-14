const assert = require('assert').strict;
const mongoClient = require('./mongoClient');

const find_documents = (collectionName, query, res) => {
  mongoClient(collectionName, (error, client, collection) => {
    if (error) {
      console.error(error);
      res.send({
        statusCode: 500,
        result: 'Error: Get Documents',
      });
      return;
    }

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
  mongoClient(collectionName, (error, client, collection) => {
    if (error) {
      console.error(error);
      res.send({
        statusCode: 500,
        result: 'Error: Get Distinct Documents',
      });
    }

    collection.distinct(key, filter, (error, result) => {
      assert.equal(null, error);
      client.close();
      res.send({
        statusCode: 200,
        result: result.sort(),
      });
    });
  });
};

const insert_document = (collectionName, query, res) => {
  mongoClient(collectionName, (error, client, collection) => {
    if (error) {
      console.error(error);
      res.send({ statusCode: 500, result: 'Error: Insert Document' });
    }

    collection.insertOne(query, (error, response) => {
      assert.equal(null, error);
      client.close();

      res.send({
        statusCode: 200,
        result: response.ops[0],
      });
    });
  });
};

const update_document = (collectionName, filter, query, res) => {
  mongoClient(collectionName, (error, client, collection) => {
    if (error) {
      console.error(error);
      res.send({
        statusCode: 500,
        result: 'Error: Update Document',
      });
      return;
    }

    collection.updateOne(filter, query, (error, result) => {
      assert.equal(null, error);
      client.close();

      res.send({
        statusCode: 200,
        result: 'Update successful',
      });
    });
  });
};

const delete_document = (collectionName, query, res) => {
  mongoClient(collectionName, (error, client, collection) => {
    if (error) {
      console.error(error);
      res.send({
        statusCode: 500,
        result: 'Error: Delete Document',
      });
      return;
    }

    collection.removeOne(query, (error, result) => {
      assert.equal(null, error);
      client.close();

      res.send({
        statusCode: 200,
        result: 'Update successful',
      });
    });
  });
};

const authentication = (collectionName, query, password, done) => {
  mongoClient(collectionName, (error, client, collection) => {
    if (error) return done(error);

    collection.findOne(query, (error, user) => {
      if (error) return done(error);
      if (!user) {
        console.log('no user');
        return done(null, false, { message: 'User non-existent' });
      }
      if (user.password !== password) {
        console.log('wrong pass');
        return done(null, false, { message: 'Wrong Password' });
      }
      client.close();
      return done(null, user);
    });
  });
};

const find_headings_of_workspace = (collectionName, res, query) => {
  mongoClient(collectionName, (error, client, collection) => {
    if (error) {
      console.error(error);
      res.send({
        statusCode: 500,
        result: 'Error: Find Headings',
      });
      return;
    }

    collection.find(query, { projection: { _id: 0, content: 1 } }).toArray((error, docs) => {
      assert.equal(null, error);
      client.close();

      const content = docs[0].content;

      if (content === undefined) {
        res.send({
          statusCode: 200,
          result: [],
        });
        return;
      }

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

module.exports = {
  find_documents,
  find_distinct_documents,
  find_headings_of_workspace,
  insert_document,
  update_document,
  delete_document,
  authentication,
};
