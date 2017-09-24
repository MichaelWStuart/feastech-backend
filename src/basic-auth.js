const basicAuth = (req, res, next) => {

  const { authorization } = req.headers
  if (!authorization)
    return next(new Error(4002))

  const encoded = authorization.split('Basic ')[1]
  if (!encoded)
    return next(new Error(4002))

  const [username, password] = Buffer.from(encoded, 'base64').toString().split(':')
  if (!username || !password)
    return next(new Error(4000))

  req.credentials = { username, password }
  next()
};

export default basicAuth;
