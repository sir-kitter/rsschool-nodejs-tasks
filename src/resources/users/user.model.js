const uuid = require('uuid');

class User {
  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static update(user, fields) {
    if(user instanceof User) {
      if(fields.name !== undefined) user.name = fields.name
      if(fields.login !== undefined) user.login = fields.login
      if(fields.password !== undefined) user.password = fields.password
    }
    return user
  }

  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;
