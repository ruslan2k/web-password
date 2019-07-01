const router = require('express').Router()
const User = require('../models/User')
const { Joi, celebrate, errors } = require('celebrate')
const auth = require('../auth')
const webPassword = require('../../common/webPassword')

// const loginUserSchema = Joi.object({
//   username: Joi.string().required(),
//   password: Joi.string().required()
// })

router.get('/', auth.required, async (req, res, next) => {
  // console.log('req.payload', req.payload)
  // webPassword.test(req.headers['x-enc-password'])
  res.json(webPassword.getGroups(req.payload.id))
})

router.use(errors())

module.exports = router
