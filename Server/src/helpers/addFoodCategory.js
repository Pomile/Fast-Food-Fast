import db from '../model';

const { pgConnection } = db;

const addFoodCategory = async (foodCategoryName) => {
  let result = {};
  let data;
  const dbClient = await pgConnection.connect();
  const foodCat = await dbClient.query({ name: 'find-food-category', text: 'SELECT * FROM FoodCategories WHERE type = $1', values: [foodCategoryName] });
  await dbClient.release();
  if (foodCat.rows.length === 0) {
    await pgConnection.connect().then((client) => {
      const rex = client.query({ name: 'add food category', text: 'INSERT INTO FoodCategories (type) VALUES ($1) RETURNING *', values: [foodCategoryName] });
      client.release();
      return rex;
    }).then((rex) => {
      [data] = rex.rows;
      result = {
        data, exist: false, msg: 'added new food category', success: true,
      };
    });
  } else {
    [data] = foodCat.rows;
    result = {
      data, exist: true, msg: 'food category already exist', success: false,
    };
  }
  return result;
};
export default addFoodCategory;
