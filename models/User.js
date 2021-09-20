const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const normalize = require('normalize-url');
const gravatar = require('gravatar');

const UserSchema = new mongoose.Schema({
  firstname: { 
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { 
    type: String,
    required: true,
  },
  gravatarUrl: { 
    type: String 
  },
  role: {
    type: String, 
    required: true
  }
});

UserSchema.methods.setPassword = async function (password) {
  await bcrypt
    .hash(password, await bcrypt.genSalt(10))
    .then((hash) => { this.password = hash; })
    .catch((error) => console.log(error));
};

UserSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.setGravatar = async function (email) {
  this.gravatarUrl = await normalize(
    gravatar.url(email, { s: '200', r: 'pg', d: 'mm', }),
    { forceHttps: true }
  );
};

UserSchema.methods.isValid = async function () {
  return this.email && this.password && this.firstname && this.lastname;
}

UserSchema.methods.generateJwt = function (remember) {
  let expiry = new Date();
  remember ? expiry.setDate(expiry.getDate() + 30) : expiry.setDate(expiry.getDate() + 7);
  return jwt.sign({
    sub: this._id,
    role: this.role,
    exp: Math.trunc(expiry.getTime() / 1000),
  }, process.env.JWT_SECRET);
};

module.exports = mongoose.model('User', UserSchema, 'users');
