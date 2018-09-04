import data from '../db/data';

const verifyUser = (req, res, next) => {
  const authorized = req.headers.authorization;
  const userId = req.headers.user;
  if (authorized === false) {
    res.status(403).json({ msg: 'user is not authentic', success: false });
  } else {
    const userData = data.users.find(user => user.id === Number(userId));
    req.user = userData;
    next();
  }
};

export default verifyUser;
