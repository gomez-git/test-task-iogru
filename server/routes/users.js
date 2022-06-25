import { Router } from 'express';
import usersController from '../controllers/users.js';

const router = new Router();

router.route('/')
  .post(usersController);

export default router;
