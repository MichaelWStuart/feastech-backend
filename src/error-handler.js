const handler = (err, req, res, next) => {
  const error = Number(err.message)
  let code = 500
  let message = 'General'

  console.log(err)

  switch (error) {
    case 4000:
      code = 400
      message = 'Missing registration credentials'
      break
    case 4001:
      code = 400
      message = 'Missing login credentials'
      break
    case 4002:
      code = 400
      message = 'Basic authorization failed'
      break
    case 4003:
      code = 400
      message = 'Bearer authorization failed'
      break
    case 4010:
      code = 401
      message = 'Incorrect password'
      break
    case 5031:
      code = 503
      message = 'Server failed to generate token'
    case 11000:
      code = 409
      message = 'Duplicate username or email'
  }

  res.status(code).send(message)
}

export default handler
