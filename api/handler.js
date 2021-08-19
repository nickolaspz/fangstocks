const express = require('express');
const app = express();
var cors = require('cors');
const dayjs = require('dayjs');
const serverless = require('serverless-http');
const connectToDB = require('./config/mongodb');

app.use(cors());

app.get('/stocks/:symbol', async (req, res, next) => {
  const today = dayjs().format('YYYY-MM-DD');
  const startOfMonth = dayjs().startOf('month').format('YYYY-MM-DD');
  const { gt = startOfMonth, lt = today, limit } = req.query;
  const symbol = req.params.symbol;

  const db = await connectToDB();
  const collection = db.collection('stocks');
  const stocks = await collection.find({ symbol, date: { $gte: gt, $lt: lt } }, { limit }).toArray();

  return res.status(200).json(stocks);
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: 'Not Found',
  });
});

module.exports.handler = serverless(app);
