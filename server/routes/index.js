import { Router } from 'express';
import sessionRouter from './session.js';
import usersRouter from './users.js';
import notFoundController from '../controllers/notFound.js';

const router = new Router();

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('*', notFoundController);

export default router;
