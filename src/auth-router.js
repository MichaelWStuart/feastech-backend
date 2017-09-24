import { Router } from 'express'
import User from './user'
import basicAuth from './basic-auth'
import bearerAuth from './bearer-auth'

const router = Router()

const cookie = token =>
  ['token', token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true }]

const noCookie = () =>
  ['token', '', { expires: new Date(0) }]

router.get('/register', basicAuth, (req, res, next) => {
  const { username, password } = req.credentials
  User.create({ username, password })
    .then(token => res.cookie(...cookie(token)).send('two hundred'))
    .catch(err => next(new Error(err.code)))
});

router.get('/login', basicAuth, (req, res, next) => {
  const { username, password } = req.credentials
  User.findOne({ username })
    .then(user =>
      user.passwordHashCompare(password)
        .then(user => user.tokenSeedRefresh()
          .then(token => res.cookie(...cookie(token)).send('two hundred'))
          .catch(err => next(new Error(5031))))
        .catch(err => next(new Error(4010))))
    .catch(err => next(new Error(err.code)))
})

router.get('/logout', bearerAuth, (req, res, next) => {
  req.user.tokenSeedDestroy()
    .then(() => res.cookie(...noCookie()).send('two hundred'))
    .catch((err) => next(new Error(err.code)))
})

export default router
