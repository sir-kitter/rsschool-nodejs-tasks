const router = require('express').Router()
const User = require('./user.model')
const usersService = require('./user.service')

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll()
  res.json(users.map(User.toResponse))
})

router.route('/:id').get(async (req, res) => {
  const user = await usersService.get(req.params.id)
  res.json(User.toResponse(user))
})

router.route('/').post(async (req, res) => {
  const user = await usersService.create(new User({
    login: req.body.login,
    password: req.body.password,
    name: req.body.name
  }))
  res.json(User.toResponse(user))
})

router.route('/:id').put(async (req, res) => {
  const user = await usersService.update(req.params.id, {
    login: req.body.login,
    password: req.body.password,
    name: req.body.name
  })
  res.json(User.toResponse(user))
})

router.route('/:id').delete(async (req, res) => {
  res.sendStatus(await usersService.remove(req.params.id))
})

module.exports = router;
