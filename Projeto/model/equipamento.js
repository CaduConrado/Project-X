const mongoose = require("mongoose");

//nova tabela no mongodb
const dataSchema = new mongoose.Schema({
  nome: String,
  latitude: Number,
  longitude: Number,
  largura: Number,
  comprimento: Number,
  altura: Number,
});

const equipamento = mongoose.model("Equipamento", dataSchema);
module.exports = equipamento;
