const crypto = require('crypto');

const validateHMAC = (hmac, params) => {
  const hash = crypto
    .createHmac('sha256', process.env.SHOPIFY_API_SECRET || '')
    .update(params)
    .digest('hex');

  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(hmac || ''));
};

export default validateHMAC;
