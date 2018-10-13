import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import data from '../db/data';
import db from '../model';

const { pgConnection } = db;

class User {
  static async addUser(req, res) {
    const {
      firstname, lastname, email, password, phone,
    } = req.body;
    const query = {
      name: 'add-user',
      text: 'INSERT INTO users (firstname, lastname, email, phone, password) VALUES($1, $2, $3, $4, $5)',
      values: [firstname, lastname, email, phone, password],
      rowMode: 'array',
    };

    const findUserQuery = {
      name: 'find-user',
      text: 'SELECT id, email FROM users WHERE email = $1',
      values: [email],
    };

    pgConnection.on('error', (err, client) => {
      console.error('Unexpected error on idle client', err);
      process.exit(-1);
    });

    const dbClient = await pgConnection.connect();
    const findUserByEmail = await dbClient.query(findUserQuery);
    if (findUserByEmail.rows.length === 0) {
      pgConnection.connect()
        .then((client) => {
          client.query(query)
            .then((result) => {
              console.log(result.rows);
              client.release();
              res.status(201).json({
                data: {
                  firstname, lastname, email, phone,
                },
                success: true,
              }).end();
            }).catch((err) => {
              console.log(err.stack);
              client.release();
              res.status(409).json({ error: err.message, success: false }).end();
            });
        });
    } else {
      dbClient.release();
      res.status(409).json({ msg: 'user already exists', success: false }).end();
    }
    // Add a user
    // const userId = initialUsersCount + 1;
    // const findByEmail = data.users.find(user => user.email === email);
    /* if (findByEmail === undefined) {
      data.users.push({
        id: userId, firstname, lastname, email, phone, password, role,
      });
      res
        .status(201)
        .json({
          success: true,
          user: userId,
          msg: 'user added successfully',
        })
        .end();
    } else {
      res.status(409).json({ msg: 'user already exists' })
        .end();
    } */
  }

  static authenticate(req, res) {
    const { email, password } = req.body;
    const userData = data.users.find(user => user.email === email);
    if (userData === undefined) {
      res.status(404).json({ msg: 'user not found' }).end();
    } else {
      const hash = userData.password;
      bcrypt.compare(password, hash, (err, result) => {
        const token = jwt.sign({ data: userData.id }, 'landxxxofxxxopporxxxtunixxxty', { expiresIn: '24h' });
        if (result) {
          res.status(200).json({
            sucess: true, msg: 'user logged in sucessfully', isAuth: true, token,
          }).end();
        } else {
          res.status(401).json({ sucess: false, msg: 'invalid password' }).end();
        }
      });
    }
  }
}


export default User;
