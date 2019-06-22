const router = require('express').Router()
const url = require('url')
const User = require('../models/User')
const { Joi, celebrate, errors } = require('celebrate')
const auth = require('../auth')
const { sendMessage } = require('../../services/mail')

const createUserSchema = Joi.object({
  sponsor: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  firstName: Joi.string().required(),
  secondName: Joi.string().required(),
  phone: Joi.number().required(),
  country: Joi.string().min(2).max(2).required(),
  password: Joi.string().required(),
  finPassword: Joi.string().required(),
  skype: Joi.string(),
})

const findUserSchema = Joi.object({
  token: Joi.string().required(),
  idUser: Joi.string(),
  username: Joi.string(),
  email: Joi.string(),
  phoneNumber: Joi.string(),
  inStructureUser: Joi.string(),
})

const resetPasswordSchema = Joi.object({
  username: Joi.string().required(),
  type: Joi.number().integer().min(0).max(1).required(),
  token: Joi.string()
})

/**
 * Create new User
 */
router.post('/', celebrate({ body: createUserSchema }), async (req, res, next) => {
  try {
    const user = new User(req.body)
    user.setPassword(req.body.password, req.body.finPassword)
    await user.save()
    res.json(user.toAuthJSON())
  } catch (err) {
    next(err)
  }
})

router.get('/', [auth.required('query'), celebrate({ query: findUserSchema })], async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    next(err)
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
    sendMessage(user.email, url.format({ protocol: req.protocol, host:req.get('host'), pathname: '/resetPassword' }))
      .then(() => res.json({ message: 'Email sent', email: user.email }))
      .catch(err => {
        console.error(err)
        res.status(500).json({ errors: { 'Server': 'Email service error' } })
      })
    // res.json({ message: 'Email sent', email: user.email })
  } catch (err) {
    next(err)
  }
})

router.use(errors())

module.exports = router
