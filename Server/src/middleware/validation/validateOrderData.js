
export const checkUserData = (req) => {
  let isValid = true;
  const errors = [];
  Object.keys(req.body.data).map((field) => {
    switch (field) {
      case 'userId':
        // console.log('userId', req.body.data[field]);
        // console.log(Number.isInteger(req.body.data[field]) === false);
        if (Number.isInteger(req.body.data[field]) === false) {
          isValid = false;
          errors.push({ field, value: req.body.data[field], msg: 'user is required and id must be an integer' });
        }
        break;

      case 'destinationAddress':
        // console.log(req.body.data[field]);
        if (req.body.data[field].trim() === '') {
          isValid = false;
          errors.push({ field, value: req.body.data[field], msg: 'Destination address is required' });
        }
        break;

      default:
                // do nothing
    }
  });
  // console.log({ isValid, errors });
  return { isValid, errors };
};
export const checkOrderData = (req) => {
  let isValid = true;
  const errors = [];

  if (req.body.data.order.length !== 0) {
    req.body.data.order.map((orderItem, i) => {
      if (isValid) {
        Object.keys(orderItem).map((field) => {
          const { foodItemId } = orderItem;
          const { quantity } = orderItem;
          if (field && isValid) {
            switch (field) {
              case 'foodItemId':
                if (!Number.isInteger(foodItemId)) {
                  isValid = false;
                  errors.push({
                    name: field, value: foodItemId, msg: 'Food id must be an integer', index: i,
                  });
                }
                break;
              case 'quantity':

                // console.log(quantity);
                if (typeof quantity !== 'number' || quantity === 0) {
                  isValid = false;
                  errors.push({
                    name: field, value: quantity, msg: 'Quantity is required', index: i,
                  });
                }
                break;

              default:
                  // do nothing
            }
          }
        });
      }
    });
    return { isValid, errors };
  }
  isValid = false;
  return { isValid, errors };
};
