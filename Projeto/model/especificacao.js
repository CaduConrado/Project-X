const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  nome: String,
  tipo: String,
  equipamentoId: String,
});

const especificacao = mongoose.model("Especificacao", dataSchema);
module.exports = especificacao;
