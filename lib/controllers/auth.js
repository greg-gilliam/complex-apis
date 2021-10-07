const { Router } = require('express');
const UserService = require('../services/UserService');

// const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router().post('/signup', async (req, res, next) => {
  try {
    console.log(req.body, 'string');
    const user = await UserService.create(req.body);
    res.send(user);
  } catch (error) {
    next(error);
  }
});
