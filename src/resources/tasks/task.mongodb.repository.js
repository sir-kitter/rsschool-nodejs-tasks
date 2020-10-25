const { Task } = require('../tasks/task.model');
// const mongo = require('mongoose')

const getAll = async boardId => Task.find({ boardId });
const get = async (id, boardId) => Task.findOne({ _id: id, boardId });
const create = async task => Task.create(task);
const update = async (id, newFields) =>
  Task.findByIdAndUpdate(id, { $set: newFields }, { new: true, lean: true });
const remove = async (id, boardId) => Task.deleteOne({ _id: id, boardId });

const deleteTasksByBoardId = async boardId => Task.deleteMany({ boardId });
const nullTaskUser = async id =>
  Task.updateMany({ userId: id }, { $set: { userId: null } });

module.exports = {
  getAll,
  get,
  create,
  update,
  remove,
  deleteTasksByBoardId,
  nullTaskUser
};
