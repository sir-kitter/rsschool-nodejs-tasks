const db = require('./../../common/InMemoryDB');

const getAll = async () => await db.getAllBoards();

const get = async id => {
  const board = await db.getBoard(id);
  return board;
};

const create = async board => await db.createBoard(board);

const update = async (id, fields) => {
  return get(id) ? await db.updateBoard(id, fields) : false;
};

const remove = async id => {
  return await db.deleteBoard(id);
};

module.exports = { getAll, get, create, update, remove };
