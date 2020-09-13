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
