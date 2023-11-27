const User = require("../models/User");

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).json({ error: "User not found" });
  } else {
    const checkPassword = await user.comparePassword(password);
    if (!checkPassword) {
      res.status(401).json({ error: "Invalid email or password" });
    } else {
      const token = user.generateJWT();
      res.status(200).json({ token });
    }
  }
};
const signup = async (req, res) => {
  console.log(res.body);
  console.log(req.body);
  const user = await User.create({ ...req.body });
  const token = user.generateJWT();
  res.status(200).json({ token });
};
module.exports = { login, signup };
