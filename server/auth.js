const jwt = require('express-jwt')
const secret = require('./config').secret

function getTokenFromQuery (req) {
  if (req.query.token) {
    return req.query.token
  }
  return null
}

function required (reqParam) {
  let getToken
  if (reqParam === 'query') {
    return jwt({
      secret: secret,
      userProperty: 'payload',
      getToken: getTokenFromQuery
    })
  }
  return function (req, res, next) {
    let err = new Error(`Cant find token in ${reqParam}`)
    err.status = 400
    next(err)
  }
}

const auth = {
  required
}

module.exports = auth
