const contrsWrapper = contr => {
  return async (res, req, next) => {
    try {
      await contr(res, req, next);
    } catch (error) {
      next(error);
    }
  };
};
module.exports = contrsWrapper;
