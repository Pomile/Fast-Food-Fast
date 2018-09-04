import express from 'express';
import { userValidator, validationApi, validateUserCrediential } from '../middleware/validation';
import passwordEncryption from '../middleware/encryption';
import User from '../controller/user';

const router = express.Router();

router.post(
  '/auth/signup',
  userValidator,
  validationApi,
  passwordEncryption,
  User.addUser,
);

router.post(
  '/auth/signin',
  validateUserCrediential,
  User.authenticate,
);

export default router;
