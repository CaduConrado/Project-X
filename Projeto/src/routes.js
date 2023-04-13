const express = require("express");
const equipamentoController = require("../controller/equipamentoController");
const userController = require("../controller/userController");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const routes = express.Router();

routes.get("/", function (req, res) {
  res.json({ message: "Backend is ok" });
});

routes.get("/equipamento", equipamentoController.list);

//PRIVATE ROUTE
routes.get("/equipamento/:_id", checkToken, equipamentoController.find);

routes.post(
  "/user/post/equipamento/:_id",
  checkToken,
  equipamentoController.add
);

//USERS ROUTES
routes.post("/user/register", userController.post); //Registra User

routes.post("/user/login", userController.login); //Efetua o login do usuário

routes.get("/user/account/:_id", userController.find); //lista todos os usuários

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
