import { Router } from 'express';
import authorization from '../middlewares/authorization.js';
import usersController from '../controllers/users.js';

const router = new Router();

router.route('/:id')
  .patch(authorization, usersController)
  .delete(authorization, usersController);
router.route('/')
  .get(usersController)
  .post(usersController);

export default router;
