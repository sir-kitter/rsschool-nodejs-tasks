const { Board } = require('../boards/board.model');

const getAll = async () => Board.find({});
const get = async id => Board.findOne({ _id: id });
const create = async board => Board.create(board);
const update = async (id, newFields) =>
  Board.findByIdAndUpdate(
    id,
    { $set: Board.fromJSON(newFields) },
    { new: true, lean: true }
  );
const remove = async id => Board.deleteOne({ _id: id });

module.exports = { getAll, get, create, update, remove };
