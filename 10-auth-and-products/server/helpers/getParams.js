const getParams = url => {
  const searchParams = new URL(url).searchParams;
  const hmac = searchParams.get('hmac');
  searchParams.delete('hmac');
  const updatedParams = searchParams.toString();

  return { hmac, searchParams, updatedParams };
};

module.exports = getParams;
