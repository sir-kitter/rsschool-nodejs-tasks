/* eslint-disable no-process-exit */
// const { User } = require('../resources/users/user.model');
// const Board = require('../resources/boards/board.model');
const mongo = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('./config');

const init = callback => {
  mongo.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
  const connection = mongo.connection;

  connection.on('error', () => {
    console.error('connection error');
    process.exit(2);
  });
  connection.once('open', () => {
    console.log('mongodb connected');
    connection.collection('users').deleteMany({});
    connection.collection('boards').deleteMany({});
    connection.collection('tasks').deleteMany({});
    queueMicrotask(callback);
  });
};

module.exports = {
  init
};
