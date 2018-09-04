import express from 'express';
import { userValidator, validationApi, validateUserCrediential } from '../middleware/validation';
import verifyUser from '../middleware/verification';
import passwordEncryption from '../middleware/encryption';
import permit from '../middleware/permission';
import User from '../controller/user';
import fastFoods from '../controller/fastFoods';

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

router.get(
  '/fastFoods',
  verifyUser,
  fastFoods.getFastFoods,
);

router.get(
  '/fastFoods/:id',
  verifyUser,
  fastFoods.getFastFood,
);

router.post(
  '/fastFoods',
  permit('admin'),
  fastFoods.addFoodItem,
);

export default router;
