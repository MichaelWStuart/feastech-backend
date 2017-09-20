module.exports = (err, req, res, next) => {
  const error = Number(err.message);
  let code = 500;
  let message = 'General';

  switch (error) {
    case 4000:
      code = 400;
      message = 'Missing registration credentials';
      break;
    case 4001:
      code = 400;
      message = 'Missing login credentials';
      break;
    case 4010:
      code = 401;
      message = 'Password mismatch';
      break;
    case 11000:
      code = 409;
      message = 'Duplicate username or email';
  }

  res.status(code).send(message);
}
