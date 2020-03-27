/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
// const session = require('express-session');

// server.user(
//   session({
//     name: 'session',
//     secret: 'computer drivers not engineers',
//     cookie: {
//       maxAge: 1 * 24 * 60 * 1000,
//       secret: true,
//     },
//     httpOnly: true,
//     resave: false,
//     saveUninitalized: false
//   })
// )

// module.exports = (req, res, next) => {
//   res.status(401).json({ you: 'shall not pass!' });
// };



const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET || 'the secret'

module.exports = (req, res, next) => {
  // expects token in the Request Authorization header
  // what value token? if no Authorization header in HTTP request?
  const token = req.headers.authorization

  if (token) {
    // check whether still valid, payload not tampered with, hasn't expired etc etc
    jwt.verify(
      token,
      JWT_SECRET,
      (err, decodedToken) => { // async form of jwt.verify!
        // async code
        if (err) {
          // token bad
          res.status(401).json({
            message: 'I do not love that token, stranger'
          })
        } else {
          // token good
          req.decodedToken = decodedToken
          next()
        }
      }
    )
  } else {
    // if no token at all
    res.status(400).json({ message: 'Emmm, you need a token' });
  }
}
