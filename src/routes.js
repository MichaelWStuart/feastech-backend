import {} from 'dotenv/config';
import mongoose from 'mongoose';
import { Router } from 'express';
import { User } from './models';

const router = Router();

mongoose.connect(process.env.DB_URI);


router.post('/register', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(new Error(4000));
  }
  User.create({ username, password })
    .then(user => res.send(user))
    .catch(err => next(new Error(err.code)));
});


router.post('/user/login', (req, res) => {
  const { _id, password } = req.body;
  User.findById(_id)
    .then(data =>
      data.passwordHashCompare(password)
        .then(user => res.send(user))
        .catch(err => res.status(401).send({ message: 'unauthorized: password mismatch' })))
    .catch(err => res.send(err))
})

export default router;
