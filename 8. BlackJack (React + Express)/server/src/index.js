const express = require('express');
const path = require('path');
const app = express();
const port = 3001;

app.use(express.static(path.join(__dirname, '../public/static')));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/static/index.html'))
);

app.listen(port, () =>
  console.log(`Server listening on http://localhost:${port}!`)
);
