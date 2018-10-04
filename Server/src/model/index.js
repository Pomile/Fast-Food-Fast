import { Pool } from 'pg';
import configs from '../config/config.json';
import Users from './user';
import Foods from './food';
import FoodCategories from './foodCategory';
import FoodVariants from './foodVariants';
import Addresses from './address';
import Orders from './order';

const env = process.env.NODE_ENV;
const config = configs[env];
const db = {};

let pgClient;

if (config.use_env_variable) {
  pgClient = new Pool({
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  });
} else {
  pgClient = new Pool({
    database: config.database,
    user: config.username,
    password: config.password,
    host: config.host,
    port: config.port,
  });
}
const query = {
  call: (text, params, callback) => {
    const start = Date.now();
    return pgClient.query(text, params, (err, res) => {
      const duration = Date.now() - start;
      console.log('executed query', { text, duration, rows: res });
      callback(err, res);
    });
  },

  asyncCall: async (text, params) => {
    try {
      const res = await pgClient.query(text, params);
      console.log(res.rows[0]);
      return res.rows;
      // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
    } catch (err) {
      console.log(err.stack);
      return err.stack;
    }
  },
};

db.pool = {
  pgClient,
};

db.models = {
  sync: async (options) => {
    if (options.force === false) {
      try {
        await Users.createTable(pgClient); // Parent to orders, foods
        await FoodCategories.createTable(pgClient); // Parent to Foods
        await Foods.createTable(pgClient); // Parent to foodVariants
        await Addresses.createTable(pgClient); // Parent to Orders
        await FoodVariants.createTable(pgClient);
        await Orders.createTable(pgClient);
      } catch (err) {
        console.debug(err.message);
      }
    } else {
      try {
        // drop table
        await Orders.dropTable(pgClient);
        await Addresses.dropTable(pgClient);
        await FoodVariants.dropTable(pgClient);
        await Foods.dropTable(pgClient);
        await FoodCategories.dropTable(pgClient);
        await Users.dropTable(pgClient);

        // create table
        await Users.createTable(pgClient);
        await FoodCategories.createTable(pgClient);
        await Foods.createTable(pgClient);
        await Addresses.createTable(pgClient);
        await FoodVariants.createTable(pgClient);
        await Orders.createTable(pgClient);
      } catch (err) {
        console.debug(err.message);
      }
    }
  },
};

export default db;
