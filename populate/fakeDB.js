const data = require('./data');
const Portfolio = require('../db/models/portfolio');

class FakeDB {
  async cleanData() {
    await Portfolio.deleteMany();
  }

  async addData() {
    await Portfolio.create(data.portfolios);
  }

  async populate() {
    await this.cleanData();
    await this.addData();
  }
}

module.exports = new FakeDB();
