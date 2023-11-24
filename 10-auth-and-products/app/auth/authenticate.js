import getParams from '../helpers/getParams';
import validateHMAC from '../helpers/validateHMAC';
import stateNonce from '../helpers/stateNonce';
import AuthCallback from './authCallback';

const { json, redirect } = require('@remix-run/node');

const auth = async req => {
  const { hmac, searchParams, updatedParams } = getParams(req.url);

  if (searchParams.get('embedded') === '1') {
    const result = validateHMAC(hmac, updatedParams);

    if (!result) {
      return json('Invalid HMAC');
    }

    const shopUrl = searchParams.get('shop');
    const clientId = process.env.SHOPIFY_API_KEY || '';
    const scopes = process.env.SCOPES || '';
    const redirectUri = process.env.SHOPIFY_API_URL + '/auth/callback';

    const url = `https://${shopUrl}/admin/oauth/authorize?client_id=${clientId}&scope=${scopes}&redirect_uri=${redirectUri}&state=${stateNonce}`;
    throw redirect(url);
  }

  return await AuthCallback(req);
};

export default auth;
