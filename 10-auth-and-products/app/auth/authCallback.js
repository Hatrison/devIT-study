import getParams from '../helpers/getParams';
import validateHMAC from '../helpers/validateHMAC';
import stateNonce from '../helpers/stateNonce';
import axios from 'axios';

const { json, redirect } = require('@remix-run/node');

const authCallback = async req => {
  const { hmac, searchParams, updatedParams } = getParams(req.url);

  const state = searchParams.get('state');
  if (state !== stateNonce) {
    return json('Invalid state');
  }

  const result = validateHMAC(hmac, updatedParams);
  if (!result) {
    return json('Invalid HMAC');
  }

  const shop = searchParams.get('shop');
  const shopRegExp = /^[a-zA-Z0-9][a-zA-Z0-9\-]*\.myshopify\.com/;
  if (!shopRegExp.test(shop)) {
    return json('Invalid shop URL');
  }

  const authorizationCode = searchParams.get('code');
  const clientId = process.env.SHOPIFY_API_KEY || '';
  const clientSecret = process.env.SHOPIFY_API_SECRET || '';

  const url = `https://${shop}/admin/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${authorizationCode}`;
  const options = {
    body: {
      client_id: clientId,
      client_secret: clientSecret,
      code: authorizationCode,
    },
  };

  const response = await axios.post(url, options);
  console.log(response.data);

  const host = searchParams.get('host');
  const sanitizedHost = host.replace(/[^a-zA-Z0-9]/g, '');
  throw redirect(`/?shop=${shop}&host=${encodeURIComponent(sanitizedHost)}`);
};

export default authCallback;
