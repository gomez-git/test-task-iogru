import { Router } from 'express';
import authentication from '../middlewares/authentication.js';
import authorization from '../middlewares/authorization.js';
import * as sessionController from '../controllers/session.js';

const router = new Router();

router.route('/')
  .post(authentication, sessionController.login)
  .delete(authorization, sessionController.logout);

export default router;
