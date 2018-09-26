import data from '../db/data';
import addFood from '../helpers/addFood';

class FastFood {
  static getFastFoods(req, res) {
    const fastFoods = data.foodItems;
    res.status(200).json({ fastFoods, success: true }).end();
  }

  static getFastFood(req, res) {
    const { id } = req.params;
    const foodItem = data.foodItems.find(item => item.id === +id);

    if (foodItem !== undefined && foodItem.quantity > 0) {
      res.status(200).json({ foodItem }).end();
    } else {
      res.status(404).json({ success: false, msg: 'Fast food not found' }).end();
    }
  }

  static addFoodItem(req, res) {

    const { foodCategoryName, name, description, price, quantity, expectedDeliveryTime } = req.body;
    const { user } = req;
    const dbData = addFood(user, foodCategoryName, name);
    const foodData = dbData.foods.find(food => food.name === name);
    let foodItem = dbData.foodItems.find(item => item.description === description);
    const foodItemsLen = dbData.foodItems.length;
    if (foodData !== undefined && foodItem === undefined) {
      foodItem = { id: foodItemsLen + 1, foodId: foodData.id, description, price, quantity, expectedDeliveryTime };
      data.foodItems.push(foodItem);
      res.status(201).json({ success: true, data: foodItem }).end();
    } else {
      res.status(409).json({ success: false, msg: 'Food item already exists' }).end();
    }
  }

  static modifyFastFoodItem(req, res) {
    const {
      description, price, quantity, expectedDeliveryTime, foodId, name,
    } = req.body;
    const { foodItemId } = req.params;
    const foodItemIndex = data.foodItems.findIndex(item => item.id === +foodItemId);
    const foodIndex = data.foods.findIndex(item => item.id === +foodId);
    if (foodItemIndex !== -1) {
      data.foods[foodIndex].name = name;
      data.foodItems[foodItemIndex].quantity = quantity;
      data.foodItems[foodItemIndex].description = description;
      data.foodItems[foodItemIndex].price = price;
      data.foodItems[foodItemIndex].expectedDeliveryTime = expectedDeliveryTime;
      res.status(200).json({ msg: 'food item modified successfully', success: true, data: { id: foodIndex ,description, price, quantity, expectedDeliveryTime, foodId, name,} }).end();
    } else {
      res.status(404).json({ msg: 'food item does not exist', success: false }).end();
    }
  }

  static modifyFastFood(req, res) {
    const { name } = req.body;
    const { foodId } = req.params;
    const foodIndex = data.foods.findIndex(item => item.id === +foodId);
    if (foodIndex !== -1) {
      data.foods[foodIndex].name = name;
      res.status(200).json({ msg: 'food modified successfully', success: true, data: { id:foodId, name } }).end();
    } else {
      res.status(404).json({ msg: 'food does not exist', success: false }).end();
    }
  }

  static removeFastFood(req, res) {
    const { foodId } = req.params;
    const foodIndex = data.foods.findIndex(food => food.id === +foodId);
    data.foods.splice(foodIndex, 1);
    data.foodItems.map((item, i) => {
      if (item.foodId === +foodId) {
        data.foodItems.splice(i, 1);
        res.status(204).end();
        return null;
      }
      return item;
    });
    
  }
  static removeFastFoodItem(req, res) {
    const {itemId} = req.params;

    data.foodItems.map((item, i) => {
      if (item.foodId === +itemId) {
        data.foodItems.splice(i, 1);
        res.status(204).end();
        return null;
      }
      return item;
    });

   
  }
}
export default FastFood;
