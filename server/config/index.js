if (!process.env.SECRET) throw new Error('secret should be set');

module.exports = {
  secret: process.env.SECRET
}
