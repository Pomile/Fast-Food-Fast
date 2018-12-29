// import data from '../db/data';
import addFood from '../helpers/addFood';
import addFoodCategory from '../helpers/addFoodCategory';
import getFoodVariants from '../helpers/getFoodVariants';
import db from '../model';
// import { switchFoodVariantsValuesToObject } from '../helpers/switchArrayToObject';

const { pgConnection } = db;


class FastFood {
  static async getFoodCategories(req, res) {
    try {
      const dbClient = await pgConnection.connect();
      const getAllFoodCategories = await dbClient.query({
        name: 'get all food categories',
        text: 'SELECT * FROM FoodCategories',
      });
      res.status(200).json({ data: getAllFoodCategories.rows, success: true }).end();
    } catch (e) {
      res.status(500).json({ error: e.message }).end();
    }
  }

  static async getFastFoods(req, res) {
    let query = {
      name: 'get all foods', text: 'SELECT id, image, name FROM Foods',
    };
    try {
      if (req.query.limit && req.query.offset) {
        const { limit, offset } = req.query;
        if (Number.isInteger(+limit) && Number.isInteger(+offset)) {
          query = {
            name: 'get all foods', text: 'SELECT id, image, name FROM Foods LIMIT $1 OFFSET $2', values: [+limit, +offset],
          };
        } else {
          throw new Error('invalid input');
        }
      }
      const dbClient = await pgConnection.connect();
      const getAllFoods = await dbClient.query(query);
      dbClient.release();
      res.status(200).json({ data: getAllFoods.rows, success: true }).end();
    } catch (e) {
      if (e.message === 'invalid input') {
        res.status(400).json({ msg: `${e.message}. limit and offset must be an integer` }).end();
      } else {
        res.status(500).json({ error: e.message }).end();
      }
    }
  }

  static async getFastFoodsByCategoryId(req, res) {
    const { id } = req.params;
    try {
      const dbClient = await pgConnection.connect();
      const getAllFoodsByCategoryId = await dbClient.query({
        name: 'get all foods',
        text: 'SELECT id, foodCategoryId, image, name FROM Foods WHERE foodCategoryId = $1',
        values: [+id],
      });
      dbClient.release();
      res.status(200).json({ data: getAllFoodsByCategoryId.rows, success: true }).end();
    } catch (e) {
      res.status(500).json({ error: e.message }).end();
    }
  }

  static getFoods(req, res) {
    const { foods } = data;
    res.status(200).json({ foods, success: true }).end();
  }

  static async getFastFood(req, res) {
    const { search } = req.query;
    try {
      const dbClient = await pgConnection.connect();
      const getAFoodById = await dbClient.query({
        name: 'get a food items',
        text: 'SELECT * FROM Foods WHERE name = $1',
        values: [search],
      });
      dbClient.release();
      res.status(200).json({ data: getAFoodById.rows[0], success: true }).end();
    } catch (e) {
      res.status(500).json({ error: e.message }).end();
    }
  }

  static async getFastFoodVariants(req, res) {
    const { id } = req.params;
    const result = await getFoodVariants(id);
    if (result.success) {
      res.status(200).json(result).end();
    } else if (!result.success) {
      res.status(404).json(result).end();
    } else if (result.error) {
      res.status(500).json(result).end();
    }
  }

  static async addFoodCategory(req, res) {
    const { foodCategoryName } = req.body;
    const foodCat = await addFoodCategory(foodCategoryName);
    if (!foodCat.exist && foodCat.success) {
      res.status(201).json({ msg: foodCat.msg, success: foodCat.success, data: foodCat.data }).end();
    } else if (foodCat.exist && !foodCat.success) {
      res.status(409).json({ msg: foodCat.msg, success: foodCat.success }).end();
    } else {
      res.status(500).json({ error: foodCat.error });
    }
  }

  static async modifyFoodCategory(req, res) {
    const { foodCategoryName } = req.body;
    const { id } = req.params;
    try {
      const foodCatClient = await pgConnection.connect();
      const foodCat = await foodCatClient.query({ name: 'find-food-category', text: 'SELECT * FROM FoodCategories WHERE id = $1', values: [+id] });
      await foodCatClient.release();
      if (foodCat.rows.length > 0) {
        const modifyFoodCatClient = await pgConnection.connect();
        const modifyFoodCat = await modifyFoodCatClient.query({ name: 'update food category', text: 'UPDATE FoodCategories SET type = $1 WHERE id =$2 RETURNING *', values: [foodCategoryName, +id] });
        await modifyFoodCatClient.release();
        res.status(200).json({ data: modifyFoodCat.rows[0], success: true, msg: 'food category updated successfully' });
      } else {
        res.status(404).json({ msg: 'food category not found', success: false });
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async modifyFood(req, res) {
    const { name } = req.body;
    const { id } = req.params;
    const { image } = req.files;
    try {
      const dbClient = await pgConnection.connect();
      const findFoodById = await dbClient.query({ name: 'find food by name', text: 'SELECT  * FROM Foods WHERE id = $1', values: [+id] });
      await dbClient.release();
      if (findFoodById.rows.length > 0) {
        await pgConnection.connect()
          .then((client) => {
            const food = client.query({ name: 'add food', text: 'UPDATE Foods SET name = $1, image = $2 WHERE id =$3 RETURNING *', values: [name, image, +id] });
            client.release();
            return food;
          }).then(food => food.rows[0]).then((data) => {
            res.status(200).json({
              data, msg: 'food updated successfully', update: true, success: true,
            });
          });
      } else {
        res.status(404).json({ msg: 'food not found', success: false });
      }
    } catch (e) {
      (e.message === 'invalid image') ? res.status(400).json({ msg: `${e.message} image must format be jpg or png` }) : res.status(500).json({ error: e.message, success: false });
    }
  }

  static async modifyFoodVariants(req, res) {
    const {
      description, price, quantity, expectedDeliveryTime,
    } = req.body;
    const { id } = req.params;
    try {
      const foodVariantConnect = await pgConnection.connect();
      const foodVariantFinderById = await foodVariantConnect.query({ name: 'find food variant', text: 'SELECT * FROM FoodVariants WHERE id = $1', values: [+id] });
      await foodVariantConnect.release();
      if (foodVariantFinderById.rows.length > 0) {
        await pgConnection.connect().then((client) => {
          const foodUpdate = client.query({
            name: 'update a food variant',
            text: 'UPDATE FoodVariants SET price = $1, description = $2, quantity = $3, expectedDeliveryTime = $4 WHERE id = $5 RETURNING *',
            values: [price, description, quantity, expectedDeliveryTime, id],
          });
          client.release();
          return foodUpdate;
        }).then(foodUpdate => res.status(200).json({ data: foodUpdate.rows[0], success: true, msg: 'food variant updated successfully' }));
      } else {
        res.status(404).json({ msg: 'food variant not found', success: false });
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
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
    } catch (e) {
      res.status(500).json({ error: e.message }).end();
    } finally {
      dbClient.release();
    }
  }

  static modifyFastFoodItem(req, res) {
    const {
      description, price, quantity, expectedDeliveryTime, foodId, name,
    } = req.body;

    const { foodItemId } = req.params;
    if (Number.isInteger(+foodItemId)) {
      const foodItemIndex = data.foodItems.findIndex(item => item.id === +foodItemId);
      const foodIndex = data.foods.findIndex(item => item.id === +foodId);
      if (foodItemIndex !== -1) {
        data.foods[foodIndex].name = name;
        data.foodItems[foodItemIndex].quantity = quantity;
        data.foodItems[foodItemIndex].description = description;
        data.foodItems[foodItemIndex].price = price;
        data.foodItems[foodItemIndex].expectedDeliveryTime = expectedDeliveryTime;
        res.status(200).json({
          msg: 'food item modified successfully',
          success: true,
          data: {
            id: foodIndex, description, price, quantity, expectedDeliveryTime, foodId, name,
          },
        }).end();
      } else {
        res.status(404).json({ msg: 'food item does not exist', success: false }).end();
      }
    } else {
      res.status(400).json({ msg: 'invalid request' });
    }
  }

  static async removeFastFood(req, res) {
    const { id } = req.params;
    const dbClient = await pgConnection.connect();
    try {
      await dbClient.query('BEGIN');
      const removeFoodVariantsById = await dbClient.query('DELETE FROM FoodVariants WHERE foodId = $1', [+id]);
      const removeFoodById = await dbClient.query('DELETE FROM Foods WHERE id = $1 RETURNING *', [+id]);
      const getFoodById = await dbClient.query('SELECT * FROM Foods WHERE id = $1', [+id]);
      console.log('remove food', removeFoodById.rows, getFoodById.rows.length);
      if (getFoodById.rows.length) {
        res.status(204).json.end();
      }
      await dbClient.query('COMMIT');
    } catch (err) {
      await dbClient.query('ROLLBACK');
      console.log(err);
    } finally {
      await dbClient.release();
    }
  }

  static removeFastFoodItem(req, res) {
    const { itemId } = req.params;
    if (Number.isInteger(+itemId)) {
      data.foodItems.map((item, i) => {
        if (item.foodId === +itemId) {
          data.foodItems.splice(i, 1);
          res.status(204).end();
          return null;
        }
        return item;
      });
    } else {
      res.status(400).json({ msg: 'invalid request' });
    }
  }
}
export default FastFood;
