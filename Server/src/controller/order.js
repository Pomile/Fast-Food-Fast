import moment from 'moment';
import data from '../db/data';

class order {
  static placeOrder(req, res) {
    const foodItems = req.body;
    // generate orderDate,
    // generate OrderTime,
    // get food item expected delivery time
    // use moment to get estimated delivery time

    // generate boolean false for accept, decline, and completed
    // console.log(foodItems);
    const InitialNoOforders = data.orders.length;
    const today = moment().format('dddd, MMMM Do YYYY');
    const currentTime = moment().format('h:mm:ss a');
    const expectedDeliveryTime = moment().add(45, 'minutes').format('h:mm:ss a');
    const orderInfo = foodItems.map((item) => {
      const foodItem = item;
      foodItem.orderDate = today;
      foodItem.orderTime = currentTime;
      foodItem.expectedDeliveryTime = expectedDeliveryTime;
      foodItem.accept = null;
      foodItem.decline = null;
      foodItem.completed = null;

      return foodItem;
    });

    // console.log(orderInfo);
    orderInfo.map(item => data.orders.push(item));

    const currentNoOfOrders = data.orders.length;

    if (InitialNoOforders < currentNoOfOrders) {
      res.status(201).json({ msg: 'order placed successfully', success: true }).end();
    } else {
      res.status(200).json({ sucess: false, msg: 'order not successful' }).end();
    }

    // add to order
  }
}

export default order;
