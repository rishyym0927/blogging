const { Router } = require("express");
const User = require("../models/user");
const checkForAuthenticationCookie = require("../middlewares/auth");

const userRouter = Router();

userRouter.get("/signin", (req, res) => {
  res.render("signin.ejs");
});

userRouter.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

userRouter.post("/signin", async (req, res) => {
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
});

userRouter.post("/signup", async (req, res) => {
  try { 
    const { fullname, email, password } = req.body;
    const user = await User.create({
      fullname,
      email,
      password,
    });
    console.log(user);
    return res.redirect("/");
  } catch (err) {
    console.log("error");
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
});

// Corrected signout route
userRouter.get("/signout", (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "User logged out successfully" });
});

userRouter.get("/", checkForAuthenticationCookie("token"), async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    return res.status(200).json(user)
    } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
});

module.exports = userRouter;
