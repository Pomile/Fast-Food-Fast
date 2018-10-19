
const permit = (...permited) => (req, res, next) => {
  const userData = req.user;
  const userRole = userData.role;
  console.log(JSON.parse(req.headers.isauth), userRole);
  if (JSON.parse(req.headers.isauth) && permited.indexOf(userRole) !== -1) {
    req.user = userData.id;
    next();
  } else {
    res.status(403).json({ message: 'access denied' });
  }
};

export default permit;
