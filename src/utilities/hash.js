const { genSalt, hash, compare } = require('bcrypt');

const calc = async psw => hash(psw, await genSalt(12));
const match = async (psw, pswHash) => compare(psw, pswHash);

module.exports = {
  calc,
  match
};
