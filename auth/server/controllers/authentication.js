const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../config')

function tokenForUser(user) {
  return jwt.sign({ sub: user.id }, config.secret)
}

exports.signup = function (req, res, next) {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(422).json({ error: 'You must provide email and password' })
  }

  // See if a user with the given email exists
  User.findOne({ email })
    .then((existingUser) => {
      // If the user with email does exist, return an error
      if (existingUser) {
        return res.status(422).json({ error: 'Email is in use' })
      }

      // If a user with email does NOT exist, create and save user record
      return User.create({ email, password }).then((user) => {
        // Respond to request indicating the user was created
        return res.json({ token: tokenForUser(user) })
      })
    }).catch((err) => {
      return next(err)
    })
}

exports.signin = function (req, res, next) {
  return res.json({ token: tokenForUser(req.user) })
}
