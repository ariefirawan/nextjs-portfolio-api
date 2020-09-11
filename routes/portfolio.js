const express = require('express');
const router = express.Router();

const portfolioController = require('../controllers/portfolios');
const { checkJwt } = require('../controllers/auth');

router.get('', portfolioController.getPortfolios);

router.get('/:id', portfolioController.getPortfolioById);

router.post('', checkJwt, portfolioController.createPortfolio);

module.exports = router;
