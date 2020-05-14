require('dotenv').config();
const assert = require('assert');
const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./routes/index');

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api', routes);

app.listen(PORT, () => console.log(`Server listening in PORT ${PORT}`));
