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
  const userId = req.user.sub;
  const portfolio = new Portfolio(data);
  portfolio.userId = userId;
  try {
    const newPortfolio = await portfolio.save();
    return res.json(newPortfolio);
  } catch (e) {
    return res.status(422).send(e.message);
  }
};

exports.updatePortfolio = async (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  try {
    const updatePortfolio = await Portfolio.findByIdAndUpdate(
      { _id: id },
      body,
      { new: true, runValidators: true }
    );
    return res.json(updatePortfolio);
  } catch (e) {
    return res.status(422).send(e.message);
  }
};

exports.deletePortfolio = async (req, res) => {
  const portfolio = await Portfolio.findOneAndDelete({ _id: req.params.id });
  return res.json({ _id: portfolio.id });
};
