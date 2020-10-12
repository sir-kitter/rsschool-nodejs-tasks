const boardsRepo = require('./board.memory.repository');

const getAll = async () => boardsRepo.getAll();
const get = async id => boardsRepo.get(id);
const create = async board => boardsRepo.create(board);
const update = async (id, fields) => boardsRepo.update(id, fields);
const remove = async id => await boardsRepo.remove(id);

module.exports = { getAll, get, create, update, remove };
