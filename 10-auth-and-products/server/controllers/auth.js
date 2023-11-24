const validateHMAC = require('../helpers/validateHMMAC');
const getParams = require('../helpers/getParams');
const stateNonce = require('../helpers/stateNonce');
require('dotenv').config();

const auth = async (req, res) => {
  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  const { hmac, searchParams, updatedParams } = getParams(fullUrl);
  const result = validateHMAC(hmac, updatedParams);

  if (!result) {
    return res.json('Invalid HMAC');
  }

  const shopUrl = searchParams.get('shop');
  const clientId = process.env.SHOPIFY_API_KEY || '';
  const scopes = process.env.SCOPES || '';
  console.log(scopes);
  const redirectUri = process.env.SHOPIFY_API_URL + '/auth/callback';

  const url = `https://${shopUrl}/admin/oauth/authorize?client_id=${clientId}&scope=${scopes}&redirect_uri=${redirectUri}&state=${stateNonce}`;

  return res.redirect(url);
};

module.exports = auth;
