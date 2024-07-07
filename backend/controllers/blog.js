const Blog = require("../models/blog");
const Comment = require("../models/comment");


async function handleGetBlogById(req, res) {
  try {
    const { id } = req.params;

    // Find blog and populate createdBy in one query
    const blog = await Blog.findById(id)
      .populate('createdBy', 'fullname profileImage') // Only select necessary fields
      .lean() // Convert to plain JavaScript object for better performance
      .exec();

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Find comments for the blog
    const comments = await Comment.find({ blogID: id })
      .populate('createdBy', 'fullname profileImage') // Only select necessary fields
      .lean()
      .exec();

    // Combine blog and comments data
    const responseData = {
      blog,
      comments,
      currentUser: req.user ? {
        id: req.user._id,
        fullname: req.user.fullname,
        profileImage: req.user.profileImage
      } : null
    };

    // Log data for debugging (consider removing in production)
    console.log('Blog data:', blog);
    console.log('Current user:', req.user);
    console.log('Comments:', comments);

    // Send JSON response
    return res.status(200).json(responseData);

  } catch (error) {
    console.error('Error in handleGetBlogById:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { handleGetBlogById };