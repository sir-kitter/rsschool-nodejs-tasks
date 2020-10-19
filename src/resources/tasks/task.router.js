const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');
const httpStatus = require('http-status');
const { catchInternal } = require('./../../utilities/errorHandlers');

/* eslint-disable no-unused-vars */

router.route('/').get(
  catchInternal(async (req, res, next) => {
    const tasks = await tasksService.getAll(req.params.boardId);
    if (tasks) res.json(tasks).status(httpStatus.OK);
    else res.sendStatus(httpStatus.NOT_FOUND);
  })
);

router.route('/:id').get(
  catchInternal(async (req, res, next) => {
    const task = await tasksService.get(req.params.id, req.params.boardId);
    if (task) res.json(task).status(httpStatus.OK);
    else res.sendStatus(httpStatus.NOT_FOUND);
  })
);

router.route('/').post(
  catchInternal(async (req, res, next) => {
    const { boardId } = req.params;
    const task = await tasksService.create(new Task({ ...req.body, boardId }));
    res.json(task);
  })
);

router.route('/:id').put(
  catchInternal(async (req, res, next) => {
    const { boardId } = req.params;
    const task = await tasksService.update(req.params.id, {
      ...req.body,
      boardId
    });
    if (task) res.json(task);
    else res.sendStatus(httpStatus.NOT_FOUND);
  })
);

router.route('/:id').delete(
  catchInternal(async (req, res, next) => {
    res.sendStatus(
      (await tasksService.remove(req.params.id, req.params.boardId))
        ? httpStatus.NO_CONTENT
        : httpStatus.NOT_FOUND
    );
  })
);

module.exports = router;
