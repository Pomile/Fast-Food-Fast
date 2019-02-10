
export const checkUserData = (req) => {
  let isValid = true;
  const errors = [];
  Object.keys(req.body.data).map((field) => {
    switch (field) {
      case 'state':
        if (req.body.data[field].trim() === '') {
          isValid = false;
          errors.push({ field, value: req.body.data[field], msg: 'state is required' });
        }
        break;
      case 'destinationAddress':
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

  if (req.body.data.orders.length !== 0) {
    req.body.data.orders.map((orderItem, i) => {
      if (isValid) {
        Object.keys(orderItem).map((field) => {
          const { foodVariantId } = orderItem;
          const { quantity } = orderItem;
          if (field && isValid) {
            switch (field) {
              case 'foodVariantId':
                if (!Number.isInteger(foodVariantId)) {
                  isValid = false;
                  errors.push({
                    name: field, value: foodVariantId, msg: 'Food id must be an integer', index: i,
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
