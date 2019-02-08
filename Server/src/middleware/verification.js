import jwt from 'jsonwebtoken';
import db from '../model';
import { switchUserValuesToObject } from '../helpers/switchArrayToObject';
// import data from '../db/data';
const { pgConnection } = db;


const verifyUser = (req, res, next) => {
  const payload = req.headers.authorization || req.headers['x-access-token'];
  if (req.headers.isauth === undefined) {
    res.status(401).json({ msg: 'Not authorized', success: false }).end();
  } else if (JSON.parse(req.headers.isauth)) {
    jwt.verify(payload, 'landxxxofxxxopporxxxtunixxxty', async (err, decoded) => {
      if (!err) {
        const dbClient = await pgConnection.connect();
        const userData = await dbClient.query('SELECT id, firstname, lastname, role FROM users WHERE id = $1', [decoded.data]);
        await dbClient.release();
        if (userData.rows.length === 1) {
          [req.user] = userData.rows;
          next();
        }
      } else {
        res.status(401).send({ success: false, err: 'invalid token', errMsg: err.message }).end();
      }
    });
  } else {
    res.status(401).json({ msg: 'user is not authenticated', success: false }).end();
  }
};

export default verifyUser;
