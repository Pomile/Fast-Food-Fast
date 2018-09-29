import { body, validationResult } from 'express-validator/check';
import { checkOrderFields, checkUserInfoFields } from './checkOrderFields';
import { userinfofields, userOrderfields } from './validationFields';
import { checkUserData, checkOrderData } from './validateOrderData';

export const userValidator = [
  body('firstname', 'firstname is required')
    .exists()
    .trim()
    .custom(value => value !== ''),

  body('lastname')
    .exists()
    .not()
    .isEmpty()
    .withMessage('Lastname is required')
    .custom(value => value !== ''),

  body('phone')
    .not().isEmpty()
    .trim()
    .escape()
    .withMessage('Phone no is required')
    .custom(value => value !== ''),

  body('email', 'must be an email address')
    .trim()
    .isEmail()
    .normalizeEmail(),

  body('password')
    .trim()
    .isLength({ min: 5 }).withMessage('must be at least 5 chars long')
    .matches(/\d/)
    .withMessage('must contain a number'),

  body('cpassword', 'confirm password must match password')
    .trim()
    .custom((value, { req }) => value === req.body.password),
];

export const validateFoodItem = [
  body('foodCategoryName')
    .trim()
    .exists()
    .not()
    .isEmpty()
    .withMessage('foodCategoryName is required')
    .custom(value => value !== ''),

  body('name')
    .trim()
    .exists()
    .not()
    .isEmpty()
    .withMessage('Food name is required')
    .custom(value => value !== ''),


  body('price')
    .exists()
    .not()
    .isEmpty()
    .withMessage('Price is required and must be a number')
    .custom(value => typeof value === 'number'),

  body('quantity')
    .exists()
    .not()
    .isEmpty()
    .withMessage('Quantity is required and must be a number')
    .custom(value => Number.isInteger(value)),

  body('description')
    .trim()
    .exists()
    .not()
    .isEmpty()
    .withMessage('Food description is required')
    .custom(value => value !== ''),

  body('expectedDeliveryTime')
    .trim()
    .exists()
    .not()
    .isEmpty()
    .withMessage(' expectedDeliveryTime id required')
    .custom(value => value !== ''),
];

export const validateFoodUpdate = [

  body('name')
    .trim()
    .exists()
    .not()
    .isEmpty()
    .withMessage('Food name is required')
    .custom(value => value !== ''),

];
export const validateFoodItemUpdate = [

  body('price')
    .exists()
    .not()
    .isEmpty()
    .withMessage('Price is required and must be a number')
    .custom(value => typeof value === 'number' && value > 0),

  body('quantity')
    .exists()
    .not()
    .isEmpty()
    .withMessage('Quantity is required and must be a number')
    .custom(value => typeof value === 'number' && value > 0),

  body('description')
    .trim()
    .exists()
    .not()
    .isEmpty()
    .withMessage('Food description is required')
    .custom(value => value !== ''),

  body('expectedDeliveryTime')
    .trim()
    .exists()
    .not()
    .isEmpty()
    .withMessage('expectedDeliveryTime required')
    .custom(value => value !== ''),
];

export const validateUserCrediential = [
  body('email', 'must be an email address')
    .trim()
    .isEmail()
    .normalizeEmail(),

  body('password')
    .trim()
    .isLength({ min: 5 }).withMessage('must be at least 5 chars long')
    .matches(/\d/)
    .withMessage('must contain a number'),
];

/*export const validateUserOrderUpdate = [

  body('data.*.userId', 'user id must be an integer').exists().isInt(),
  body('data.*.orders.*.foodItemId', 'food item id must be an integer').exists().isInt(),
  body('data.*.orders.*.quantity', 'quantity is required and must be an integer')
    .exists()
    .not()
    .isEmpty()
    .custom(value => Number.isInteger(value) && value > 0),
  body('data.*.destinationAddress', ' destinationAddress field must be a string')
    .trim()
    .exists()
    .not()
    .isEmpty()
    .withMessage('Food description is required')
    .custom(value => value !== ''),
];*/

export const validateUserOrderData = (req, res, next) => {
  const validateOrderFields = checkOrderFields(req, userOrderfields);
  const validateUserInfoFields = checkUserInfoFields(req, userinfofields);
  if (validateOrderFields.allOrderFieldExists === false || validateUserInfoFields.allUserInfoFieldExist === false) {
    const { field } = validateOrderFields.missingFields[0] || validateUserInfoFields.missingFields[0];
    res.status(400).json({ msg: `${field} is required` });
  } else {
    const orderResult = checkOrderData(req);
    const userInfoResult = checkUserData(req);
    if (orderResult.isValid && userInfoResult.isValid) {
      next();
    } else {
      res.status(400).json({ errors: orderResult.errors, userInfoErr: userInfoResult });
    }
  }
};


export const validationApi = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // console.log(errors.array());
    res.status(400).json({ errors: errors.mapped() });
  } else {
    next();
  }
};
