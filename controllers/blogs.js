const mongoose = require('mongoose');
const Blog = mongoose.model('Blog');
const slugify = require('slugify');
const uniqueSlug = require('unique-slug');

exports.getBlogs = async (req, res) => {
  const blogs = await Blog.find({ status: 'published' }).sort({
    createdAt: -1,
  });
  return res.json(blogs);
};

exports.getBlogByUser = async (req, res) => {
  const userId = req.user.sub;
  const blogs = await Blog.find({
    userId,
    status: { $in: ['draft', 'published'] },
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

const _saveBlog = async (blog) => {
  try {
    const createBlog = await blog.save();
    return createBlog;
  } catch (err) {
    if (err.code === 11000 && err.keyPattern && err.keyPattern.slug) {
      blog.slug += `-${uniqueSlug()}`;
      return _saveBlog(blog);
    }
    throw err;
  }
};

exports.updateBlog = async (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  Blog.findById(id, async (err, blog) => {
    if (err) {
      return res.status(422).send(err.message);
    }

    if (body.status && body.status === 'published' && !blog.slug) {
      blog.slug = slugify(blog.title, {
        replacement: '-',
        lower: true,
      });
    }

    blog.set(body);
    blog.updateAt = new Date();

    try {
      const updateBlog = await _saveBlog(blog);
      return res.json(updateBlog);
    } catch (err) {
      res.status(422).send(err.message);
    }
  });
};
