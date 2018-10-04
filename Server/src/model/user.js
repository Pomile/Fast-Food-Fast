const Users = {

  createTable: async (pgClient) => {
    const createUserTable = `CREATE TABLE IF NOT EXISTS Users(
      id serial NOT NULL,
      firstname character varying(70) NOT NULL,
      lastname character varying(70) NOT NULL,
      email text NOT NULL UNIQUE,
      image bytea,
      password text NOT NULL,
      phone int NOT NULL,
      role character varying(15) DEFAULT 'user'::character varying,
      CONSTRAINT "Users_pkey" PRIMARY KEY (id)
     );
     `;
    console.log(createUserTable);
    const users = await pgClient.query(createUserTable);
    return users;
  },

  dropTable: async (pgClient) => {
    const dropUserTable = 'DROP TABLE IF EXISTS Users;';
    console.log(dropUserTable);
    const users = await pgClient.query(dropUserTable);
    return users;
  },
};

export default Users;
