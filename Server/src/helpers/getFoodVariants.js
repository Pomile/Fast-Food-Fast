import db from '../model';

const { pgConnection } = db;

const getFoodVariants = async (id) => {
  let result;
  const dbClient = await pgConnection.connect();
  try {
    await dbClient.query('BEGIN');
    const getFoodVariantsByFoodId = await dbClient.query('SELECT description, price, quantity, foodId FROM FoodVariants INNER JOIN Foods ON FoodVariants.foodId = Foods.id WHERE foodId = $1', [+id]);
    const getAFood = await dbClient.query('SELECT name, image FROM Foods WHERE id = $1', [+id]);
    if (getFoodVariantsByFoodId.rows.length > 0 && getAFood.rows.length > 0) {
      result = { variants: getFoodVariantsByFoodId.rows, food: getAFood.rows, success: true };
    } else {
      result = { msg: 'food variants not found', success: false };
    }
    await dbClient.query('COMMIT');
  } catch (e) {
    // await dbClient.query('ROLLBACK');
    // result = { error: e.message };
  } finally {
    dbClient.release();
  }
  return result;
};

export default getFoodVariants;
