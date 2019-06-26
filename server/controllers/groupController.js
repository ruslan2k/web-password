const router = require('express').Router()
const User = require('../models/User')
const { Joi, celebrate, errors } = require('celebrate')
const auth = require('../auth')
const webPassword = require('../../common/webPassword')

// const loginUserSchema = Joi.object({
//   username: Joi.string().required(),
//   password: Joi.string().required()
// })

router.get('/', async (req, res, next) => {
  webPassword.test(req.headers['x-enc-password'])
  res.json({ ok: true })
  // try {
  //   const user = await User.findOne({ username: req.query.username })
  //   if (!user) {
  //     return res.status(404).json({ errors: { 'User': 'not found' } })
  //   }
  //   if (!user.validPassword(req.query.password)) {
  //     return res.status(401).json({ errors: { 'Password': 'refusal of authorization' } })
  //   }
  //   return res.json({ token: user.generateJWT() })
  // } catch (err) {
  //   next(err)
  // }
})

router.use(errors())

module.exports = router
