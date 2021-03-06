const Addresses = {
  createTable: async (pgClient) => {
    const createAddressTable = `CREATE TABLE IF NOT EXISTS Addresses(
            id serial NOT NULL,
            destinationAddress character varying(150) NOT NULL,
            state character varying(100) NOT NULL,
            CONSTRAINT "Addresses_pkey" PRIMARY KEY (id)
        );
        `;
    console.log(JSON.stringify(createAddressTable));
    const addresses = await pgClient.query(createAddressTable);
    return addresses;
  },

  dropTable: async (pgClient) => {
    const dropAddressTable = 'DROP TABLE IF EXISTS Addresses;';
    console.log(dropAddressTable);
    const addresses = await pgClient.query(dropAddressTable);

    return addresses;
  },
};
export default Addresses;
