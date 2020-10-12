const router = require('express').Router({ mergeParams: true })
const Task = require('./task.model')
const tasksService = require('./task.service')

router.route('/').get(async (req, res) => {
    const tasks = await tasksService.getAll(req.params.boardId)
    if(tasks)
        res.json(tasks).status(200)
    else
        res.sendStatus(404)
})

router.route('/:id').get(async (req, res) => {
    const task = await tasksService.get(req.params.id, req.params.boardId)
    if(task)
        res.json(task).status(200)
    else
        res.sendStatus(404)
})

router.route('/').post(async (req, res) => {
    const { boardId } = req.params
    const task = await tasksService.create(new Task({ ...req.body, boardId }))
    res.json(task)
})

router.route('/:id').put(async (req, res) => {
    const { boardId } = req.params
    const task = await tasksService.update(req.params.id, { ...req.body, boardId })
    if(task)
        res.json(task)
    else
        res.sendStatus(404)
})

router.route('/:id').delete(async (req, res) => {
    res.sendStatus((await tasksService.remove(req.params.id, req.params.boardId)) ? 204 : 404)
})

module.exports = router
