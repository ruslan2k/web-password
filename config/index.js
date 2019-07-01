const crypto = require('crypto')
const secret = crypto.randomBytes(16).toString('hex')

module.exports = {
  // secret: process.env.NODE_ENV === 'production' ? process.env.SECRET : 'secret'
  secret: process.env.NODE_ENV === 'production' ? process.env.SECRET : secret
};
