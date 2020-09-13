const express = require('express');
const router = express.Router();

const { checkJwt, checkRole } = require('../controllers/auth');
const BlogsController = require('../controllers/blogs');

router.get('', BlogsController.getBlogs);
router.get('/:id', BlogsController.getBlogById);
router.get('/s/:slug', BlogsController.getBlogBySlug);
router.post('', checkJwt, checkRole('admin'), BlogsController.createBlog);
router.patch('/:id', checkJwt, checkRole('admin'), BlogsController.updateBlog);

module.exports = router;
