require("dotenv").config();
const User = require("../model/user");
const DataCheck = require("../core/dataValidation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  //Add user
  async post(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    //validacao
    if (!name) {
      return res.status(422).json({ msg: "O nome é obrigatório!" });
    }
    if (!email) {
      return res.status(422).json({ msg: "O email é obrigatório!" });
    }
    if (!password) {
      return res.status(422).json({ msg: "A senha é obrigatória!" });
    }
    if (password != confirmPassword) {
      return res.status(422).json({ msg: "As senhas não conferem!" });
    }

    //CHECK IF USER EXISTS
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return res.status(422).json({ msg: "Por favor, utilize outro e-mail" });
    }

    //CREATE PASSWORD
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);
    let dataCreate = {};
    dataCreate = {
      name,
      email,
      password: passwordHash,
    };

    try {
      const user = await User.create(dataCreate);
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(422).json({
        msg: "Erro ao se conectar com o banco, tente novamente mais tarde",
      });
    }
  },

  //LOGIN USER
  async login(req, res) {
    const { email, password } = req.body;
    if (!email) {
      return res.status(422).json({ msg: "O email é obrigatório!" });
    }
    if (!password) {
      return res.status(422).json({ msg: "A senha é obrigatória!" });
    }

    //chech if user exists
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado!" });
    }

    //check if password match
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(422).json({ msg: "Senha inválida!" });
    }

    try {
      const secret = process.env.SECRET;
      const token = jwt.sign(
        {
          id: user._id,
        },
        secret
      );
      res
        .status(200)
        .json({ msg: "Autenticação realizada com sucesso!", token });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        msg: "Aconteceu um erro no servidor, tente novamente mais tarde!",
      });
    }
  },

  //PRIVATE ROUTE
  async list(req, res) {
    const user = await User.find(); //seleciona tudo do usuário
    res.json(user);
  },

  async find(req, res) {
    const { _id } = req.params;
    const user = await User.findById({ _id }, "-password"); //seleciona o usuario correspondente ao ID
    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado!" });
    }
    res.status(200).json({ user });
  },
};
