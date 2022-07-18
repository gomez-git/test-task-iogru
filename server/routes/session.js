import { Router } from 'express';
import authMiddleware from '../middlewares/auth.js';
import authorization from '../middlewares/authorization.js';
import * as sessionController from '../controllers/session.js';

const router = new Router();

router.route('/')
  .post(authMiddleware, sessionController.login)
  .delete(authorization, sessionController.logout);

export default router;
