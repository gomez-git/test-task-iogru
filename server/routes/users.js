import { Router } from 'express';
import usersController from '../controllers/users.js';

const router = new Router();

router.all('/', usersController);

export default router;
