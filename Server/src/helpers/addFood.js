import moment from 'moment';
import addFoodCategory from './addFoodCategory';


const addFood = (userId, foodCategoryName, name) => {
  const data = addFoodCategory(foodCategoryName);
  const foodCat = data.foodCategory.find(cat => cat.name === foodCategoryName);
  const foodLen = data.foods.length;
  const foodIndex = data.foods.findIndex(food => food.name === name);
  if (foodIndex === -1) {
    data.foods.push({
      id: foodLen + 1, foodCategoryId: foodCat.id, userId, name, date: moment().format('LLLL'),
    });
    return data;
  }
  return data;
};
export default addFood;
