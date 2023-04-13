const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  nome: String,
  tipo: String,
});
