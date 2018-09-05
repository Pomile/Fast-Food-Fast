import { body, check, validationResult } from 'express-validator/check';

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
    .custom(value => typeof value === 'number'),

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
    .withMessage(' expectedDeliveryTime id required')
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

export const validationApi = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // console.log(errors.array());
    res.status(422).json({ errors: errors.mapped() });
  } else {
    next();
  }
};