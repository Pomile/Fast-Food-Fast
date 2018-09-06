import data from '../db/data';

const getUser = (userId) => {
  const user = {};
  data.users.map((u) => {
    if (u.id === +userId) {
      Object.keys(u).map((ukeys) => {
        if (ukeys.toString() !== 'password') {
          user[ukeys.toString()] = u[ukeys.toString()];
        }
        return null;
      });
    }
    return null;
  });
  return user;
};
export default getUser;
