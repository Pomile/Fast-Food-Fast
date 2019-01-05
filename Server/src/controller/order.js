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
          quantity, orderDate, orderTime, destinationAddressId, accept, decline, complete,
        } = item;
        const foodVariant = await dbClient.query('SELECT id, price, description from FoodVariants WHERE id = $1', [item.id]);
        if (foodVariant.rows.length > 0) {
          const food = await dbClient.query('SELECT image, name FROM Foods WHERE id = $1', [foodVariant.rows[0].id]);
          return {
            ...food.rows[0], ...foodVariant.rows[0], quantity, orderDate, orderTime, destinationAddressId, accept, decline, complete,
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
    const {
      accept, decline, complete,
    } = req.body;
    const dbClient = await pgConnection.connect();
    try {
      await dbClient.query('BEGIN');
      const findOrder = await dbClient.query('SELECT * FROM ORDERS WHERE id = $1', [+id]);
      if (findOrder.rows.length > 0) {
        const modifyOrder = await dbClient.query('UPDATE ORDERS SET accept = $1, decline = $2, complete = $3 WHERE id = $4 RETURNING accept, decline, complete', [accept, decline, complete, +id]);
        await dbClient.query('COMMIT');
        res.status(200).json({ data: modifyOrder.rows[0], success: true, msg: 'order accepted' }).end();
      }
    } catch (err) {
      await dbClient.query('ROLLBACK');
      res.status(500).json({ error: err.message }).end();
    } finally {
      dbClient.release();
    }
  }

  static getOrder(req, res) {
    const { orderId } = req.params;
    if (Number.isInteger(+orderId)) {
      const findOrderById = data.orders.find(currentOrder => currentOrder.id === +orderId);
      res.status(200).json({ success: true, data: findOrderById }).end();
    } else {
      res.status(400).json({ success: false, msg: 'invalid request. request parameter must be an integer' }).end();
    }
  }
}

export default order;
