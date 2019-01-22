const express = require("express");
var mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fs = require("fs");
var fileUpload = require('express-fileupload');

// initialize our express app
const app = express();


const stock_controller = require("./controllers/stock.controller");
const stock_route = require("./routes/stock.route"); // Imports routes for the stocks
const Stock = require("./models/stock.model");

app.use("/stocks", stock_route);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());


let db_url = "mongodb://localhost:27017/store";
let mongoDB = process.env.MONGODB_URI || db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once('open', function () {
  // we're connected!
  console.log("Connected to mongodb")
});

let port = 4000;
app.listen(port, () => {
  console.log("Server is up and running on port numner " + port);
});

// app.get('/', function (req, res) {
//   res.sendFile(__dirname + '/index.html');
// });





