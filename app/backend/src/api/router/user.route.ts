import * as express from 'express';
import UserController from '../controller/user.controller';
import { validateLogin, validateTokenMiddleware } from '../middleware/validateInputs';

const router = express.Router();

router.post(
  '/',
  validateLogin,
  (req, res) => UserController.login(req, res),
);

router.get(
  '/role',
  validateTokenMiddleware,
  (req, res) => UserController.getRole(req, res),
);

export default router;
