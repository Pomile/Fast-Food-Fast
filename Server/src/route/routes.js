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
  '/fastFoods/:id',
  verifyUser,
  fastFoods.getFastFood,
);

router.get(
  '/foods',
  verifyUser,
  fastFoods.getFoods,
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
  '/fastFoodCategory',
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

router.put(
  '/fastFood/:foodId',
  validateFoodUpdate,
  validationApi,
  verifyUser,
  permit('admin'),
  fastFoods.modifyFastFood,
);

router.delete(
  '/fastFood/:foodId',
  verifyUser,
  permit('admin'),
  fastFoods.removeFastFood,
);

router.delete(
  '/fastFoods/:itemId',
  verifyUser,
  permit('admin'),
  fastFoods.removeFastFoodItem,
);

router.post(
  '/orders',
  verifyUser,
  validateUserOrderData,
  validationApi,
  order.placeOrder,
);

router.get(
  '/orders',
  verifyUser,
  (req, res) => {
    if (req.query.customerOrders === 'true') {
      permit('admin, user');
      order.adminGetUserOrders(req, res);
    } else {
      order.getUserOrder(req, res);
    }
  },
);

router.put(
  '/orders/:orderId',
  verifyUser,
  permit('admin'),
  order.modifyOrder,
);

router.get(
  '/orders/:orderId',
  verifyUser,
  order.getOrder,
);


export default router;
