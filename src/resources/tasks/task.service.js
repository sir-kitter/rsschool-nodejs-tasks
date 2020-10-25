const tasksRepo = require('./task.mongodb.repository');

const getAll = async boardId => await tasksRepo.getAll(boardId);
const get = async (id, boardId) => await tasksRepo.get(id, boardId);
const create = async task => await tasksRepo.create(task);
const update = async (id, fields) => await tasksRepo.update(id, fields);
const remove = async (id, boardId) => await tasksRepo.remove(id, boardId);

module.exports = { getAll, get, create, update, remove };
