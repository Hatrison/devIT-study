const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.JWT_SECRET;

const auth = (req, res, next) => {
  const { roomToken, userToken } = req.body;
  if (!roomToken || typeof roomToken !== 'string') {
    return res.status(401).json({ error: 'No Token Provided' });
  }

  if (userToken && typeof userToken === 'string') {
    jwt.verify(userToken, secret, (err, decode) => {
      if (err) {
        if (
          err.name === 'TokenExpiredError' ||
          err.name === 'JsonWebTokenError'
        ) {
          return res.status(401).json({ error: 'Token Error' });
        }

        return next(err);
      }

      req.user = { uid: decode.id };
    });
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

    req.room = { rid: decode.id };
    next();
  });
};

module.exports = auth;
