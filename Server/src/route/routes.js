import express from 'express';
import {
  userValidator, validationApi,
  validateUserCrediential,
  validateFoodItem,
  validateFoodVariant,
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

// User API Routes
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

router.put(
  '/admin/assignment',
  verifyUser,
  permit('admin'),
  User.modifyUserRole,
);

// FastFood Routes

router.post(
  '/fastFood-categories',
  verifyUser,
  permit('admin'),
  fastFoods.addFoodCategories,
);

router.post(
  '/bulk-fastFoods',
  verifyUser,
  permit('admin'),
  fastFoods.addFastFoods,
);

router.post(
  '/bulk-fastFoodVariants',
  verifyUser,
  permit('admin'),
  fastFoods.addFoodVariants,
);

router.post(
  '/fastFoodsCategories',
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

router.put(
  '/fastFoods/:id',
  validateFoodUpdate,
  validationApi,
  vaidateImage,
  validateParamsId,
  verifyUser,
  permit('admin'),
  fastFoods.modifyFood,
);

router.get(
  '/fastFoods',
  verifyUser,
  fastFoods.getFastFoods,
);

router.get(
  '/fastFoods/categories/:id',
  validateParamsId,
  verifyUser,
  fastFoods.getFastFoodsByCategoryId,
);


router.get(
  '/fastFoods/:id',
  validateParamsId,
  verifyUser,
  fastFoods.getFastFoodVariants,
);


router.put(
  '/fastFoods/variants/:id',
  validateFoodVariant,
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
  permit('admin'),
  fastFoods.removeFastFood,
);

router.delete(
  '/fastFoods/variants/:id',
  validateParamsId,
  verifyUser,
  permit('admin'),
  fastFoods.removeFastFoodVariant,
);

router.post(
  '/orders',
  validateUserOrderData,
  validationApi,
  verifyUser,
  order.placeOrder,
);

router.get(
  '/customer/orders',
  verifyUser,
  permit('admin'),
  order.getAllCustomersOrder,
);

router.put(
  '/orders/:id',
  validateParamsId,
  verifyUser,
  permit('admin'),
  order.modifyOrder,
);

router.get(
  '/orders/:id',
  validateParamsId,
  verifyUser,
  order.getAnOrder,
);

router.get(
  '/user/orders',
  verifyUser,
  order.getAUserOrderHistory,
);

router.get(
  '/orders/:id/details',
  validateParamsId,
  verifyUser,
  order.getOrderDetails,
);


export default router;
