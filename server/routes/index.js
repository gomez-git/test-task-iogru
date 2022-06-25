import { Router } from 'express';
import usersRouter from './users.js';
import notFoundController from '../controllers/notFound.js';

const router = new Router();

router.use('/users', usersRouter);
router.use('*', notFoundController);

export default router;
