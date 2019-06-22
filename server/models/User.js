const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const secret = require('../config').secret

var UserSchema = new mongoose.Schema({
  sponsor: String,
  username: { type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true },
  email: { type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true },
  firstName: String,
  secondName: String,
  phone: Number,
  country: String,
  skype: String,
  salt: String,
  hash: String,
  finHash: String
}, { timestamps: true })

UserSchema.plugin(uniqueValidator, { message: 'is already taken.' })

UserSchema.methods.toJSON = function () {
  return {
    id: this._id,
    sponsor: this.sponsor,
    username: this.username,
    email: this.email,
    firstName: this.firstName,
    secondName: this.secondName,
    phone: this.phone,
    country: this.country,
    skype: this.skype
  }
}

UserSchema.methods.validPassword = function (password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
  return this.hash === hash
}

UserSchema.methods.setPassword = function (password, finPassword) {
  this.salt = crypto.randomBytes(16).toString('hex')
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
  this.finHash = crypto.pbkdf2Sync(finPassword, this.salt, 10000, 512, 'sha512').toString('hex')
}

UserSchema.methods.generateJWT = function () {
  var today = new Date()
  var exp = new Date(today)
  exp.setDate(today.getDate() + 31) // FIXME

  return jwt.sign({
    id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000)
  }, secret)
}

UserSchema.methods.toAuthJSON = function () {
  return {
    username: this.username,
    email: this.email,
    token: this.generateJWT()
  }
}

module.exports = mongoose.model('User', UserSchema)
