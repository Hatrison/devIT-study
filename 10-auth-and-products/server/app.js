require('dotenv').config();
const express = require('express');
const app = express();
const authRouter = require('./routes/auth');

app.use('/', authRouter);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000, () => console.log('Server running on port 3000'));
