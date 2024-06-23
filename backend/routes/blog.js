const { Router } = require("express");
const blogRouter = Router();
const path = require("path");
//multer
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

//blog routes
const Blog = require("../models/blog");
const Comment = require("../models/comment");

blogRouter.get("/add-new", (req, res) => {
  return res.render("addBlog.ejs", {
    user: req.user,
  });
});

blogRouter.post("/comment/:blodid", async (req, res) => {
  const comment = await Comment.create({
    content: req.body.content,
    blogID: req.params.blodid,
    createdBy: req.user._id,
  });
  return res.redirect(`/blog/${req.params.blodid}`);
});

blogRouter.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const comment = await Comment.find({ blogID: req.params.id }).populate(
    "createdBy"
  );
  if (!blog) return res.status(404).send("Blog not found");

  console.log(blog);
  console.log(req.user);
  console.log(comment);
  return res.render("blog.ejs", {
    blog,
    user: res.user,
    comment,
  });
});

//posting our blogs
blogRouter.post("/", upload.single("coverImageURL"), async (req, res) => {
  const { title, body } = req.body;
  const blog = await Blog.create({
    title,
    body,
    createdBy: req.user._id,
    coverImageURL: `/uploads/${req.file.filename}`,
  });

  console.log(req.body);
  console.log(req.file);
  return res.redirect(`/blog/${blog._id}`);
});

module.exports = blogRouter;
