import { Router } from 'express';
import rootRouter from './root.js';
import usersRouter from './users.js';
import authorization from '../middlewares/authorization.js';
import notFoundController from '../controllers/notFound.js';

const router = new Router();

router.use('/users', authorization, usersRouter);
router.use('/', rootRouter);
router.use('*', notFoundController);

export default router;
