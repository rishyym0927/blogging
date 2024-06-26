const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
//basic middelwares
const corsOptions = {
  origin: ["http://localhost:5173"], // Allowed frontend origin
  credentials: true, // Allow cookies to be sent
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve("./public")));

//other files import from mvc
const Blog = require("./models/blog");
const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");
const checkForAuthenticationCookie = require("./middlewares/auth");

//configurations
const PORT = process.env.PORT;
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => console.error(err));

//setting the view engine
app.set("views", "ejs");
app.set("views", path.resolve("./views"));

//using two routes
app.use("/user", userRouter);
app.use("/blog", checkForAuthenticationCookie("token"), blogRouter);

//homepage rendering
app.get("/", checkForAuthenticationCookie("token"), async (req, res) => {
  try {
    const allBlogs = await Blog.find({}).populate("createdBy");
    console.log(req.user);

    if (!allBlogs || allBlogs.length === 0) {
      return res.status(404).json({ message: "No blogs found" });
    }

    res.status(200).json({
      blogs: allBlogs,
      user: req.user,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "An error occurred while fetching blogs" });
  }
});

//server started
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
