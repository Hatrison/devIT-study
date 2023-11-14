const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.JWT_SECRET;

const auth = (req, res, next) => {
  const { roomToken } = req.body;
  if (roomToken && typeof roomToken !== 'string') {
    return res.status(401).json({ error: 'No Token Provided' });
  }

  jwt.verify(roomToken, secret, async (err, decode) => {
    if (err) {
      if (
        err.name === 'TokenExpiredError' ||
        err.name === 'JsonWebTokenError'
      ) {
        return res.status(401).json({ error: 'Token Error' });
      }

      return next(err);
    }

    req.room = { id: decode.id };
    next();
  });
};

module.exports = auth;
