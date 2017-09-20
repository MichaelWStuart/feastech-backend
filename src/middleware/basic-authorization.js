import { Router } from 'express';
import User from '../models';

const router = Router();

router.use((req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new Error(4001);
  }

  next();
})

export default router;
