import {} from 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'

const createTokenSeed = () =>
  crypto.randomBytes(32).toString('hex')

const createToken = tokenSeed =>
  jwt.sign({ tokenSeed }, process.env.TOKEN_SECRET)

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  passwordHash: String,
  tokenSeed: String,
})

UserSchema.methods.passwordHashCreate = function(password) {
  return bcrypt.hash(password, 8)
    .then(hash => {
      this.passwordHash = hash
      return this
    })
}

UserSchema.methods.passwordHashCompare = function(password) {
  return new Promise((resolve, reject) =>
    bcrypt.compare(password, this.passwordHash)
      .then(isCorrect =>
        isCorrect ? resolve(this) : reject()))
}

UserSchema.methods.tokenSeedRefresh = function() {
  this.tokenSeed = createTokenSeed()
  return new Promise((resolve, reject) =>
    this.save()
      .then(() => resolve(createToken(this.tokenSeed)))
      .catch(() => reject()))
}

const User = mongoose.model('User', UserSchema)

User.create = credentials => {
  const { username, password } = credentials
  const tokenSeed = createTokenSeed()
  return new Promise((resolve, reject) =>
    new User({ username, tokenSeed })
      .passwordHashCreate(password)
        .then(user => user.save()
          .then(() => resolve(createToken(tokenSeed)))
          .catch(err => reject(err))))
}

export default User
