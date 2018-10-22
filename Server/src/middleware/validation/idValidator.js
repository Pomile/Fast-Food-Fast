const validateParameterId = (req, res, next) => {
  const { id } = req.params;
  if (Number.isInteger(+id)) {
    next();
  } else {
    res.status(400).json({ msg: 'invalid parameter id. id must be an integer' }).end();
  }
};

export default validateParameterId;
