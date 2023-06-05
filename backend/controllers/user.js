const User = require("../models/user.js");
const jsonWebToken = require("jsonwebtoken");

const tokenCreate = (id) => {
  return jsonWebToken.sign({ id }, process.env.SECRET, { expiresIn: "7hr" });
};

const userSignup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.signup(username, email, password);

    const token = tokenCreate(user._id);
    console.log(token);

    res.status(201).json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // token create
    const token = tokenCreate(user._id);
    console.log(token);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

module.exports = {
  userSignup,
  userLogin,
};
