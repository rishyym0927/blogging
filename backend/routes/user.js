const { Router } = require("express");
const User = require("../models/user");
const checkForAuthenticationCookie = require("../middlewares/auth");
const {
  handleSignIn,
  handleSignUp,
  handleSignOut,
} = require("../controllers/user");

const userRouter = Router();

userRouter.get("/signin", (req, res) => {
  res.render("signin.ejs");
});

userRouter.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

userRouter.post("/signin", handleSignIn);
userRouter.post("/signup", handleSignUp);
userRouter.get("/signout", handleSignOut);

userRouter.get("/", checkForAuthenticationCookie("token"), async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
});

module.exports = userRouter;
