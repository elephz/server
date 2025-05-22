const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const { readdirSync } = require('fs');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

readdirSync('./routers').map((r) => {
  const route = require(`./routers/${r}`);
  app.use('/api', route);
});

app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.listen(6000, () => {
  console.log('Server is running on port 6000');
});