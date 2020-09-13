const express = require('express');
const router = express.Router();

const { checkJwt, checkRole } = require('../controllers/auth');
const BlogsController = require('../controllers/blogs');

router.get('', BlogsController.getBlogs);
router.get('/:id', BlogsController.getBlogById);
router.get('/s/:slug', BlogsController.getBlogBySlug);

module.exports = router;
