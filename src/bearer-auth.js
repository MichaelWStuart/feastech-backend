import jwt from 'jsonwebtoken'
import User from './user.js'

const bearerAuth = (req, res, next) => {

  const encoded = req.cookies.token
  if (!encoded)
    return next(new Error(4003))

  jwt.verify(encoded, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err)
      return next(new Error(4003))

    User.findOne({ tokenSeed: decoded.tokenSeed })
      .then(user => {
        if (!user)
          return next(new Error(4003))
          
        req.user = user
        next()
      })
      .catch(err => next(new Error(4003)))
  })
};

export default bearerAuth
