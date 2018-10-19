import moment from 'moment';
import addFoodCategory from './addFoodCategory';
import db from '../model';

const { pgConnection } = db;


const addFood = async (userId, foodCategoryName, name) => {
  let res = {};
  const result = await addFoodCategory(foodCategoryName);
  if (result.success || result.exist) {
    const dbClient = await pgConnection.connect();
    const findFoodByName = await dbClient.query({ name: 'find food by name', text: 'SELECT  * FROM Foods WHERE name = $1', values: [name] });
    if (findFoodByName.rows.length === 0) {
      try {
        await pgConnection.connect()
          .then((client) => {
            const food = client.query({ name: 'add food', text: 'INSERT INTO Foods (userId, foodCategoryId, name, date) VALUES ($1, $2, $3, $4) RETURNING *', values: [userId, result.data.id, name, moment().format('LLLL')] });
            client.release();
            return food;
          }).then(food => food.rows[0]).then((data) => {
            res = {
              data, msg: 'food added successfully', exist: false, success: true,
            };
          });
      } catch (e) {
        res = { error: e.message, success: false };
      }
    } else {
      res = { msg: 'food already exist', exist: true, success: false };
    }
  }
  return res;
};

export default addFood;
