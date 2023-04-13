const User = require("../model/user");

module.exports = {
  async checkDataUsers(req, res) {
    const { name, email, password, confirmPassword } = req.body;
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

    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return res.status(422).json({ msg: "Por favor, utilize outro e-mail" });
    }
  },
};
