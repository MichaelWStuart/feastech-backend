import {} from 'dotenv/config';
import mongoose from 'mongoose';
import { Router } from 'express';
import { User, Device } from './models';

const router = Router();

mongoose.connect(process.env.DB_URI);

// user routes

router.post('/user', (req, res) => {
  const { username, password } = req.body;
  User.create({ username, password }, (err, data) => {
    res.send(data);
  });
});

router.get('/user', (req, res) => {
  User.find({}, (err, data) => {
    res.send(data);
  });
});

// device routes

router.post('/device', (req, res) => {
  const userId = '59b7208b074647246e34f691'; // hardcoded admin account
  const { name, type, brand, os } = req.body;
  Device.create({ userId, name, type, brand, os }, (err, data) => {
    res.send(data);
  });
});

router.get('/device', (req, res) => {
  Device.find({}, (err, data) => {
    res.send(data);
  });
});

export default router;
