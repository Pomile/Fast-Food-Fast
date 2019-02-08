import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import data from '../db/data';
import db from '../model';
import { switchUserValuesToObject } from '../helpers/switchArrayToObject';

const { pgConnection } = db;

class User {
  static async addUser(req, res) {
    const {
      firstname, lastname, email, password, phone, role,
    } = req.body;
    const query = {
      name: 'add-user',
      text: 'INSERT INTO users (firstname, lastname, email, phone, password, role ) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
      values: [firstname, lastname, email, phone, password, role],
      rowMode: 'array',
    };

    const findUserQuery = {
      name: 'find-user',
      text: 'SELECT id, email FROM users WHERE email = $1',
      values: [email],
    };

    const dbClient = await pgConnection.connect();
    const findUserByEmail = await dbClient.query(findUserQuery);
    if (findUserByEmail.rows.length === 0) {
      pgConnection.connect()
        .then((client) => {
          client.query(query)
            .then((result) => {
              const data = switchUserValuesToObject(result);
              return data;
            }).then((data) => {
              client.release();
              res.status(201).json({ data, success: true, msg: 'user added successfully' }).end();
            });
        });
    } else {
      dbClient.release();
      res.status(409).json({ msg: 'user already exists', success: false }).end();
    }
  }

  static async modifyUserRole(req, res) {
    const { email, role } = req.body;
    const dbClient = await pgConnection.connect();
    try {
      await dbClient.query('BEGIN');
      const findUser = await dbClient.query('SELECT * from USERS WHERE email = $1', [email]);
      if (findUser.rows.length > 0) {
        const updateUserRole = await dbClient.query('UPDATE USERS SET role = $1 WHERE email = $2 RETURNING email, role', [role, email]);
        if (updateUserRole.rows[0].role === role) {
          res.status(200).json({ data: updateUserRole.rows[0], msg: 'user role updated successfully' });
        }
      }
      await dbClient.query('COMMIT');
    } catch (err) {
      // await dbClient.query('ROLLBACK');
    } finally {
      dbClient.release();
    }
  }

  static async authenticate(req, res) {
    const { email, password } = req.body;
    const findUserByEmailQuery = {
      text: 'SELECT * FROM users WHERE email = $1',
      values: [email],
    };
    // const userData = data.users.find(user => user.email === email);
    const dbClient = await pgConnection.connect();
    const findUserByEmail = await dbClient.query(findUserByEmailQuery);
    if (findUserByEmail.rows.length === 0) {
      dbClient.release();
      res.status(404).json({ msg: 'user not found' }).end();
    } else {
      const hash = findUserByEmail.rows[0].password;
      // console.log(hash);
      bcrypt.compare(password, hash, (err, result) => {
        const token = jwt.sign({ data: findUserByEmail.rows[0].id }, 'landxxxofxxxopporxxxtunixxxty', { expiresIn: '24h' });
        // console.log(result);
        dbClient.release();
        if (result) {
          res.status(200).json({
            sucess: true, msg: 'user logged in sucessfully', isAuth: true, token,
          }).end();
        } else {
          res.status(401).json({ sucess: false, msg: 'invalid password', data: findUserByEmail.rows[0].id }).end();
        }
      });
    }
  }
}


export default User;
