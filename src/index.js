require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const routes = require('./routes/index');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '../client/build')));

app.use('/api', routes);

// app.get('/*', (_, res) => {
//   res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'));
// });

app.listen(PORT, () => console.log(`Server listening in PORT ${PORT}`));
