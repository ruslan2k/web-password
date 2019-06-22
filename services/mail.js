const sgMail = require('@sendgrid/mail')
const MAIL_FROM = process.env.MAIL_FROM || 'noreply@jkl.pw'
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || null

async function sendMessage (email, url) {
  sgMail.setApiKey(SENDGRID_API_KEY)
  const msg = {
    to: email,
    from: MAIL_FROM,
    subject: 'Password reminder',
    text: `Follow this link: ${url}`,
  }
  // console.log(msg)
  return sgMail.send(msg)
}

module.exports = {
  sendMessage,
}
