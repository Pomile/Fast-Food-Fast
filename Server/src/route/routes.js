import express from 'express';
import {
  userValidator, validationApi,
  validateUserCrediential,
  validateFoodItem,
  validateFoodItemUpdate,
  validateFoodUpdate,
  validateOrder,
  validateUserOrder,
} from '../middleware/validation';
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
router.post(
  '/fastFoods',
  validateFoodItem,
  validationApi,
  permit('admin'),
  fastFoods.addFoodItem,
);

router.put(
  '/fastFoods/:foodItemId',
  validateFoodItemUpdate,
  validationApi,
  permit('admin'),
  fastFoods.modifyFastFoodItem,
);

router.put(
  '/fastFood/:foodId',
  validateFoodUpdate,
  validationApi,
  permit('admin'),
  fastFoods.modifyFastFood,
);

router.delete(
  '/fastFood/:foodId',
  permit('admin'),
  fastFoods.removeFastFood,
);

router.delete(
  '/fastFoods/:itemId',
  permit('admin'),
  fastFoods.removeFastFoodItem,
);

router.post(
  '/orders',
  validateUserOrder,
  validationApi,
  order.placeOrder,
);

router.get(
  '/orders',
  verifyUser,
  (req, res) => {
    if (req.query.customerOrders === 'true') {
      order.getUserOrders(req, res);
    } else {
      permit('admin, user');
      order.getOrders(req, res);
    }
  },
);

router.put(
  '/orders/:orderId',
  permit('admin'),
  order.modifyOrder,
);


export default router;
