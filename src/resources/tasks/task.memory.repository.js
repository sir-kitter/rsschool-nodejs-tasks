const db = require('./../../common/InMemoryDB');

const getAll = async boardId => db.getAllTasks(boardId);

const get = async (id, boardId) => await db.getTask(id, boardId);
const create = async task => await db.createTask(task);
const update = async (id, fields) => await db.updateTask(id, fields);
const remove = async (id, boardId) => {
  return await db.deleteTask(id, boardId);
};

const deleteTasksByBoardId = async id => db.deleteTasksByBoardId(id);
const nullTaskUser = async id => db.nullTaskUser(id);

module.exports = {
  getAll,
  get,
  create,
  update,
  remove,
  deleteTasksByBoardId,
  nullTaskUser
};
