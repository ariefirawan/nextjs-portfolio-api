const express = require('express');
const router = express.Router();

const portfolioController = require('../controllers/portfolios');

router.get('', portfolioController.getPortfolios);

router.get('/:id', portfolioController.getPortfolioById);

router.post('', portfolioController.createPortfolio);

module.exports = router;
