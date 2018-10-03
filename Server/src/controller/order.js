import moment from 'moment';
import data from '../db/data';
import getFoodItem from '../helpers/getFoodItem';
import getUser from '../helpers/getUser';

class order {
  static placeOrder(req, res) {
    const foodItems = req.body.data.order;
    const { userId, destinationAddress } = req.body.data;
    const InitialNoOforders = data.orders.length;
    const orderInfo = foodItems.map((item) => {
      const foodItem = item;
      foodItem.orderDate = moment().format('dddd, MMMM Do YYYY');
      foodItem.orderTime = moment().format('h:mm:ss a');
      foodItem.expectedDeliveryTime = moment().add(45, 'minutes').format('h:mm:ss a');
      foodItem.userId = userId;
      foodItem.accept = false;
      foodItem.decline = false;
      foodItem.completed = false;
      return foodItem;
    });
    orderInfo.map((item) => {
      const orderItem = item;
      const len = data.orders.length;
      orderItem.id = len + 1;
      const addressLen = data.destinationAddress.length;
      orderItem.destinationAddressId = addressLen + 1;
      data.destinationAddress.push({ id: addressLen + 1, destinationAddress });
      data.orders.push(orderItem);
    });
    const currentNoOfOrders = data.orders.length;
    if (InitialNoOforders < currentNoOfOrders) {
      res.status(201).json({ msg: 'order placed successfully', success: true }).end();
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
    const customerOrders = [];
    data.orders.map((o) => {
      const currentOrder = o;
      const u = getUser(o.userId);
      const foodItem = getFoodItem(o.foodItemId);
      currentOrder.user = u;
      currentOrder.foodItem = foodItem;
      customerOrders.push(currentOrder);
    });
    res.status(200).json({ customerOrders, success: true, length: customerOrders.length }).end();
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
