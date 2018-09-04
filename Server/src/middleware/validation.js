import { body, validationResult } from 'express-validator/check';

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

export const validationApi = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.mapped() });
  } else {
    next();
  }
};
