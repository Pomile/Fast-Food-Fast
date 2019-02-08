// import data from '../db/data';
import addFood from '../helpers/addFood';
import addFoodCategory from '../helpers/addFoodCategory';
import getFoodVariants from '../helpers/getFoodVariants';
import db from '../model';
// import { switchFoodVariantsValuesToObject } from '../helpers/switchArrayToObject';

const { pgConnection } = db;


class FastFood {
  static async addFoodCategories(req, res) {
    const foodCategories = [...req.body];
    const dbClient = await pgConnection.connect();
    try {
      await dbClient.query('BEGIN');
      foodCategories.map((item) => {
        const insertFooCategory = 'INSERT INTO FoodCategories(type) VALUES($1)';
        const foodCat = { ...item };
        const insertFoodCategoryValue = [foodCat.name];
        dbClient.query(insertFooCategory, insertFoodCategoryValue);
      });

      await dbClient.query('COMMIT');
      res.status(201).json({ msg: 'foodcategories added successfully', data: foodCategories });
    } catch (err) {
      // await dbClient.query('ROLLBACK');
      // res.status(409).json({ msg: err.message });
    } finally {
      dbClient.release();
    }
  }

  static async addFastFoods(req, res) {
    const foods = [...req.body];
    const dbClient = await pgConnection.connect();
    try {
      await dbClient.query('BEGIN');
      await foods.map((item) => {
        const insertFood = 'INSERT INTO Foods(foodCategoryId, userId, name, date) VALUES($1, $2, $3, $4)';
        dbClient.query(insertFood, [item.foodCategoryId, item.userId, item.name, new Date()]);
      });
      await dbClient.query('COMMIT');
      res.status(201).json({ msg: 'foods added successfully', data: foods });
    } catch (err) {
      // await dbClient.query('ROLLBACK');
    } finally {
      dbClient.release();
    }
  }

  static async addFoodVariants(req, res) {
    const foodVariants = [...req.body];
    const dbClient = await pgConnection.connect();
    try {
      await dbClient.query('BEGIN');
      await foodVariants.map((item) => {
        const insertFoodVariant = 'INSERT INTO FoodVariants(userId, foodId, quantity, description, price, expecteddeliverytime ) VALUES($1, $2, $3, $4, $5, $6)';
        const insertFoodVariantValue = [item.userId, item.foodId, item.quantity, item.description, item.price, item.expectedDeliveryTime];
        dbClient.query(insertFoodVariant, insertFoodVariantValue);
      });
      await dbClient.query('COMMIT');
      res.status(201).json({ msg: 'food variants added successfully', data: foodVariants });
    } catch (err) {
      // await dbClient.query('ROLLBACK');
      // res.status(409).json({ msg: err.message });
    } finally {
      dbClient.release();
    }
  }

  static async getFoodCategories(req, res) {
    const dbClient = await pgConnection.connect();
    const getAllFoodCategories = await dbClient.query({ name: 'get all food categories', text: 'SELECT * FROM FoodCategories' });
    if (getAllFoodCategories.rows.length > 0) {
      dbClient.release();
      res.status(200).json({ data: getAllFoodCategories.rows, success: true }).end();
    } else {
      res.status(404).json({ msg: 'Not Found' });
    }
  }

  static async getFastFoods(req, res) {
    const { limit, offset } = req.query;
    let query = 'SELECT id, image, name FROM Foods';
    let values;
    let getAllFoods;
    const dbClient = await pgConnection.connect();
    try {
      if (limit && offset) {
        if (Number.isInteger(+limit) && Number.isInteger(+offset)) {
          query = 'SELECT id, image, name FROM Foods LIMIT $1 OFFSET $2';
          values = [+limit, +offset];
          getAllFoods = await dbClient.query(query, values);
        } else {
          throw new Error('invalid input');
        }
      } else if (req.query.search) {
        const getAFoodByname = await dbClient.query('SELECT * FROM Foods WHERE name = $1', [req.query.search]);
        if (getAFoodByname.rows.length > 0) {
          res.status(200).json({ data: getAFoodByname.rows[0], success: true }).end();
        }
      } else {
        getAllFoods = await dbClient.query(query);
      }
      await dbClient.query('COMMIT');
      res.status(200).json({ data: getAllFoods.rows, success: true }).end();
    } catch (e) {
      await dbClient.query('ROLLBACK');
      if (e.message === 'invalid input') {
        res.status(400).json({ msg: `${e.message}, limit and offset must be an integer` }).end();
      }
    } finally {
      dbClient.release();
    }
  }

  static async getFastFoodsByCategoryId(req, res) {
    const { id } = req.params;
    const dbClient = await pgConnection.connect();
    const getAllFoodsByCategoryId = await dbClient.query({
      name: 'get all foods',
      text: 'SELECT id, foodCategoryId, image, name FROM Foods WHERE foodCategoryId = $1',
      values: [+id],
    });
    await dbClient.release();
    res.status(200).json({ data: getAllFoodsByCategoryId.rows, success: true }).end();
  }

  static async getFastFoodVariants(req, res) {
    const { id } = req.params;
    const result = await getFoodVariants(id);
    if (result.success) {
      res.status(200).json(result).end();
    } else if (!result.success) {
      res.status(404).json(result).end();
    }
  }

  static async addFoodCategory(req, res) {
    const { foodCategoryName } = req.body;
    const foodCat = await addFoodCategory(foodCategoryName);
    if (!foodCat.exist && foodCat.success) {
      res.status(201).json({ msg: foodCat.msg, success: foodCat.success, data: foodCat.data }).end();
    } else if (foodCat.exist && !foodCat.success) {
      res.status(409).json({ msg: foodCat.msg, success: foodCat.success }).end();
    }
  }

  static async modifyFoodCategory(req, res) {
    const { foodCategoryName } = req.body;
    const { id } = req.params;
    const dbClient = await pgConnection.connect();
    const foodCat = await dbClient.query('SELECT * FROM FoodCategories WHERE id = $1', [+id]);
    if (foodCat.rows.length > 0) {
      const modifyFoodCat = await dbClient.query({ name: 'update food category', text: 'UPDATE FoodCategories SET type = $1 WHERE id =$2 RETURNING *', values: [foodCategoryName, +id] });
      res.status(200).json({ data: modifyFoodCat.rows[0], success: true, msg: 'food category updated successfully' }).end();
    } else {
      res.status(404).json({ msg: 'food category not found' }).end();
    }
  }

  static async modifyFood(req, res) {
    const { name } = req.body;
    const { id } = req.params;
    const { image } = req.files;
    const dbClient = await pgConnection.connect();
    try {
      await dbClient.query('BEGIN');
      const findFoodById = await dbClient.query('SELECT  * FROM Foods WHERE id = $1', [+id]);
      if (findFoodById.rows.length > 0) {
        const food = await dbClient.query('UPDATE Foods SET name = $1, image = $2 WHERE id =$3 RETURNING *', [name, image.data, +id]);
        if (food.rows.length > 0) {
          res.status(200).json({
            data: food.rows[0], msg: 'food updated successfully', update: true, success: true,
          });
        }
      } else {
        res.status(404).json({ msg: 'fast food not found', success: false });
      }
      await dbClient.query('COMMIT');
    } catch (e) {
      // await dbClient.query('ROLLBACK');
    } finally {
      await dbClient.release();
    }
  }

  static async modifyFoodVariants(req, res) {
    const {
      description, price, quantity, expectedDeliveryTime,
    } = req.body;
    const { id } = req.params;
    const dbClient = await pgConnection.connect();
    try {
      dbClient.query('BEGIN');
      const foodVariantFinderById = await dbClient.query('SELECT * FROM FoodVariants WHERE id = $1', [+id]);
      if (foodVariantFinderById.rows.length > 0) {
        const foodUpdate = await dbClient.query({
          name: 'update a food variant',
          text: 'UPDATE FoodVariants SET price = $1, description = $2, quantity = $3, expectedDeliveryTime = $4 WHERE id = $5 RETURNING *',
          values: [price, description, quantity, expectedDeliveryTime, id],
        });
        if (foodUpdate.rows.length > 0) {
          res.status(200).json({ data: foodUpdate.rows[0], success: true, msg: 'food variant updated successfully' }).end();
        }
      } else {
        res.status(404).json({ msg: 'food variant not found', success: false });
      }
      dbClient.query('COMMIT');
    } catch (e) {
      // dbClient.query('ROLLBACK');
    } finally {
      dbClient.release();
    }
  }

  static async addFoodItem(req, res) {
    const {
      foodCategoryName, name, description, price, quantity, expectedDeliveryTime,
    } = req.body;
    const { user } = req;
    const dbClient = await pgConnection.connect();
    const food = await addFood(user, foodCategoryName, name);
    try {
      const foodVariant = await dbClient.query({ name: 'find food variant', text: 'SELECT * FROM FoodVariants WHERE description = $1', values: [description] });
      if ((food.success || food.exist) && foodVariant.rows.length === 0) {
        const result = await dbClient.query({ name: 'add food variant', text: 'INSERT INTO FoodVariants (foodId, userId, description, price, quantity, expectedDeliveryTime) VALUES($1, $2, $3, $4, $5, $6 ) RETURNING *', values: [food.data.id, user, description, price, quantity, expectedDeliveryTime] });
        const data = result.rows[0];
        res.status(201).json({ success: true, data, msg: food.msg }).end();
      } else {
        res.status(409).json({ success: false, msg: 'Food item already exists' }).end();
      }
    } finally {
      dbClient.release();
    }
  }

  static async removeFastFood(req, res) {
    const { id } = req.params;
    const dbClient = await pgConnection.connect();
    try {
      await dbClient.query('BEGIN');
      const getFoodById = await dbClient.query('SELECT * FROM Foods WHERE id = $1', [+id]);
      if (getFoodById.rows.length > 0) {
        await dbClient.query('DELETE FROM FoodVariants WHERE foodId = $1', [+id]);
        await dbClient.query('DELETE FROM Foods WHERE id = $1 RETURNING *', [+id]);
        res.status(204).end();
      } else {
        res.status(404).json({ msg: 'fast food not found' }).end();
      }
      await dbClient.query('COMMIT');
    } catch (err) {
      // await dbClient.query('ROLLBACK');
    } finally {
      dbClient.release();
    }
  }

  static async removeFastFoodVariant(req, res) {
    const { id } = req.params;
    const dbClient = await pgConnection.connect();
    try {
      await dbClient.query('BEGIN');
      const getFoodVariantById = await dbClient.query('SELECT * FROM FoodVariants WHERE id = $1', [+id]);
      if (getFoodVariantById.rows.length > 0) {
        await dbClient.query('DELETE FROM FoodVariants WHERE id = $1', [+id]);
        res.status(204).end();
      } else {
        res.status(404).json({ msg: 'fast food not found' }).end();
      }
      await dbClient.query('COMMIT');
    } catch (err) {
      // await dbClient.query('ROLLBACK');
    } finally {
      await dbClient.release();
    }
  }
}
export default FastFood;
