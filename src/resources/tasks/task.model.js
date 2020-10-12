const uuid = require('uuid');

class Task {
  constructor({
    id = uuid(),
    title = 'task',
    order = 0,
    description = 'description',
    userId,
    columnId = null,
    boardId
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.columnId = columnId;
    this.boardId = boardId;
  }
}

module.exports = Task;
