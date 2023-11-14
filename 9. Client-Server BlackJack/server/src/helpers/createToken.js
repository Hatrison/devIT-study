const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.JWT_SECRET;

const createToken = id => {
  return jwt.sign({ id }, secret, { expiresIn: '12h' });
};

module.exports = createToken;
