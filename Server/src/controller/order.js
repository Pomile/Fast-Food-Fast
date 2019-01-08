import moment from 'moment';
import db from '../model';
import getFoodVariants from '../helpers/getFoodVariants';
import getUser from '../helpers/getUser';
import FoodVariants from '../model/foodVariants';

const { pgConnection } = db;

class order {
  static async placeOrder(req, res) {
    const { data } = req.body;
    const { id } = req.user;
    const dbClient = await pgConnection.connect();

    try {
      await dbClient.query('BEGIN');
      const addOrderAddress = await dbClient.query('INSERT INTO Addresses (destinationAddress, state) VALUES($1, $2) RETURNING *', [data.destinationAddress, data.state]);
      let orders;
      if (addOrderAddress.rows.length > 0) {
        orders = await Promise.all([...data.orders].map(async (item) => {
          const findFood = await dbClient.query('SELECT id, description, price, quantity from FoodVariants WHERE id = $1', [item.foodVariantId]);
          if (findFood.rows[0].quantity > item.quantity) {
            await dbClient.query('INSERT INTO ORDERS (userId, foodVariantId, quantity, orderDate, orderTime, destinationAddressId) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [id, item.foodVariantId, item.quantity, moment().format('dddd, MMMM Do YYYY'), moment().format('h:mm:ss a'), addOrderAddress.rows[0].id]);
            const { price, description } = { ...findFood.rows[0] };
            return Promise.resolve({ price, description, quantity: item.quantity });
          }
          return { order: false, ...item };
        }));
      }
      if (orders.length > 0) {
        res.status(201).json({ orders, msg: 'order placed successfully' }).end();
      }
      await dbClient.query('COMMIT');
    } catch (err) {
      await dbClient.query('ROLLBACK');
      res.status(500).json({ error: err.message }).end();
    } finally {
      dbClient.release();
    }
  }

  static async getAllCustomersOrder(req, res) {
    const dbClient = await pgConnection.connect();
    try {
      await dbClient.query('BEGIN');
      const customersOrder = await dbClient.query('SELECT * FROM ORDERS');
      const result = await Promise.all([...customersOrder.rows].map(async (item) => {
        const {
          quantity, orderDate, orderTime, destinationAddressId, status,
        } = item;
        const foodVariant = await dbClient.query('SELECT id, price, description from FoodVariants WHERE id = $1', [item.id]);
        if (foodVariant.rows.length > 0) {
          const food = await dbClient.query('SELECT image, name FROM Foods WHERE id = $1', [foodVariant.rows[0].id]);
          return {
            ...food.rows[0], ...foodVariant.rows[0], quantity, orderDate, orderTime, destinationAddressId, status,
          };
        }
      }));
      res.status(200).json({ data: result });
      await dbClient.query('COMMIT');
    } catch (err) {
      await dbClient.query('ROLLBACK');
      res.status(500).json({ error: err.message }).end();
    } finally {
      dbClient.release();
    }
  }

  static async modifyOrder(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    const dbClient = await pgConnection.connect();
    try {
      await dbClient.query('BEGIN');
      const findOrder = await dbClient.query('SELECT * FROM ORDERS WHERE id = $1', [+id]);
      if (findOrder.rows.length > 0) {
        const modifyOrder = await dbClient.query('UPDATE ORDERS SET status = $1 WHERE id = $2 RETURNING id, status', [status, +id]);
        await dbClient.query('COMMIT');
        res.status(200).json({ msg: `${modifyOrder.rows[0].status} order`, success: true }).end();
      }
    } catch (err) {
      await dbClient.query('ROLLBACK');
      res.status(500).json({ error: err.message }).end();
    } finally {
      dbClient.release();
    }
  }

  static async getAnOrder(req, res) {
    const { id } = req.params;
    const dbClient = await pgConnection.connect();
    try {
      await dbClient.query('BEGIN');
      const findOrder = await dbClient.query('SELECT * FROM ORDERS WHERE id = $1', [+id]);
      if (findOrder.rows.length > 0) {
        await dbClient.query('COMMIT');
        res.status(200).json({ data: findOrder.rows[0], success: true }).end();
      }
    } catch (err) {
      await dbClient.query('ROLLBACK');
      res.status(500).json({ error: err.message }).end();
    } finally {
      dbClient.release();
    }
  }

  static async getAUserOrderHistory(req, res) {
    const { id } = req.params;
    const dbClient = await pgConnection.connect();
    try {
      await dbClient.query('BEGIN');
      const findOrder = await dbClient.query('SELECT * FROM ORDERS WHERE userid = $1', [+id]);
      if (findOrder.rows.length > 0) {
        await dbClient.query('COMMIT');
        res.status(200).json({ data: findOrder.rows, success: true }).end();
      } else {
        res.status(404).json({ msg: 'Not Found' }).end();
      }
    } catch (err) {
      await dbClient.query('ROLLBACK');
      res.status(500).json({ error: err.message }).end();
    } finally {
      dbClient.release();
    }
  }

  static async getOrderDetails(req, res) {
    const { id } = req.params;
    const dbClient = await pgConnection.connect();
    try {
      await dbClient.query('BEGIN');
      const findOrderDetails = await dbClient.query(
        `SELECT U.firstname, U.lastname, U.phone, F.description, F.price, O.quantity, F.expectedDeliveryTime, A.destinationAddress, F.id
         FROM  ORDERS as O 
         JOIN Users as U ON O.userid = U.id 
         JOIN FoodVariants as F ON O.FoodVariantid = F.id 
         JOIN Addresses as A ON O.destinationAddressId =  A.id 
         WHERE O.id = $1 
      `, [+id],
      );
      if (findOrderDetails.rows.length > 0) {
        const foodVariant = await dbClient.query('SELECT foodId from FoodVariants WHERE id = $1', [findOrderDetails.rows[0].id]);
        const food = await dbClient.query('SELECT image, name from Foods WHERE id = $1', [foodVariant.rows[0].foodid]);
        await dbClient.query('COMMIT');
        res.status(200).json({ data: { ...findOrderDetails.rows[0], ...food.rows[0] }, success: true }).end();
      } else {
        res.status(404).json({ msg: 'Not Found' }).end();
      }
    } catch (err) {
      await dbClient.query('ROLLBACK');
      res.status(500).json({ error: err.message }).end();
    } finally {
      dbClient.release();
    }
  }
}

export default order;
