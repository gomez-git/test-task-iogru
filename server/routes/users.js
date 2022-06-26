import { Router } from 'express';
import checkMiddleware from '../middlewares/check.js';
import usersController from '../controllers/users.js';

const router = new Router();

router.route('/:id')
  .patch(checkMiddleware, usersController)
  .delete(checkMiddleware, usersController);
router.route('/')
  .get(usersController)
  .post(usersController);

export default router;
