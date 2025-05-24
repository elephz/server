const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { readdirSync } = require('fs');
const cors = require("cors");

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(cors({
  origin: "*", // your Vite app URL
}));

const handleError = require("./middleware/error");
const validate = require("./middleware/validate");

app.use(validate);
readdirSync('./routers').map((r) => {
  const route = require(`./routers/${r}`);
  app.use(`/api/${r.replace('.js', '')}`, route);
});

app.use(handleError);


app.use((req, res) => {
  res.status(404).send('Not Found');
});

const PORT = process.env.PORT || 6001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});