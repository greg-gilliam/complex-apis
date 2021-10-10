const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = class UserService {
  static async create({ email, pwd }) {
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      throw new Error('User already exists for this email');
    }
    const pwdHash = await bcrypt.hash(pwd, Number(process.env.SALT_ROUNDS));
    const user = await User.insert({
      email,
      pwdHash,
    });
    return user;
  }

  static async authorize({ email, pwd }) {
    const existingUser = await User.findByEmail(email);
    if (!existingUser) {
      throw new Error('Invalid email and/or password');
    }

    const pwdMatch = await bcrypt.compare(pwd, existingUser.pwdHash);
    if (!pwdMatch) {
      throw new Error('Invalid email and/or password');
    }
    return existingUser;
  }

  // static async getUser({ id }) {
  //   const
  // }
};
