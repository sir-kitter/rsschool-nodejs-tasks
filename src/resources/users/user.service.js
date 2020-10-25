const usersRepo = require('./user.mongodb.repository');
const tasksRepo = require('../tasks/task.mongodb.repository');

const getAll = async () => usersRepo.getAll();
const get = async id => usersRepo.get(id);
const create = async user => usersRepo.create(user);
const update = async (id, newFields) => usersRepo.update(id, newFields);

const USER_NOT_FOUND = 404;
const USER_HAS_BEEN_DELETED = 204;
const remove = async userId => {
  await tasksRepo.nullTaskUser(userId);
  return (await usersRepo.remove(userId))
    ? USER_HAS_BEEN_DELETED
    : USER_NOT_FOUND;
};

module.exports = { getAll, get, create, update, remove };
