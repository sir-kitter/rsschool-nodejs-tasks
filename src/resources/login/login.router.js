const { catchInternal } = require('./../../utilities/errorHandlers');
const loginService = require('./login.service');
const httpStatus = require('http-status');
const router = require('express').Router();

/* eslint-disable no-unused-vars */

router.route('/*').post(
  catchInternal(async (req, res, next) => {
    const { login, password } = req.body;
    const token = await loginService.getToken(login, password);
    if (token) {
      res.status(httpStatus.OK).send({ token });
    } else {
      res.sendStatus(httpStatus.FORBIDDEN);
    }
  })
);

module.exports = {
  loginRouter: router
};
