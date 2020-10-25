const router = require('express').Router();
const { Board } = require('./board.model');
const boardsService = require('./board.service');
const httpStatus = require('http-status');
const { catchInternal } = require('./../../utilities/errorHandlers');

/* eslint-disable no-unused-vars */

router.route('/').get(
  catchInternal(async (req, res, next) => {
    const boards = await boardsService.getAll();
    res.json(boards.map(Board.toResponse));
  })
);

router.route('/:id').get(
  catchInternal(async (req, res, next) => {
    const board = await boardsService.get(req.params.id);
    if (board) res.json(Board.toResponse(board)).status(httpStatus.OK);
    else res.sendStatus(httpStatus.NOT_FOUND);
  })
);

router.route('/').post(
  catchInternal(async (req, res, next) => {
    const board = await boardsService.create(req.body);
    res.json(Board.toResponse(board));
  })
);

router.route('/:id').put(
  catchInternal(async (req, res, next) => {
    const board = await boardsService.update(req.params.id, req.body);
    res.json(Board.toResponse(board));
  })
);

router.route('/:id').delete(
  catchInternal(async (req, res, next) => {
    res.sendStatus(
      (await boardsService.remove(req.params.id))
        ? httpStatus.NO_CONTENT
        : httpStatus.NOT_FOUND
    );
  })
);

module.exports = router;
