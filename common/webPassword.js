const low = require('lowdb')
const fs = require('fs')
const FileSync = require('lowdb/adapters/FileSync')
const crypto = require('crypto')
const path = require('path')
const uuidv4 = require('uuid/v4')

const adapter = new FileSync('db.json')
const db = low(adapter)
const passwordFile = process.env.passwordFile || path.join(__dirname, 'secret.password')
const publicKeyFile = process.env.publicKeyFile || path.join(__dirname, 'publicKey.pem')
const encPrivateKeyFile = process.env.encPrivateKeyFile || path.join(__dirname, 'privateKey.pem')
const publicKeyJs = process.env.publicKeyJs || path.join(__dirname, '../client/src/publicKey.pem.js')
var cSPassword
var cSPublicKey
var cSPrivateKey

if (fs.existsSync(passwordFile) && fs.existsSync(publicKeyFile) && fs.existsSync(encPrivateKeyFile)) {
  cSPassword = fs.readFileSync(passwordFile).toString()
  cSPublicKey = fs.readFileSync(publicKeyFile).toString()
  cSPrivateKey = fs.readFileSync(encPrivateKeyFile).toString()
} else {
  cSPassword = crypto.randomBytes(320)

  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem', cipher: 'aes-256-cbc', passphrase: cSPassword.toString('hex') }
  })
  cSPublicKey = publicKey
  cSPrivateKey = privateKey

  fs.writeFileSync(passwordFile, cSPassword.toString('hex'))
  fs.writeFileSync(publicKeyFile, cSPublicKey)
  fs.writeFileSync(encPrivateKeyFile, cSPrivateKey)
  fs.writeFileSync(publicKeyJs, 'export const publicKey = `' + publicKey + '`;')
}

// Set some defaults (required if your JSON file is empty)
db.defaults({ groups: [], profiles: [] })
  .write()

function createGroup (userId, name) {
  var profile = db.get('profiles')
    .find({ userId: userId })
    .value()
  if (!profile) {
    return null
  }
  console.log('profile', profile)
}

function createProfile (userId, encPassword) {
  const password = decryptPassword(encPassword)
  const salt = crypto.randomBytes(32).toString('hex')
  const key = crypto.pbkdf2Sync(password, salt, 1000, 32, 'sha512')
  const profileId = uuidv4()
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: {  type: 'pkcs8', format: 'pem', cipher: 'aes-256-cbc', passphrase: key.toString('hex') }
  })
  const groupId = createGroup('Personal', publicKey)
  db.get('profiles')
    .push({
      id: profileId,
      userId: userId,
      salt: salt,
      groups: [{
        id: groupId,
        encPrivateKey: privateKey
      }]
    })
    .write()
  return profileId
}

function decryptPassword (encPassword) {
  return crypto.privateDecrypt({
    key: cSPrivateKey,
    passphrase: cSPassword
  }, Buffer.from(encPassword, 'base64'))
}
// function createPasswordForPrivateKey (password
// Set a user using Lodash shorthand syntax

function createGroup (name, publicKey) {
  const id = uuidv4()
  db.get('groups')
    .push({
      id,
      name,
      publicKey
    })
    .write()
  return id
}

function getGroups (userId) {
  const profile = db.get('profiles')
    .find({ userId })
    .value()
  return profile.groups.map(group => db.get('groups').find({ id: group.id }).value())
}

function test (str) {
  console.log(str)
  // const profileId = createUserProfile(1, 'p@$$W0rD')
  // const profile = db.get('profiles').find({ id: profileId }).value()
  // console.log(profile)
}

module.exports = {
  createProfile,
  createGroup,
  getGroups,
  test,
  decryptPassword
}
