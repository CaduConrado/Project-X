const express = require("express");
const equipamentoController = require("../controller/equipamentoController");
const userController = require("../controller/userController");
const especificacaoController = require("../controller/especificacaoController");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const routes = express.Router();

routes.get("/", function (req, res) {
  res.json({ message: "Backend is ok" });
});

//PRIVATE ROUTE
routes.get("/equipamento/:_id", checkToken, equipamentoController.find); //busca um equipamento especifico
routes.get("/equipamento", checkToken, equipamentoController.list); //lista todos os equipamentos

routes.post(
  "/user/post/equipamento/:_id",
  checkToken,
  equipamentoController.add
);

//USERS ROUTES
routes.post("/user/register", userController.post); //Registra User

routes.post("/user/login", userController.login); //Efetua o login do usuário

routes.get("/user/account/:_id", checkToken, userController.find); //busca o usuário pelo id

//ESPECIFICACAO ROUTES
routes.post("/especificacao/add", checkToken, especificacaoController.post); //Adiciona uma funcionalidade à um equipamento // Obs.: Futuramente verificar se o equipamento está cadastrado no banco

routes.get("/especificacao/find", checkToken, especificacaoController.list); //lista todos os equipamentos em uso, com suas especificações

routes.get("/especificacao/one/:_id", especificacaoController.find); //busca a especificação de um equipamento pelo seu respectivo id

module.exports = routes;

function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Acesso negado!" });
  }

  try {
    const secret = process.env.SECRET;
    jwt.verify(token, secret);

    next();
  } catch (err) {
    res.status(400).json({ msg: "Token inválido!" });
  }
}
