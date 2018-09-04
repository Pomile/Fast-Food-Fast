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
  food: [
    /*
    id: int,
    name: string,
    userId: int,
    */
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
  ],
  orders: [
    /*
    id: int not null,
    userId: int not null,
    foodItemId: int not null,
    Orderdate: date not null,
    destinationAddress: string not null,
    OrderTime: time not null,
    deliveryTime: time null,
    accepted: boolean null,
    declined: boolean null,
    completed: boolean null,
    */
  ],
};

export default data;
