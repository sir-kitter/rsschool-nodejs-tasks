const router = require('express').Router()
const Board = require('./board.model')
const boardsService = require('./board.service')

router.route('/').get(async (req, res) => {
    const boards = await boardsService.getAll()
    res.json(boards)
})

router.route('/:id').get(async (req, res) => {
    const board = await boardsService.get(req.params.id)
    if(board)
        res.json(board).status(200)
    else
        res.sendStatus(404)
})

router.route('/').post(async (req, res) => {
    const board = await boardsService.create(new Board({ ...req.body }))
    res.json(board)
})

router.route('/:id').put(async (req, res) => {
    const board = await boardsService.update(req.params.id, {
        id: req.params.id,
        ...req.body
    })
    res.json(board)
})

router.route('/:id').delete(async (req, res) => {
    res.sendStatus((await boardsService.remove(req.params.id)) ? 204 : 404)
})

module.exports = router