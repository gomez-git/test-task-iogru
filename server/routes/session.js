import { Router } from 'express';
import authMiddleware from '../middlewares/auth.js';
import checkMiddleware from '../middlewares/check.js';
import * as sessionController from '../controllers/session.js';

const router = new Router();

router.route('/')
  .post(authMiddleware, sessionController.login)
  .delete(checkMiddleware, sessionController.logout);

export default router;
