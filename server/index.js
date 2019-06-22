const app = require('./app')
const db = require('./db')
const server = app.listen( process.env.PORT || 3000, () => {
  console.log('Listening on port: ' + server.address().port)
})
