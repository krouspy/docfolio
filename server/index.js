require('dotenv').config();
const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;

const PORT = process.env.PORT || 3000;
const mongoURL = process.env.MONGO_URL;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  MongoClient.connect(mongoURL, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
      throw 'Error ' + err;
    }
    const collection = client.db('docfolio').collection('link');

    collection.find({}).toArray((error, result) => {
      if (error) {
        throw 'Error ' + error;
      }

      client.close();
      res.send({
        statusCode: 200,
        result: result,
      });
    });
  });
});

app.listen(PORT, () => console.log(`Server listening in PORT ${PORT}`));
