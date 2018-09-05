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
    const foodItemLen = data.foodItems.length;
    const orderInfo = foodItems.map((item) => {
      const foodItem = item;
      foodItem.id = foodItemLen + 1;
      foodItem.orderDate = today;
      foodItem.orderTime = currentTime;
      foodItem.expectedDeliveryTime = expectedDeliveryTime;
      foodItem.accept = null;
      foodItem.decline = null;
      foodItem.completed = null;

      return foodItem;
    });
    orderInfo.map(item => data.orders.push(item));

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
}

export default order;
