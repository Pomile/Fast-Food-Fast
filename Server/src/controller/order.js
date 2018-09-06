import moment from 'moment';
import data from '../db/data';
import getFoodItem from '../helpers/getFoodItem';
import getUser from '../helpers/getUser';

class order {
  static placeOrder(req, res) {
    const foodItems = req.body;
    const InitialNoOforders = data.orders.length;
    const today = moment().format('dddd, MMMM Do YYYY');
    const currentTime = moment().format('h:mm:ss a');
    const expectedDeliveryTime = moment().add(45, 'minutes').format('h:mm:ss a');
    // const foodItemLen = data.foodItems.length;
    const orderInfo = foodItems.map((item) => {
      const foodItem = item;
      foodItem.orderDate = today;
      foodItem.orderTime = currentTime;
      foodItem.expectedDeliveryTime = expectedDeliveryTime;
      foodItem.accept = false;
      foodItem.decline = false;
      foodItem.completed = false;

      return foodItem;
    });
    orderInfo.map((item) => {
      const orderItem = item;
      const len = data.orders.length;
      orderItem.id = len + 1;
      data.orders.push(orderItem);
      return null;
    });

    const currentNoOfOrders = data.orders.length;

    if (InitialNoOforders < currentNoOfOrders) {
      res.status(201).json({ msg: 'order placed successfully', success: true }).end();
    } else {
      res.status(200).json({ sucess: false, msg: 'order not successful' }).end();
    }
  }

  static getOrders(req, res) {
    const customerOrders = [];
    data.orders.map((o) => {
      const currentOrder = o;
      const user = getUser(o.userId);
      const foodItem = getFoodItem(o.foodItemId);
      currentOrder.user = user;
      currentOrder.foodItem = foodItem;
      return customerOrders.push(currentOrder);
    });
    res.status(200).json(customerOrders);
  }

  static modifyOrder(req, res) {
    const id = req.params.orderId;
    data.orders.map((orderItem, index) => {
      const newOrderItem = { ...orderItem };
      if (req.body.accept) {
        if (orderItem.id === +id && newOrderItem.completed !== true) {
          newOrderItem.accept = true;
          newOrderItem.decline = false;
          data.orders[index] = newOrderItem;
          res.status(200).json({ msg: 'order accepted', data: newOrderItem });
        } else if (orderItem.id === +id && newOrderItem.completed === true) {
          res.status(409).json({ msg: 'cannot accept an order that is already completed' });
        }
      } else if (req.body.decline) {
        if (orderItem.id === +id && newOrderItem.completed !== true) {
          newOrderItem.accept = false;
          newOrderItem.decline = true;
          newOrderItem.completed = false;
          data.orders[index] = newOrderItem;
          res.status(200).json({ msg: 'order declined', data: newOrderItem });
        } else if (orderItem.id === +id && newOrderItem.completed === true) {
          res.status(409).json({ msg: 'cannot decline an order that is already completed' });
        }
      } else if (req.body.completed) {
        if (orderItem.id === +id) {
          newOrderItem.accept = true;
          newOrderItem.decline = false;
          newOrderItem.completed = true;
          data.orders[index] = newOrderItem;
          res.status(200).json({ msg: 'order completed', data: newOrderItem });
        }
      } else if (req.body.completed === false) {
        if (orderItem.id === +id) {
          newOrderItem.accept = false;
          newOrderItem.decline = false;
          newOrderItem.completed = false;
          data.orders[index] = newOrderItem;
          res.status(200).json({ msg: 'order not completed', data: newOrderItem });
        }
      }
    });
  }

  static getUserOrders(req, res) {
    const userId = req.user.id;
    const customerOrders = [];
    data.orders.map((item) => {
      if (item.userId === userId) {
        customerOrders.push(item);
      }
    });
    res.status(200).json({ customerOrders, success: true });
  }
}

export default order;
