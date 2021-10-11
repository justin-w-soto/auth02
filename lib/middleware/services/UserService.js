const User = require('../models/UserModel.js');
const bcrypt = require('bcryptjs');

module.exports = class UserService {

static async create({ email, password }) {
    const userExists = await User.findByEmail(email);

    if(userExists) {
        throw new Error('That Email is taken. Try again, Dingus');
    }

    const passwordHash = await bcrypt.hash(
        password,
        Number(process.env.SALT_ROUNDS)
        );

    const appUser = await User.insert({
        email, 
        passwordHash
    });
    
    return appUser;
}
// ----------------------------------------------------------------->>

static async authorize({ email, password }) {
    const userExists = await User.findByEmail(email);

    if (!userExists) {
      throw new Error('You are not valid, go away.');
    }

    const correctPassword = await bcrypt.compare(
      password,
      userExists.passwordHash
    );

    if (!correctPassword) {
      throw new Error('You are not valid, go away.');
    }

    return userExists;
  }
// ----------------------------------------------------------------->>
    
;}
