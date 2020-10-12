const uuid = require('uuid');

class Board {
  constructor({
    id = uuid(),
    title = 'title',
    columns = [{
        id: uuid(),
        title: 'title',
        order: 0
    }]
  } = {}) {
    this.id = id
    this.title = title
    this.columns = columns
  }

  static update(board, fields) {
    if(board instanceof Board) {
      if(fields.title !== undefined) board.title = fields.title
      if(fields.columns !== undefined) board.columns = fields.columns
    }
    return board
  }
}

module.exports = Board