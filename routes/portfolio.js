const express = require('express');
const router = express.Router();

const portfolioController = require('../controllers/portfolios');
const { checkJwt } = require('../controllers/auth');

router.get('', portfolioController.getPortfolios);

router.get('/:id', portfolioController.getPortfolioById);

router.post('', checkJwt, portfolioController.createPortfolio);

router.patch('/:id', checkJwt, portfolioController.updatePortfolio);

module.exports = router;
