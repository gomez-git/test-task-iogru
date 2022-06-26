import { Router } from 'express';
import authMiddleware from '../middlewares/auth.js';
import * as sessionController from '../controllers/session.js';

const router = new Router();

router.route('/')
  .post(authMiddleware, sessionController.login);

export default router;
