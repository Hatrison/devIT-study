const app = require('./app');
const mongoose = require('mongoose').default;
require('dotenv').config();
const { DB_HOST, PORT } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
    console.log(
      `Database connection successful. Server listening on http://localhost:${PORT}`
    );
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
