import express from 'express';
import {
  userValidator, validationApi,
  validateUserCrediential,
  validateFoodItem,
  validateFoodItemUpdate,
  validateFoodUpdate,
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
  verifyUser,
  permit('admin'),
  fastFoods.addFoodItem,
);

router.put(
  '/fastFoods/:foodItemId',
  validateFoodItemUpdate,
  validationApi,
  verifyUser,
  permit('admin'),
  fastFoods.modifyFastFoodItem,
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
