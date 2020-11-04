const { User } = require('../users/user.model');

const getAll = async () => User.find({});
const get = async id => User.findById(id);
const create = async user => User.create(user);
const update = async (id, newFields) =>
  User.findByIdAndUpdate(id, { $set: newFields }, { new: true, lean: true });

const remove = async id => User.deleteOne({ _id: id });
const getByLogin = async login => User.findOne({ login });

module.exports = { getAll, get, create, update, remove, getByLogin };
