export const checkOrderFields = (req, fields) => {
  const expectedFields = fields;
  const { data } = req.body;
  let availableFields;
  const missingFields = [];

  let allOrderFieldExists = true;
  data.orders.map((orderItem, i) => {
    availableFields = Object.keys(orderItem);
    // find missing field
    if (availableFields.length !== expectedFields.length) {
      expectedFields.map((field) => {
        if (!availableFields.includes(field)) {
          allOrderFieldExists = false;
          missingFields.push({ field, index: i });
        }
      });
    }
  });
  // console.log({allOrderFieldExists, expectedFields, missingFields,});
  return {
    allOrderFieldExists, expectedFields, missingFields,
  };
};
export const checkUserInfoFields = (req, fields) => {
  const expectedFields = fields;
  const { data } = req.body;
  let availableFields = [];
  const missingFields = [];
  let allUserInfoFieldExist = true;
  availableFields = Object.keys(data);
  expectedFields.map((key) => {
    if (!availableFields.includes(key)) {
      allUserInfoFieldExist = false;
      missingFields.push({ field: key });
    }
  });
  return { allUserInfoFieldExist, missingFields };
};
