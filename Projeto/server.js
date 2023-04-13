const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const routes = require("./src/routes");

const app = express();

mongoose.connect("mongodb://localhost:27017/TCCPrototipo");

app.use(cors());

app.use(cookieParser());

app.use(express.json());

app.use(routes);

app.listen(8080, function () {
  console.log("Server is running");
});
