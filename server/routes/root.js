import { Router } from 'express';
import authentication from '../middlewares/authentication.js';
import RootController from '../controllers/root.js';

const router = new Router();

router.post('/signup', RootController.signup);
router.post('/signin', authentication, RootController.signin);

export default router;
