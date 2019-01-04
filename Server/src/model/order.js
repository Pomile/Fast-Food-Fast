const Orders = {

  createTable: async (pgClient) => {
    const createOrdersTable = `CREATE TABLE IF NOT EXISTS Orders(
      id serial NOT NULL,
      userId int NOT NULL,
      foodVariantId int NOT NULL,
      quantity int NOT NULL,
      orderDate character varying(50) NOT NULL,
      orderTime character varying(15) NOT NULL,
      destinationAddressId int NOT NULL,
      accept boolean,
      decline boolean,
      complete boolean,

      CONSTRAINT "Orders_pkey" PRIMARY KEY (id),
      CONSTRAINT "orders_userId_fkey" FOREIGN KEY (userId)
          REFERENCES Users (id)
          ON UPDATE CASCADE
          ON DELETE NO ACTION,

      CONSTRAINT "Orders_foodVariantId_fkey" FOREIGN KEY (foodVariantId)
          REFERENCES FoodVariants (id)
          ON UPDATE CASCADE
          ON DELETE NO ACTION,

      CONSTRAINT "FoodVariants_destinationAddressId_fkey" FOREIGN KEY (destinationAddressId)
          REFERENCES Addresses (id)
          ON UPDATE CASCADE
          ON DELETE NO ACTION
     );
     `;
    console.log(JSON.stringify(createOrdersTable));
    const orders = await pgClient.query(createOrdersTable);
    return orders;
  },

  dropTable: async (pgClient) => {
    const dropOrderTable = 'DROP TABLE IF EXISTS Orders;';
    console.log(dropOrderTable);
    const orders = await pgClient.query(dropOrderTable);
    return orders;
  },
};

export default Orders;
