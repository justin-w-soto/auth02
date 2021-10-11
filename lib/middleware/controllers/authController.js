const { Router } = require('express');
const UserService = require('../services/UserSevice.js');
const User = require('../models/UserModel.js');
const ensureAuth = require('../ensure-auth.js');


module.exports = Router()
.post('/signup', async (req, res, next) => {
    try {

        const appUser = await UserService.create(req.body);

        res.send(appUser);

    } catch (error) {
      error.status = 400;
      next(error);  
    }
})

// ----------------------------------------------------------------->>

.post('/login', async (req, res, next) => {
  try {

    const appUser = await UserService.authorize(req.body);

        res.cookie('userId', appUser.id, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24
        });

    res.send(appUser);

  } catch (error) {
    error.status = 401;
    next(error);
  }
})

// ----------------------------------------------------------------->>


.get('/me', ensureAuth, async (req, res, next) => {
  try {

    const userId = req.userId;
    const appUser = await User.get(userId);

    res.send(appUser);

  } catch (error) {
    next(error);
  }

});