const FoodVariants = {

  createTable: async (pgClient) => {
    const createFoodVariantTable = `CREATE TABLE IF NOT EXISTS FoodVariants(
      id serial NOT NULL,
      userId int NOT NULL,
      foodId int NOT NULL,
      destinationAddressId int NOT NULL,
      image bytea Not NULL,
      quantity int NOT NULL,
      description character varying(150) NOT NULL UNIQUE,
      price float NOT NULL,
      expectedDeliveryTime time NOT NULL,
  
      CONSTRAINT "FoodVariants_pkey" PRIMARY KEY (id),
      CONSTRAINT "FoodVariants_foodId_fkey" FOREIGN KEY (foodId)
              REFERENCES Foods (id)
              ON UPDATE CASCADE
              ON DELETE NO ACTION,
      CONSTRAINT "FoodVariants_userId_fkey" FOREIGN KEY (userId)
              REFERENCES Users (id)
              ON UPDATE CASCADE
              ON DELETE NO ACTION
     
     );
     `;
    console.log(createFoodVariantTable);
    const foodVariants = await pgClient.query(createFoodVariantTable);
    return foodVariants;
  },

  dropTable: async (pgClient) => {
    const dropFoodVariantTable = 'DROP TABLE IF EXISTS FoodVariants;';
    console.log(dropFoodVariantTable);
    const foodVariants = await pgClient.query(dropFoodVariantTable);
    return foodVariants;
  },
};

export default FoodVariants;
