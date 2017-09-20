import {} from 'dotenv/config'
import mongoose from 'mongoose'
import { Router } from 'express'
import User from './user'

const router = Router()

mongoose.connect(process.env.DB_URI)

router.post('/register', (req, res, next) => {
  const { username, password } = req.body
  if (!username || !password)
    return next(new Error(4000))
  User.create({ username, password })
    .then(token => res.send(token))
    .catch(err => next(new Error(err.code)))
});

router.post('/login', (req, res, next) => {
  const { username, password } = req.body
  User.findOne({ username })
    .then(user =>
      user.passwordHashCompare(password)
        .then(user => user.tokenSeedRefresh()
          .then(token => res.send(token))
          .catch(err => next(new Error(500))))
        .catch(err => next(new Error(4010))))
    .catch(err => next(new Error(err.code)))
})

export default router
