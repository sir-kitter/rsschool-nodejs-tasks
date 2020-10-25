const router = require('express').Router();
const { User } = require('./user.model');
const usersService = require('./user.service');
const { catchInternal } = require('./../../utilities/errorHandlers');

/* eslint-disable no-unused-vars */

router.route('/').get(
  catchInternal(async (req, res, next) => {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  catchInternal(async (req, res, next) => {
    const user = await usersService.get(req.params.id);
    res.json(User.toResponse(user));
  })
);

router.route('/').post(
  catchInternal(async (req, res, next) => {
    const user = await usersService.create(
      new User({
        login: req.body.login,
        password: req.body.password,
        name: req.body.name
      })
    );
    res.json(User.toResponse(user));
  })
);

router.route('/:id').put(
  catchInternal(async (req, res, next) => {
    const user = await usersService.update(req.params.id, {
      login: req.body.login,
      password: req.body.password,
      name: req.body.name
    });
    res.json(User.toResponse(user));
  })
);

router.route('/:id').delete(
  catchInternal(async (req, res, next) => {
    res.sendStatus(await usersService.remove(req.params.id));
  })
);

module.exports = router;
