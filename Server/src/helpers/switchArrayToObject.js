export const switchFoodValuesToObject = (res) => {
  const result = {};
  // console.log('foodValues', res.rows[0]);
  res.rows[0].map((item, index) => {
    switch (index) {
      case 0: result.id = item; break;
      case 1: result.userId = item; break;
      case 2: result.foodCategoryId = item; break;
      case 3: result.name = item; break;
      default:
           // do nothing
    }
  });
  return result;
};

export const switchFoodVariantsValuesToObject = (res) => {
  const result = {};
  // console.log('foodVariant', res.rows[0]);
  res.rows[0].map((item, index) => {
    switch (index) {
      case 0: result.id = item; break;
      case 1: result.userId = item; break;
      case 2: result.foodId = item; break;
      case 3: result.destinationAddressId = item; break;
      case 4: result.image = item; break;
      case 5: result.description = item; break;
      case 6: result.destinationAddressId = item; break;
      case 7: result.price = item; break;
      case 8: result.expectedDeliveryTime = item; break;
      default: // do nothing
    }
  });
  return result;
};

export const switchFoodCatValuesToObject = (res) => {
  const result = {};
  // console.log('foodCat', res.rows[0]);
  res.rows[0].map((item, index) => {
    switch (index) {
      case 0: result.id = item; break;
      case 1: result.type = item; break;
      default:
         // do nothing
    }
  });
  return result;
};

export const switchUserValuesToObject = (res) => {
  const result = {};
  // console.log(res.rows[0]);
  res.rows[0].map((item, index) => {
    switch (index) {
      case 0: result.id = item; break;
      case 1: result.firstname = item; break;
      case 2: result.lastname = item; break;
      case 3: result.role = item; break;
      case 4: result.phone = item; break;
      default: // do nothing
    }
  });
  return result;
};
