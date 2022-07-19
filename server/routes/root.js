import { Router } from 'express';
import authentication from '../middlewares/authentication.js';
import authorization from '../middlewares/authorization.js';
import * as rootController from '../controllers/root.js';

const router = new Router();

router.route('/')
  .post(authentication, rootController.login)
  .delete(authorization, rootController.logout);

export default router;
