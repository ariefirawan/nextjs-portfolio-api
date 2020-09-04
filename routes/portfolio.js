const express = require('express');
const router = express.Router();

const portfolioController = require('../controllers/portfolios');

router.get('', portfolioController.getPortfolios);

router.get('/:id', portfolioController.getPortfolioById);

module.exports = router;
