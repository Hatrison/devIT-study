import { userCookie } from './cookies.server';

export const getCookies = async request => {
  const { headers } = request;
  const cookies = headers.get('Cookie');
  return (await userCookie.parse(cookies)) || {};
};
