import data from '../db/data';

class FastFood {
  static getFastFoods(req, res) {
    const fastFoods = data.foodItems;
    res.status(200).json({ fastFoods, success: true });
  }
}


export default FastFood;
