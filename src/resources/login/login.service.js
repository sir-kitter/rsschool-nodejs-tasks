const jwt = require('jsonwebtoken');
const cfg = require('../../common/config');
const hash = require('../../utilities/hash');
const usersRepo = require('../users/user.mongodb.repository');

const getToken = async (login, password) => {
  if (!login) return null;
  const user = await usersRepo.getByLogin(login);
  const isMatch =
    user.login === login && (await hash.match(password, user.password));
  if (isMatch) {
    const token = jwt.sign(
      { name: user._id, login: user.login },
      cfg.JWT_SECRET_KEY,
      { expiresIn: '5m' }
    );
    return token;
  }
  return null;
};

module.exports = {
  getToken
};
