const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: String
})

// On Save Hook, encrypt password
userSchema.pre('save', function (next) {
  const user = this

  bcrypt.hash(user.password, 10)
    .then((hash) => {
      user.password = hash
      next()
    })
    .catch((err) => next(err))
})

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}


const ModelClass = mongoose.model('user', userSchema)
module.exports = ModelClass