const mongo = require('mongoose');
const hash = require('../../utilities/hash');

/* eslint-disable no-unused-vars */

const userSchema = new mongo.Schema(
  {
    name: {
      type: String,
      required: true
    },
    login: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
    //    _id: String,
  },
  { versionKey: false }
);

userSchema.statics.toResponse = user => {
  const { _id, name, login } = user;
  return { id: _id, name, login };
};

userSchema.pre('save', async function preSave(next) {
  this.password = await hash.calc(this.password);
  next();
});

userSchema.pre('findOneAndUpdate', async function preUpdate(next) {
  this._update.$set.password = await hash.calc(this._update.$set.password);
});

const User = mongo.model('User', userSchema, 'users');

module.exports = { User };
