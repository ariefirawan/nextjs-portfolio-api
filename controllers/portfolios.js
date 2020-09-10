const mongoose = require('mongoose');
const Portfolio = mongoose.model('Portfolio');

exports.getPortfolios = async (req, res) => {
  const portfolios = await Portfolio.find({});
  return res.json(portfolios);
};

exports.getPortfolioById = async (req, res) => {
  try {
    const portfoliio = await Portfolio.findById(req.params.id);
    return res.json(portfoliio);
  } catch (error) {
    return res.status(422).send(error.message);
  }
};

exports.createPortfolio = async (req, res) => {
  const data = req.body;
  const portfolio = new Portfolio(data);

  try {
    const newPortfolio = await portfolio.save();
    return res.json(newPortfolio);
  } catch (e) {
    return res.status(422).send(e.message);
  }
};
