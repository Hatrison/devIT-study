const express = require('express');
const path = require('path');
const cors = require('cors');
const roomsRouter = require('./routes/api/rooms');
const logsRouter = require('./routes/api/logs');

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../public/static')));

app.use('/api', roomsRouter);
app.use('/api', logsRouter);

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/static/index.html'))
);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
