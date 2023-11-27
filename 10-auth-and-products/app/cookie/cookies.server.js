import { createCookie } from '@remix-run/node';

export const userCookie = createCookie('session', {
  httpOnly: true,
  secure: true,
  sameSite: 'none',
  path: '/',
});
