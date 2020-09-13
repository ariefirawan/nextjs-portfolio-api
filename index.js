const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// njO677f0WMOuD15t

async function runServer() {
  await require('./db').connect();

  app.use(bodyParser.json());

  app.use('/api/v1/portfolios', require('./routes/portfolio'));
  app.use('/api/v1/blogs', require('./routes/blogs'));

  const PORT = parseInt(process.env.PORT, 10) || 3001;
  app.listen(PORT, (err) => {
    if (err) console.error(err);
    console.log('Server ready on port: ', PORT);
  });
}

runServer();
