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
        role: 'user',
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
      adminCredentialsWithInvalidPassword:{
        email: 'user1@live.com',
        password: 'pass',
      },
      adminUserCredentialsWithInvalidEmail:{
        email: 'user@live.com',
        password: 'password1',
      },

    adminUserAuth: {
        id: null,
        isAuth: false,
    },
    userAuth: {
        id: null,
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
    foodItemUpdate: {
      foodId: 3,
      image: null,
      price: 2500,
      description: '2 Chickens and a pack of chips with a bottle of coke',
      quantity: 25,
      expectedDeliveryTime: '45 min', 
    },
    foodItemThatDoesNotExistUpdate:{
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
    foodItemUpdateWithoutDescription:{
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
    foodUpdateWithoutName:{
      foodId: 3,
      name: '',
    },
    orderData: {
      data: [
        {
          userId: 1, foodItemId: 4, destinationAddress: '4, ereko street fadeyi, lagos', quantity: 3,
        },
        {
          userId: 1, foodItemId: 3, destinationAddress: '4, ereko street fadeyi, lagos', quantity: 2,
        },
      ]
    },
    orderDataWithoutQuantity: {
      data : [
      {
        userId: 1, foodItemId: 4, destinationAddress: '4, ereko street fadeyi, lagos', quantity: 0,
      },
      {
        userId: 1, foodItemId: 3, destinationAddress: '4, ereko street fadeyi, lagos', quantity: 2,
      },
     ]
    },
    orderDataWithoutdestinationAddress: {
      data: [
        {
          userId: 1, foodItemId: 4, destinationAddress: '4, ereko street fadeyi, lagos', quantity: 0,
        },
        {
          userId: 1, foodItemId: 3, destinationAddress: '', quantity: 2,
        },
      ]
    },
    orderDataWithoutFoodItemId: {
      data:  [
        { userId: 1, destinationAddress: '4, ereko street fadeyi, lagos', quantity: 0 },
        {
          userId: 1, foodItemId: 3, destinationAddress: '', quantity: 2,
        },
      ]
    },
    orderDataAccept: { accept: true },
    orderDataDecline: { decline: true },
    orderDataCompleted: { completed: true },
    orderDataUnCompleted: { completed: false },

}

export default testData;