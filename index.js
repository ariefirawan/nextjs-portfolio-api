const express = require('express');

const app = express();

app.use('/api/v1/portfolios', require('./routes/portfolio'));

app.get('/test', (req, res) => {
  return res.json({ message: 'hello world' });
});

const PORT = parseInt(process.env.PORT, 10) || 3001;
app.listen(PORT, (err) => {
  if (err) console.error(err);
  console.log('Server ready on port: ', PORT);
});
