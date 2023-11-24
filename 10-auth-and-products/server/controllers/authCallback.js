const getParams = require('../helpers/getParams');
const validateHMAC = require('../helpers/validateHMMAC');
const stateNonce = require('../helpers/stateNonce');
const axios = require('axios');
require('dotenv').config();

const authCallback = async (req, res) => {
  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  const { hmac, searchParams, updatedParams } = getParams(fullUrl);

  const state = searchParams.get('state');
  if (state !== stateNonce) {
    return res.json('Invalid state');
  }

  const result = validateHMAC(hmac, updatedParams);
  if (!result) {
    return res.json('Invalid HMAC');
  }

  const shopUrl = searchParams.get('shop');
  const shopRegExp = /^[a-zA-Z0-9][a-zA-Z0-9\-]*\.myshopify\.com/;
  if (!shopRegExp.test(shopUrl)) {
    return res.json('Invalid shop URL');
  }

  const authorizationCode = searchParams.get('code');
  const clientId = process.env.SHOPIFY_API_KEY || '';
  const clientSecret = process.env.SHOPIFY_API_SECRET || '';

  const url = `https://${shopUrl}/admin/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${authorizationCode}`;
  const options = {
    body: {
      client_id: clientId,
      client_secret: clientSecret,
      code: authorizationCode,
    },
  };

  const response = await axios.post(url, options);
  console.log(response.data);

  return res.json('Auth Success');
};

module.exports = authCallback;
