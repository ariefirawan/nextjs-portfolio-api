const express = require('express');
const router = express.Router();

const portfolioController = require('../controllers/portfolios');
const { checkJwt, checkRole } = require('../controllers/auth');

router.get('', portfolioController.getPortfolios);

router.get('/:id', portfolioController.getPortfolioById);

router.post(
  '',
  checkJwt,
  checkRole('admin'),
  portfolioController.createPortfolio
);
router.patch(
  '/:id',
  checkJwt,
  checkRole('admin'),
  portfolioController.updatePortfolio
);
router.delete(
  '/:id',
  checkJwt,
  checkRole('admin'),
  portfolioController.deletePortfolio
);

module.exports = router;
