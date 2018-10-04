const Foods = {

  createTable: async (pgClient) => {
    const createFoodTable = `CREATE TABLE IF NOT EXISTS Foods(
      id serial NOT NULL,
      userId int NOT NULL,
      foodCategoryId int NOT NULL,
      name character varying(150) NOT NULL,
      date date NOT NULL,
      CONSTRAINT "Foods_pkey" PRIMARY KEY (id),
      CONSTRAINT "Foods_userId_fkey" FOREIGN KEY (userId)
              REFERENCES Users (id)
              ON UPDATE CASCADE
              ON DELETE NO ACTION,
      CONSTRAINT "Foods_foodCategoryId_fkey" FOREIGN KEY (foodCategoryId)
              REFERENCES FoodCategories (id)
              ON UPDATE CASCADE
              ON DELETE NO ACTION
     );
     `;

    console.log(createFoodTable);
    const food = await pgClient.query(createFoodTable);
    return food;
  },

  dropTable: async (pgClient) => {
    const dropFoodTable = 'DROP TABLE IF EXISTS Foods;';
    console.log(dropFoodTable);
    const food = await pgClient.query(dropFoodTable);
    return food;
  },
};

export default Foods;
