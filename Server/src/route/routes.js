import express from 'express';
import {
  userValidator, validationApi,
  validateUserCrediential,
  validateFoodItem,
  validateFoodVariantUpdate,
  validateFoodUpdate,
  validateUserOrderData,
  validateFoodCategory,
} from '../middleware/validation/validation';
import vaidateImage from '../middleware/validation/validateImage';
import validateParamsId from '../middleware/validation/idValidator';
import verifyUser from '../middleware/verification';
import passwordEncryption from '../middleware/encryption';
import permit from '../middleware/permission';
import User from '../controller/user';
import fastFoods from '../controller/fastFoods';
import order from '../controller/order';

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
  '/fastFoods/category/:id',
  validateParamsId,
  verifyUser,
  fastFoods.getFastFoodsByCategoryId,
);


router.get(
  '/fastFood',
  verifyUser,
  fastFoods.getFastFood,
);

router.get(
  '/fastFoods/:id',
  validateParamsId,
  verifyUser,
  fastFoods.getFastFoodVariants,
);

router.get(
  '/foods',
  verifyUser,
  fastFoods.getFoods,
);

router.get(
  '/fastFoodCategories',
  verifyUser,
  fastFoods.getFoodCategories,
);

router.post(
  '/fastFoods',
  validateFoodItem,
  validationApi,
  verifyUser,
  permit('admin'),
  fastFoods.addFoodItem,
);

router.post(
  '/fastFoodCategories',
  validateFoodCategory,
  validationApi,
  verifyUser,
  permit('admin'),
  fastFoods.addFoodCategory,
);

router.put(
  '/fastFoodCategory/:id',
  validateFoodCategory,
  validationApi,
  verifyUser,
  permit('admin'),
  fastFoods.modifyFoodCategory,
);

router.put(
  '/fastFoods/:id',
  validateFoodUpdate,
  validationApi,
  vaidateImage,
  verifyUser,
  permit('admin'),
  fastFoods.modifyFood,
);

router.put(
  '/fastFoodVariants/:id',
  validateFoodVariantUpdate,
  validationApi,
  validateParamsId,
  verifyUser,
  permit('admin'),
  fastFoods.modifyFoodVariants,
);


router.delete(
  '/fastFoods/:id',
  validateParamsId,
  verifyUser,
  permit('super-admin'),
  fastFoods.removeFastFood,
);

router.delete(
  '/fastFoodVariants/:id',
  validateParamsId,
  verifyUser,
  permit('admin'),
  fastFoods.removeFastFoodVariant,
);

router.post(
  '/orders',
  verifyUser,
  validateUserOrderData,
  validationApi,
  order.placeOrder,
);

router.get(
  '/user/orders',
  verifyUser,
  permit('admin'),
  order.getAllCustomersOrder,

);

router.put(
  '/user/orders/:id',
  verifyUser,
  permit('admin'),
  order.modifyOrder,
);

router.get(
  '/orders/:id',
  verifyUser,
  order.getAnOrder,
);


export default router;
