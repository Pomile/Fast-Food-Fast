import moment from 'moment';
import db from '../model';
// import data from '../db/data';
// import getFoodItem from '../helpers/getFoodItem';
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

  static modifyOrder(req, res) {
    const { orderId } = req.params;
    if (Number.isInteger(+orderId)) {
      data.orders.map((orderItem, index) => {
        const newOrderItem = { ...orderItem };
        if (req.body.accept && (orderItem.id === +orderId && newOrderItem.completed !== true)) {
          newOrderItem.accept = true;
          newOrderItem.decline = false;
          data.orders[index] = newOrderItem;
          res.status(200).json({ msg: 'order accepted', data: newOrderItem });
        } else if (req.body.accept && (orderItem.id === +orderId && newOrderItem.completed === true)) {
          res.status(409).json({ msg: 'cannot accept an order that is already completed' }).end();
        } else if (req.body.decline && (orderItem.id === +orderId && newOrderItem.completed !== true)) {
          newOrderItem.accept = false;
          newOrderItem.decline = true;
          newOrderItem.completed = false;
          data.orders[index] = newOrderItem;
          res.status(200).json({ msg: 'order declined', data: newOrderItem });
        } else if (req.body.decline && (orderItem.id === +orderId && newOrderItem.completed === true)) {
          res.status(409).json({ msg: 'cannot decline an order that is already completed' }).end();
        } else if (req.body.completed && orderItem.id === +orderId) {
          newOrderItem.accept = true;
          newOrderItem.decline = false;
          newOrderItem.completed = true;
          data.orders[index] = newOrderItem;
          res.status(200).json({ msg: 'order completed', data: newOrderItem }).end();
        } else if (req.body.completed === false && orderItem.id === +orderId) {
          newOrderItem.accept = false;
          newOrderItem.decline = false;
          newOrderItem.completed = false;
          data.orders[index] = newOrderItem;
          res.status(200).json({ msg: 'order not completed', data: newOrderItem }).end();
        }
      });
    } else {
      res.status(400).json({ success: false, msg: 'invalid request. request parameter must be an integer' }).end();
    }
  }


  static getUserOrder(req, res) {
    const { id } = req.user;
    const customerOrders = [];
    data.orders.map((item) => {
      if (item.userId === +id) {
        customerOrders.push(item);
      }
    });
    res.status(200).json({ customerOrders, success: true }).end();
  }

  static adminGetUserOrders(req, res) {
    // const customerOrders = [];
    // data.orders.map((o) => {
    // const currentOrder = o;
    // const u = getUser(o.userId);
    // const foodItem = getFoodItem(o.foodItemId);
    // currentOrder.user = u;
    // currentOrder.foodItem = foodItem;
    // customerOrders.push(currentOrder);
    // });
    // res.status(200).json({ customerOrders, success: true, length: customerOrders.length }).end();
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
