import express, { Router } from 'express';
import UsersController from '../controllers/users.js';

const router = new Router();

router.route('/:id')
  .get(UsersController.getOne)
  .patch(express.json(), UsersController.update)
  .delete(UsersController.delete);
router.route('/')
  .get(UsersController.getAll);

export default router;
