const data = {
  users: [
    /*
    id: int not null
    firstname: string not null,
    lastname: string not null,
    email: string not null unique,
    password: text not null,
    phone: string null,
    role: string null,
    */
  ],

  userLocations: [
    /*  id: int not null,
        userId: int not null,
       address: string not null,
       state: string not null,
    */
  ],
  foodCategory: [
    /*
      id: int not null,
      title: string,

    */
    { id: 2, name: 'sides' },
    { id: 3, name: 'burger' },
    { id: 4, name: 'Tacos' },
    { id: 5, name: 'sweets and drinks' },
    { id: 6, name: 'meals and combos' },
  ],
  foods: [
    /*
    id: int,
    foodCategoryId: int,
    name: string,
    userId: int,
    date: date
    */
    {
      id: 1,
      foodCategoryId: 6,
      userId: 2,
      name: 'Fried Rice',
    },
    {
      id: 2,
      foodCategoryId: 4,
      userId: 2,
      name: 'Shawama',
    },
  ],
  foodItems: [
    /*
    id: int,
    foodId: int,
    image: bytea,
    description: string,
    price: number,
    quantity: number,
    expectedDeliveryTime: time
    */

    {
      id: 1,
      foodId: 2,
      image: null,
      description: 'Shawamma with 1 hotdog',
      price: 1000,
      quantity: 40,
      expectedDeliveryTime: '30 min',

    },
    {
      id: 2,
      foodId: 2,
      image: null,
      description: 'Shawamma with 2 hot dogs',
      price: 1500,
      quantity: 40,
      expectedDeliveryTime: '30 min',
    },
    {
      id: 3,
      foodId: 1,
      image: null,
      description: 'Fried rice with dodo and 1 chiken',
      price: 1200,
      quantity: 100,
      expectedDeliveryTime: '45 min',
    },
    {
      id: 4,
      foodId: 1,
      image: null,
      description: 'Fried rice with dodo and 2 chiken',
      price: 1650,
      quantity: 50,
      expectedDeliveryTime: '45 min',
    },
  ],
  orders: [
    /*

    id: int not null,
    userId: int not null,
    foodItemId: int not null,
    qauntity: int not null,
    Orderdate: date not null,
    OrderTime: time not null,
    deliveryTime: time null,
    accepted: boolean null,
    declined: boolean null,
    completed: boolean null,
    */
  ],
  destinationAddress: [
    /*
    id: int NOT Null,
    address: string NOT NULL,
    orderId: int Not null,

    */
  ],
};

export default data;
