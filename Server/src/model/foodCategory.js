const FoodCategories = {

  createTable: async (pgClient) => {
    const createFoodCategoryTable = `CREATE TABLE IF NOT EXISTS FoodCategories(
      id serial NOT NULL,
      type character varying(150) NOT NULL UNIQUE,
      CONSTRAINT "FoodCategories_pkey" PRIMARY KEY (id)
     );
     `;

    console.log(createFoodCategoryTable);

    const foodCategory = await pgClient.query(createFoodCategoryTable);
    return foodCategory;
  },

  dropTable: async (pgClient) => {
    const dropFoodCategoryTable = 'DROP TABLE IF EXISTS foodCategories;';

    console.log(dropFoodCategoryTable);
    const foodCategory = await pgClient.query(dropFoodCategoryTable);
    return foodCategory;
  },
};

export default FoodCategories;
