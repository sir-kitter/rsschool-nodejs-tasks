const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');

const db = [];

// db.push(new User(), new User(), new User())

const getAllUsers = async () => db;

const getUser = async id => {
  const users = db.filter(user => user.id === id);
  return users.length ? users[0] : {};
};

const createUser = async user => {
  db.push(user);
  return user;
};

const updateUser = async (id, newFields) => {
  const user = await getUser(id);
  return User.update(user, newFields);
};

const deleteUser = async id => {
  const index = db.findIndex(user => user.id === id);
  if (index !== -1) {
    await nullTaskUser(id);
    db.splice(index, 1);
    return true;
  }
  return false;
};

const boards = [];

// boards.push(new Board(), new Board())

const getAllBoards = async () => boards;

const createBoard = async board => {
  boards.push(board);
  return board;
};

const getBoard = async id => {
  const board = boards.find(value => value.id === id);
  return board;
};

const updateBoard = async (id, newFields) => {
  const board = await getBoard(id);
  return Board.update(board, newFields);
};

const deleteBoard = async id => {
  const index = boards.findIndex(board => board.id === id);
  if (index !== -1) {
    boards.splice(index, 1);
    await deleteTasksByBoardId(id);
    return true;
  }
  return false;
};

const tasks = [];

// tasks.push(new Task(), new Task(), new Task())

const getAllTasks = async boardId =>
  tasks.filter(task => task.boardId === boardId);

const getTask = async (id, boardId) => {
  const value = tasks.find(task => task.id === id && task.boardId === boardId);
  return value;
};

const createTask = async task => {
  tasks.push(task);
  return task;
};

const updateTask = async (id, fields) => {
  const taskToUpdate = tasks.find(value => value.id === id);
  if (taskToUpdate === null) return false;
  Object.assign(taskToUpdate, fields);
  return taskToUpdate;
};

const deleteTask = async (id, boardId) => {
  const taskIndex = tasks.findIndex(task => task.id === id);
  if (taskIndex !== -1 && tasks[taskIndex].boardId === boardId) {
    tasks.splice(taskIndex, 1);
    return true;
  }
  return false;
};

const nullTaskUser = async userId => {
  const toNull = tasks.filter(task => task.userId === userId);
  for (const task of toNull) task.userId = null;
  return toNull.length > 0;
};

const deleteTasksByBoardId = async boardId => {
  const toDelete = tasks.filter(task => task.boardId === boardId);
  if (toDelete.length > 0) {
    for (const task of toDelete) {
      await deleteTask(task.id, boardId);
    }
    return true;
  }
  return false;
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getAllBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard,
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  nullTaskUser,
  deleteTasksByBoardId
};
