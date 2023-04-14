const Especificacao = require("../model/especificacao");

module.exports = {
  async list(req, res) {
    const especificacao = await Especificacao.find();
    res.json(especificacao);
  },

  async find(req, res) {
    const { _id } = req.params;
    const especificacao = await Especificacao.findOne({ _id });
    res.json(especificacao);
  },

  async post(req, res) {
    const { nome, tipo, equipamentoId } = req.body;

    let dataCreate = {};

    dataCreate = {
      nome,
      tipo,
      equipamentoId,
    };

    const especificacao = await Especificacao.create(dataCreate);
    res.json(especificacao);
  },
};
