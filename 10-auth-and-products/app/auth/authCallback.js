import getParams from '../helpers/getParams';
import validateHMAC from '../helpers/validateHMAC';
import stateNonce from '../helpers/stateNonce';
import axios from 'axios';
import { userCookie } from '../cookie/cookies.server';

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
  const accessToken = response.data?.access_token;
  console.log('access_token: ', accessToken);

  const host = searchParams.get('host');
  const sanitizedHost = host.replace(/[^a-zA-Z0-9]/g, '');
  throw redirect(`/?shop=${shop}&host=${encodeURIComponent(sanitizedHost)}`, {
    headers: {
      'Set-Cookie': await userCookie.serialize({
        session: accessToken,
      }),
    },
  });
};

export default authCallback;
