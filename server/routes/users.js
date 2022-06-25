import { Router } from 'express';
import usersController from '../controllers/users.js';

const router = new Router();

router.route('/:id')
  .delete(usersController);
router.route('/')
  .get(usersController)
  .post(usersController);

export default router;
