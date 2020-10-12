const usersRepo = require('./user.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');

const getAll = async () => await usersRepo.getAll();
const get = async id => await usersRepo.get(id);
const create = async user => await usersRepo.create(user);
const update = async (id, newFields) => await usersRepo.update(id, newFields);

const USER_NOT_FOUND = 404;
const USER_HAS_BEEN_DELETED = 204;
const remove = async id => {
  await tasksRepo.nullTaskUser(id);
  return (await usersRepo.remove(id)) ? USER_HAS_BEEN_DELETED : USER_NOT_FOUND;
};

module.exports = { getAll, get, create, update, remove };
