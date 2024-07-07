const User = require("../models/user");

async function handleSignIn(req, res) {
  try {
    const { email, password } = req.body;
    const token = await User.matchPassword(email, password);
    console.log(token);
    return res.status(200).cookie("token", token).json({ token });
  } catch (err) {
    console.log("error");
    console.log(err);
    return res.status(404).json({ error: err.message });
  }
}

async function handleSignUp(req, res) {
  try {
    const { fullname, email, password } = req.body;
    const user = await User.create({
      fullname,
      email,
      password,
    });
    console.log(user);
    return res.status(201).json({ message: "User created"});
    } catch (err) {
    console.log("error");
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
}

function handleSignOut(req, res) {
    res.clearCookie("token");
    return res.status(200).json({ message: "User logged out successfully" });
}

module.exports = { handleSignIn, handleSignUp, handleSignOut };
