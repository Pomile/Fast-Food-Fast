import moment from 'moment';
import data from '../db/data';

class FastFood {
  static getFastFoods(req, res) {
    const fastFoods = data.foodItems;
    res.status(200).json({ fastFoods, success: true });
  }

  static getFastFood(req, res) {
    const foodItemId = +req.params.id;
    const foodItem = data.foodItems.find(item => item.id === foodItemId);

    if (foodItem !== undefined && foodItem.quantity > 0) {
      res.status(200).json({ foodItem });
    } else {
      res.status(404).json({ success: false, msg: 'Fast food not found' });
    }
  }

  static addFoodItem(req, res) {
    const {
      foodCategoryName, name, description, price, quantity, expectedDeliveryTime,
    } = req.body;

    const userId = req.user.id;
    // find the id of foodCategoryName
    const foodCatIndex = data.foodCaterory.findIndex(cat => cat.name === foodCategoryName);
    // add food category if it does not exist

    if (foodCatIndex === -1) {
      const catLen = data.foodCaterory.length;
      data.foodCaterory.push({ id: catLen + 1, name: foodCategoryName });
    }
    const now = moment().format('LLLL');

    const foodCat = data.foodCaterory.find(cat => cat.name === foodCategoryName);

    const foodLen = data.foods.length;
    const foodIndex = data.foods.findIndex(food => food.name === name);


    if (foodIndex === -1) {
      data.foods.push({
        id: foodLen + 1, foodCategoryId: foodCat.id, userId, name, date: now,
      });
    }
    const foodData = data.foods.find(food => food.name === name);
    let foodItem = data.foodItems.find(item => item.description === description);
    const foodItemsLen = data.foodItems.length;
    if (foodData !== undefined && foodItem === undefined) {
      foodItem = {
        id: foodItemsLen + 1,
        foodId: foodData.id,
        description,
        price,
        quantity,
        expectedDeliveryTime,
      };
      data.foodItems.push(foodItem);
      res.status(201).json({ success: true });
    } else {
      res.status(409).json({ success: false, msg: 'Food item already exists' });
    }
  }
}
export default FastFood;
