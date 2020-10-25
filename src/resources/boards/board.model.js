// const uuid = require('uuid');

// class Board {
//   constructor({
//     id = uuid(),
//     title = 'title',
//     columns = [
//       {
//         id: uuid(),
//         title: 'title',
//         order: 0
//       }
//     ]
//   } = {}) {
//     this.id = id;
//     this.title = title;
//     this.columns = columns;
//   }

//   static update(board, fields) {
//     if (board instanceof Board) {
//       if (fields.title !== undefined) board.title = fields.title;
//       if (fields.columns !== undefined) board.columns = fields.columns;
//     }
//     return board;
//   }
// }

const mongo = require('mongoose');

const columnsSchema = new mongo.Schema({
  title: String,
  order: Number
});

const boardSchema = new mongo.Schema({
  title: String,
  columns: [columnsSchema]
});

boardSchema.statics.toResponse = board => {
  const columns = board.columns
    ? board.columns.map(column => {
        return {
          id: column._id,
          title: column.title,
          order: column.order
        };
      })
    : [];
  return {
    id: board._id,
    title: board.title,
    columns
  };
};

boardSchema.statics.fromJSON = board => {
  const columns = board.columns
    ? board.columns.map(column => {
        return {
          _id: column.id,
          title: column.title,
          order: column.order
        };
      })
    : [];
  return {
    _id: board.id,
    title: board.title,
    columns
  };
};

const Board = mongo.model('Board', boardSchema, 'boards');

module.exports = { Board };
