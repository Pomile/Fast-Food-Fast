import data from '../db/data';

const verifyUser = (req, res, next) => {
  const authorized = req.headers.authorization;
  const userId = req.headers.user;
  if (authorized === undefined || userId === undefined) {
    res.status(401).json({ msg: 'not authenticated', success: false });
  } else if (authorized === 'false') {
    res.status(401).json({ msg: 'user is not authenticated', success: false });
  } else {
    const userData = data.users.find(user => user.id === Number(userId));
    req.user = userData;
    next();
  }
};

export default verifyUser;
