import { authenticate } from '../shopify.server';

export const loader = async ({ request }) => {
  await authenticate(request);

  return null;
};
