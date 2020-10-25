// const uuid = require('uuid');

// class Task {
//   constructor({
//     id = uuid(),
//     title = 'task',
//     order = 0,
//     description = 'description',
//     userId,
//     columnId = null,
//     boardId
//   } = {}) {
//     this.id = id;
//     this.title = title;
//     this.order = order;
//     this.description = description;
//     this.userId = userId;
//     this.columnId = columnId;
//     this.boardId = boardId;
//   }
// }

const mongo = require('mongoose');

const taskSchema = new mongo.Schema(
  {
    title: String,
    order: Number,
    description: String,
    userId: String,
    columnId: String,
    boardId: String
  },
  { versionKey: false }
);

taskSchema.statics.toResponse = task => {
  const { _id, title, order, description, userId, columnId, boardId } = task;
  return { id: _id, title, order, description, userId, columnId, boardId };
};

const Task = mongo.model('Task', taskSchema, 'tasks');

module.exports = { Task };
