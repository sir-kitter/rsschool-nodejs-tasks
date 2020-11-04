const cfg = require('../../common/config');
const router = require('express').Router();
const { catchInternal } = require('../../utilities/errorHandlers');
const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');

/* eslint-disable callback-return */

const freePaths = ['docs', 'login'];

const verify = authorization => {
  if (!authorization) return false;

  const token = authorization.slice(7);
  let payload = null;
  try {
    payload = jwt.verify(token, cfg.JWT_SECRET_KEY);
  } catch (err) {
    return null;
  }

  return payload;
};

router.route('*').all(
  catchInternal(async (req, res, next) => {
    const url = req.url.split('/')[1];
    const { authorization } = req.headers;
    if (freePaths.some(path => path === url) || verify(authorization)) {
      next();
    } else {
      res.status(httpStatus.UNAUTHORIZED).send(httpStatus.UNAUTHORIZED);
    }
  })
);

module.exports = {
  verifyLogin: router
};
