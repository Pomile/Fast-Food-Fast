import bcrypt from 'bcrypt';
import data from '../db/data';


class User {
  static addUser(req, res) {
    const initialUsersCount = data.users.length;
    const {
      firstname, lastname, email, password, phone, role,
    } = req.body;

    const userId = initialUsersCount + 1;
    // find if existing account has a user name
    const findByEmail = data.users.find(user => user.email === email);

    if (findByEmail === undefined) {
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
    }
  }

  static authenticate(req, res) {
    const {
      email, password,
    } = req.body;

    const userData = data.users.find(user => user.email === email);
    if (userData === undefined) {
      res.status(404).json({ msg: 'user not found' });
    } else {
      const hash = userData.password;
      bcrypt.compare(password, hash, (err, result) => {
        if (result) {
          res.status(200).json({
            sucess: true, msg: 'user logged in sucessfully', isAuth: true, user: userData.id,
          });
        } else {
          res.status(401).json({ sucess: false, msg: 'invalid password' });
        }
      });
    }
  }
}


export default User;
