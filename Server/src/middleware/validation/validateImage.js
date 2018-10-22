
const validateImage = (req, res, next) => {
  try {
    if (req.files !== null) {
      const { image } = req.files;
      if (image.mimetype !== 'image/jpeg' && image.mimetype !== 'image/png') {
        throw new Error('invalid input');
      } else {
        next();
      }
    } else {
      req.files = { image: null };
      next();
    }
  } catch (e) {
    res.status(400).json({ error: `${e.message}, image must be either jpg or png` });
  }
};

export default validateImage;
