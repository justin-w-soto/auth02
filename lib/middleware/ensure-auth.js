module.exports = (req, res, next) => {

    const { userId } = req.cookies;
  
    if (!userId) {
      throw new Error('Hey, Ding-Dong. You need to sign in to proceed');
    }
    req.userId = userId;
    next();
  };
  