const router = require('express').Router()
const url = require('url')
const User = require('../models/User')
const { Joi, celebrate, errors } = require('celebrate')
const auth = require('../auth')
const { sendMessage } = require('../../services/mail')
const webPassword = require('../../common/webPassword')

const createUserSchema = Joi.object({
  email: Joi.string().email().required(),
  encPassword: Joi.string().required()
})

const loginUserSchema = Joi.object({
  email: Joi.string().required(),
  encPassword: Joi.string().required()
})

const findUserSchema = Joi.object({
  token: Joi.string().required(),
  idUser: Joi.string(),
  username: Joi.string(),
  email: Joi.string(),
  phoneNumber: Joi.string(),
  inStructureUser: Joi.string()
})

const resetPasswordSchema = Joi.object({
  username: Joi.string().required(),
  type: Joi.number().integer().min(0).max(1).required(),
  token: Joi.string()
})

/** User Login
 */
router.post('/login', celebrate({ body: loginUserSchema }), async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      return res.status(404).json({ errors: { 'User': 'not found' } })
    }
    if (!user.validEncPassword(req.body.encPassword)) {
      return res.status(401).json({ errors: { 'Password': 'refusal of authorization' } })
    }
    return res.json({ token: user.generateJWT() })
  } catch (err) {
    next(err)
  }
})

/** Create new User
 */
router.post('/', celebrate({ body: createUserSchema }), async (req, res, next) => {
  try {
    const user = new User({ email: req.body.email })
    user.setEncPassword(req.body.encPassword)
    await user.save()
    webPassword.createProfile(user.id, req.body.encPassword)
    res.json(user.toAuthJSON())
  } catch (err) {
    next(err)
  }
})

// disabled // router.get('/', [auth.required, celebrate({ query: findUserSchema })], async (req, res, next) => {
// disabled //   try {
// disabled //     const users = await User.find()
// disabled //     res.json(users)
// disabled //   } catch (err) {
// disabled //     next(err)
// disabled //   }
// disabled // })

router.get('/me', auth.required, async (req, res, next) => {
  try {
    const user = await User.findById(req.payload.id)
    if (!user) {
      res.status(401).json({ error: {message: 'Unauthorized'}})
    }
    return res.json(user)
  } catch (e) {
    next(e)
  }
})

/**
 * Route serving password reset
 * @memberof user
 * @name post/resetPassword/
 * @function
 */
router.post('/resetPassword/', celebrate({ body: resetPasswordSchema }), async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if (!user) {
      return res.status(404).json({ errors: { 'User': 'not found' } })
    }
    sendMessage(user.email, url.format({ protocol: req.protocol, host: req.get('host'), pathname: '/resetPassword' }))
      .then(() => res.json({ message: 'Email sent', email: user.email }))
      .catch(err => {
        console.error(err)
        res.status(500).json({ errors: { 'Server': 'Email service error' } })
      })
  } catch (err) {
    next(err)
  }
})

router.use(errors())

module.exports = router
