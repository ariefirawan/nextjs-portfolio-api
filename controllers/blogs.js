const mongoose = require('mongoose');
const Blog = mongoose.model('Blog');

exports.getBlogs = async (req, res) => {
  const blogs = await Blog.find({ status: 'published' }).sort({
    createdAt: -1,
  });
  return res.json(blogs);
};

exports.getBlogById = async (req, res) => {
  const id = req.params.id;
  const data = await Blog.findById(id);
  return res.json(data);
};

exports.getBlogBySlug = async (req, res) => {
  const data = await Blog.findOne({ slug: req.params.slug });
  return res.json(data);
};

exports.createBlog = async (req, res) => {
  const blogData = req.body;
  blogData.userId = req.user.sub;
  const blog = new Blog(blogData);

  try {
    const data = await blog.save();
    return res.json(data);
  } catch (e) {
    return res.status(422).send(e);
  }
};
