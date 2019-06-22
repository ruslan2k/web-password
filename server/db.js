const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const dbUri = process.env.MONGODB_URI || 'mongodb://mongo/webpassword'

mongoose.connect(dbUri, {useNewUrlParser: true})
const dbConnection = mongoose.connection

dbConnection.on('error', console.error.bind(console, 'connection error:'))
dbConnection.once('open', function () {
  console.debug('Connected to db: ' + dbUri)
})

module.exports = {
  dbConnection,
}
