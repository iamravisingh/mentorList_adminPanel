require('dotenv').config({
  path: 'Env_Variables.env'
});
require("./Models/db");

const express = require("express");
const routes = require("./routes/mentorController");
const path = require("path");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const expressValidator = require('express-validator');

let app = express();

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());
app.set("views", path.join(__dirname, "/views/"));
app.use(express.static(__dirname + '/public'))
app.engine("hbs",exphbs({ extname: "hbs", defaultLayout: "mainLayout",layoutsDir: __dirname + "/views/layouts/"}));
app.set("view engine", "hbs");
app.use("/mentor", routes);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server connected successfully at port 3000");
});

