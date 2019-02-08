const testData = {
  adminUser: {
    firstname: 'user1',
    lastname: 'user1',
    email: 'user1@live.com',
    phone: '+123192000',
    password: 'password1',
    cpassword: 'password1',
    role: 'admin',
  },

  user: {

    firstname: 'user2',
    lastname: 'user2',
    email: 'user2@live.com',
    phone: '+123192928',
    password: 'Password123',
    cpassword: 'Password123',
    role: 'admin',
  },
  userDataWithoutFirstname: {
    firstname: '',
    lastname: 'Olusegun',
    email: 'olusegun@live.com',
    phone: '+1231921200',
    password: 'warlord1',
    cpassword: 'warlord1',
    role: 'user',
  },

  userDataWithoutLastname: {
    firstname: 'Olusegun',
    lastname: '',
    email: 'olusegun@live.com',
    phone: '+1231921200',
    password: 'warlord1',
    cpassword: 'warlord1',
    role: 'user',
  },
  userDataWithInvalidEmail: {
    firstname: 'Olusegun',
    lastname: 'Obasanjo',
    email: 'olus',
    phone: '+1231921200',
    password: 'warlord1',
    cpassword: 'warlord1',
    role: 'user',
  },
  userDataWithPhoneNo: {
    firstname: 'Olusegun',
    lastname: 'Obasanjo',
    email: 'Olusegun@gmail.com',
    phone: '',
    password: 'warlord1',
    cpassword: 'warlord1',
    role: 'user',
  },
  userDataWithInvalidPasswordLength: {
    firstname: 'olusegun',
    lastname: 'obasanjo',
    email: 'olusegun@live.com',
    phone: '+1231921200',
    password: 'war1',
    cpassword: 'war1',
    role: 'user',
  },
  userDataWithInvalidPassword: {
    firstname: 'olusegun',
    lastname: 'obasanjo',
    email: 'olusegun@live.com',
    phone: '+1231921200',
    password: 'warlord',
    cpassword: 'warlord',
    role: 'user',
  },
  userDataWithWrongPassword: {
    firstname: 'olusegun',
    lastname: 'obasanjo',
    email: 'olusegun@live.com',
    phone: '+1231921200',
    password: 'warlord1',
    cpassword: 'warlor1',
    role: 'user',
  },

  adminUserCredentials: {
    email: 'user1@live.com',
    password: 'password1',
  },
  userCredentials: {
    email: 'user2@live.com',
    password: 'Password123',
  },
  adminCredentialsWithInvalidPassword: {
    email: 'user1@live.com',
    password: 'pass',
  },
  adminUserCredentialsWithInvalidEmail: {
    email: 'user@live.com',
    password: 'password1',
  },

  adminUserAuth: {
    token: null,
    isAuth: false,
  },
  userAuth: {
    token: null,
    isAuth: false,
  },

  userAuthWithInvalidToken: {
    token: null,
    isAuth: false,
  },

  foodItem: {
    foodCategoryName: 'Fries',
    name: 'Chicken and chips',
    price: 2500,
    description: '2 Chickens and a pack of chips',
    quantity: 25,
    expectedDeliveryTime: '45 min',
  },
  foodCategoryNameItem: {

    foodCategoryName: 'Sides',
    name: 'Pie',
    price: 5500,
    description: '2 Chicken Pie with a bottle of coke',
    quantity: 25,
    expectedDeliveryTime: '25 min',
  },

  foodVariantUpdate: {
    price: 2500,
    description: '2 Chicken Pie + a bottle of coke',
    quantity: 20,
    expectedDeliveryTime: '25 min',
  },

  foodItemWithoutName: {
    foodCategoryName: 'Fries',
    name: '',
    price: 2500,
    description: '2 Chickens and a pack of chips',
    quantity: 25,
    expectedDeliveryTime: '45 min',
  },
  foodItemWithInvalidprice: {

    foodCategoryName: 'Fries',
    name: 'Chicken and chips',
    price: '2500',
    description: '2 Chickens and a pack of chips',
    quantity: 25,
    expectedDeliveryTime: '45 min',

  },
  foodItemWithoutQuantity: {
    foodCategoryName: 'Fries',
    name: 'Chiken and chips',
    price: 2500,
    quantity: '',
    description: '2 Chickens and a pack of chips',
    expectedDeliveryTime: '45 min',
  },
  foodItemWithoutDescription: {
    foodCategoryName: 'Fries',
    name: 'Chiken and chips',
    price: 2500,
    description: '',
    expectedDeliveryTime: '45 min',
  },
  foodUpdate: {
    name: 'Fried rice + Chicken + Dodo',
    image: null,
  },
  foodItemThatDoesNotExistUpdate: {
    foodId: 3,
    image: null,
    price: 2500,
    description: '2 Chickens and a pack of chips with a bottle of coke',
    quantity: 25,
    expectedDeliveryTime: '45 min',
  },
  foodItemUpdateWithoutPrice: {
    foodId: 3,
    image: null,
    price: 0,
    description: '2 Chickens and a pack of chips with a bottle of coke',
    quantity: 25,
    expectedDeliveryTime: '45 min',
  },
  foodItemUpdateWithoutDescription: {
    foodId: 3,
    image: null,
    price: 1500,
    description: '',
    quantity: 25,
    expectedDeliveryTime: '45 min',
  },
  foodItemUpdateWithoutExpectedDeliveryTime: {
    foodId: 3,
    image: null,
    price: 1500,
    description: '2 Chickens and a pack of chips',
    quantity: 25,
    expectedDeliveryTime: '',
  },
  foodNameUpdate: {
    foodId: 3,
    name: 'Sandwich',
  },
  foodUpdateWithoutName: {
    foodId: 3,
    name: '',
  },
  orderData: {
    data: {
      orders: [{ foodVariantId: 4, quantity: 3 }, { foodVariantId: 5, quantity: 2 }],
      destinationAddress: '4, ereko street fadeyi, lagos',
      state: 'Lagos',
    },
  },

  orderDataWithLargerQuantity: {
    data: {
      orders: [{ foodVariantId: 4, quantity: 100 }, { foodVariantId: 5, quantity: 2 }],
      destinationAddress: '4, ereko street fadeyi, lagos',
      state: 'Lagos',
    },
  },

  orderDataWithInvalidUserId: {
    data: {
      order: [{ foodItemId: 4, quantity: 3 }, { foodItemId: 3, quantity: 2 }],
      userId: 'jhhhghdghjd',
      destinationAddress: '4, ereko street fadeyi, lagos',
    },
  },
  orderDataWithoutUserId: {
    data: {
      order: [{ foodVariantId: 4, quantity: 3 }, { foodVariantId: 3, quantity: 2 }],
      destinationAddress: '4, ereko street fadeyi, lagos',
    },
  },
  orderDataWithoutQuantity: {
    data: {
      orders: [{ foodVariantId: 4, quantity: 0 }, { foodVariantId: 5, quantity: 2 }],
      destinationAddress: '4, ereko street fadeyi, lagos',
      state: 'Lagos',
    },
  },
  orderDataWithoutdestinationAddress: {
    data: {
      orders: [{ foodVariantId: 4, quantity: 1 }, { foodVariantId: 3, quantity: 2 }],
      destinationAddress: '',
      state: 'Lagos',
    },
  },

  orderDataWithoutState: {
    data: {
      orders: [{ foodVariantId: 4, quantity: 1 }, { foodVariantId: 3, quantity: 2 }],
      destinationAddress: '4, ereko street fadeyi, lagos',
      state: '',
    },
  },

  orderDataWithoutStateField: {
    data: {
      orders: [{ foodVariantId: 4, quantity: 1 }, { foodVariantId: 3, quantity: 2 }],
      destinationAddress: '4, ereko street fadeyi, lagos',
    },
  },
  orderDataWithoutFoodItemId: {
    data: {
      orders: [{ quantity: 1 }, { foodVariantId: 3, quantity: 2 }],
      destinationAddress: '4, ereko street fadeyi, lagos',
      state: 'Lagos',
    },
  },

  orderDataWithEmptyOrder: {
    data: {
      orders: [],
      destinationAddress: '4, ereko street fadeyi',
      state: 'Lagos',
    },
  },
  orderDataInvalidFoodItemId: {
    data: {
      orders: [{ foodVariantId: 'djhdjh', quantity: 1 }, { foodVariantId: 3, quantity: 2 }],
      destinationAddress: '4, ereko street fadeyi',
      state: 'Lagos',
    },
  },
  orderDataAccept: { accept: true },
  orderDataDecline: { decline: true },
  orderDataCompleted: { completed: true },
  orderDataUnCompleted: { completed: false },
  foods: [
    {
      foodCategoryId: 1,
      userId: 1,
      name: 'Chicken and chips',
    },
    {
      foodCategoryId: 2,
      userId: 1,
      name: 'Shawamma',
    },

    {
      foodCategoryId: 2,
      userId: 1,
      name: 'Meat pie',
    },

    {
      foodCategoryId: 2,
      userId: 1,
      name: 'Scorge egg',
    },

    {
      foodCategoryId: 6,
      userId: 1,
      name: 'Fried rice and chicken',
    },
  ],
  foodVariants: [
    {
      foodId: 1,
      userId: 1,
      description: '2 Chickens + 2 pack of chips + 2 coke',
      quantity: 25,
      price: 4000,
      expectedDeliveryTime: '45 min',
    },

    {
      foodId: 1,
      userId: 1,
      description: '1 Chicken and 1 pack of chips + 1 coke',
      quantity: 25,
      price: 2700,
      expectedDeliveryTime: '45 min',
    },

    {
      foodId: 3,
      userId: 1,
      description: '2 Meat pie + 1 coke',
      quantity: 25,
      price: 1300,
      expectedDeliveryTime: '45 min',
    },

    {
      foodId: 5,
      userId: 1,
      description: 'Fried rice + 2 chiken + 1 coke',
      quantity: 25,
      price: 2500,
      expectedDeliveryTime: '45 min',
    },
  ],
  foodCategories: [
    /*
      id: int not null,
      title: string,
    */
    { id: 1, name: 'Fries' },
    { id: 2, name: 'sides' },
    { id: 3, name: 'burger' },
    { id: 4, name: 'Tacos' },
    { id: 5, name: 'sweets and drinks' },
    { id: 6, name: 'meals and combos' },
  ],

};

export default testData;
