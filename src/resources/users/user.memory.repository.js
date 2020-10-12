const db = require('../../common/InMemoryDB');

const getAll = async () => db.getAllUsers();
const get = async id => db.getUser(id);
const create = async user => db.createUser(user);
const update = async (id, newFields) => db.updateUser(id, newFields);
const remove = async id => db.deleteUser(id);

module.exports = { getAll, get, create, update, remove };
