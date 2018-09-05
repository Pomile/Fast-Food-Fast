import data from '../db/data';

const getFoodItem = (foodItemId) => {
  let foodItem;
  data.foodItems.map((i) => {
    if (i.id === +foodItemId) {
      foodItem = i;
    }
    return null;
  });
  // console.log(foodItem);
  return foodItem;
};

export default getFoodItem;
