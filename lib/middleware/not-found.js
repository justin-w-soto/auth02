module.exports = (req, res, next) => {
  const err = new Error('We cannot find your droids');
  err.status = 404;
  next(err);
};
