const Equipamento = require("../model/equipamento");

module.exports = {
  async list(req, res) {
    const equipamento = await Equipamento.find(); //seleciona tudo do usuário
    res.json(equipamento);
  },

  async find(req, res) {
    const { _id } = req.params;
    const equipamento = await Equipamento.findOne({ _id }); //seleciona o equipamento correspondente ao ID
    res.json(equipamento);
  },

  async add(req, res) {
    const { nome, latitude, longitude, largura, comprimento, altura } =
      req.body;

    let dataCreate = {};

    dataCreate = {
      nome,
      latitude,
      longitude,
      largura,
      comprimento,
      altura,
    };

    const equipemento = await Equipamento.create(dataCreate);
    res.json(equipemento);
  },
};
