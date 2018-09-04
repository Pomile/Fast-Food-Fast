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
}


export default FastFood;
