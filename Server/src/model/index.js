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

let pgConnection;

console.log(config);

if (config.use_env_variable) {
  pgConnection = new Pool({ connectionString: process.env[config.use_env_variable] });
} else {
  pgConnection = new Pool({
    database: config.database,
    user: config.username,
    password: config.password,
    host: config.host,
    port: config.port,
  });
}
db.query = {
  queryCall: (text, params, callback) => {
    const start = Date.now();
    return pgConnection
      .connect()
      .then(client => client.query(text, params, (err, res) => {
        const duration = Date.now() - start;
        console.log('executed query', { text, duration, rows: res });
        callback(err, res);
      }));
  },
  postCall: (query) => {
    const start = Date.now();
    pgConnection
      .connect()
      .then(client => client
        .query(query)
        .then((res) => {
          console.log(` duration: ${Date.now() - start}`);

          const result = {};
          res.rows[0].map((item, index) => {
            switch (index) {
              case 0:
                result.id = item;
                break;

              case 1:
                result.firstname = item;
                break;
              case 2:
                result.lastname = item;
                break;
              default:
                // do nothing
            }
          });
          console.log(JSON.stringify(result));
          client.end();
          // res.status(201).json({ success: true }).end();
        }).catch((e) => {
          console.error(e.stack);
          client.end();
          // res.status(409).json({ err: e.message, success: false }).end();
        }));
  },
  asyncQueryCall: async (text, params) => {
    try {
      const start = Date.now();
      const res = await pgConnection.connect().query(text, params);
      const duration = Date.now() - start;
      console.log(res.rows[0], duration);
      return res.rows;
      // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
    } catch (err) {
      console.log(err.stack);
      return err.stack;
    }
  },

};

db.pgConnection = pgConnection;


db.models = {
  sync: async (options) => {
    if (options.force === false) {
      try {
        await Users.createTable(pgConnection); // Parent to orders, foods
        await FoodCategories.createTable(pgConnection); // Parent to Foods
        await Foods.createTable(pgConnection); // Parent to foodVariants
        await Addresses.createTable(pgConnection); // Parent to Orders
        await FoodVariants.createTable(pgConnection);
        await Orders.createTable(pgConnection);
      } catch (err) {
        console.debug(err.message);
      }
    } else {
      try {
        // drop table
        await Orders.dropTable(pgConnection);
        await Addresses.dropTable(pgConnection);
        await FoodVariants.dropTable(pgConnection);
        await Foods.dropTable(pgConnection);
        await FoodCategories.dropTable(pgConnection);
        await Users.dropTable(pgConnection);

        // create table
        await Users.createTable(pgConnection);
        await FoodCategories.createTable(pgConnection);
        await Foods.createTable(pgConnection);
        await Addresses.createTable(pgConnection);
        await FoodVariants.createTable(pgConnection);
        await Orders.createTable(pgConnection);
      } catch (err) {
        console.debug(err.message);
      }
    }
  },
};

export default db;
