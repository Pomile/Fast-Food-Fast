import data from '../db/data';

const addFoodCategory = (foodCategoryName) => {
    
    const foodCatIndex = data.foodCategory.findIndex(cat => cat.name === foodCategoryName);
    if (foodCatIndex === -1) {
      const catLen = data.foodCategory.length;
      data.foodCategory.push({ id: catLen + 1, name: foodCategoryName });
      return data
    }else{
        return data
    }
}
export default addFoodCategory;
