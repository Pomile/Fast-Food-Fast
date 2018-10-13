import jwt from 'jsonwebtoken';
import db from '../model';
// import data from '../db/data';
const { pgConnection } = db

const verifyUser = async (req, res, next) => {
  const payload = req.headers.authorization || req.headers['x-access-token'];
  if (req.headers.isauth === undefined) {
    res.status(401).json({ msg: 'Not authorized', success: false }).end();
  } else if (JSON.parse(req.headers.isauth)) {
    jwt.verify(payload, 'landxxxofxxxopporxxxtunixxxty', (err, decoded) => {
      if (!err) {
        const findUserByIdQuery = {
          name: 'find-user',
          text: 'SELECT id, firstname, lastname, email FROM users WHERE email = $1',
          values: [decoded.data],
        };
        const dbClient = await pgConnection.connect();
        const userData = await dbClient.query(findUserByIdQuery)
        // const userData = data.users.find(user => user.id === Number(decoded.data));
        req.user = userData;
        next();
      } else {
        res.status(401).send({
          success: false,
          err: 'invalid token',
          errMsg: err.message,
        }).end();
      }
    });
  } else {
    res.status(401).json({ msg: 'user is not authenticated', success: false }).end();
  }
};

export default verifyUser;
