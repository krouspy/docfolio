require("dotenv").config();
const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send({
    statusCode: 200,
  });
});

app.listen(PORT, () => console.log(`Server listening in PORT ${PORT}`));
