import chai from 'chai';
import request from 'supertest';
import app from '../server';
import testData from './testData';
import db from '../src/model';

const { models } = db;
const expect = chai.expect;

describe('Order API', () => {
  /* after(async () => {
    await models.sync({ force: true });
  }); */
  it('A user should be able to place an order', (done) => {
    const { isAuth, token } = testData.userAuth;
    request(app)
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .send(testData.orderData)
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.msg).to.equal('order placed successfully');
        done();
      });
  });

  it('A user should not be able to place an order if quantity in stock is less than quantity ordered ', (done) => {
    const { isAuth, token } = testData.userAuth;
    request(app)
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .send(testData.orderDataWithLargerQuantity)
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.msg).to.equal('order placed successfully');
        done();
      });
  });
  it('A user should not be able to place an order with invalid token', (done) => {
    const { isAuth, token } = testData.userAuth;
    request(app)
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .send(testData.orderData)
      .set({ authorization: `${token}yeyeytytet`, isAuth: `${isAuth}` })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.err).to.equal('invalid token');
        done();
      });
  });
  it('A user should not be able to place an order without authentication', (done) => {
    request(app)
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .send(testData.orderData)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.msg).to.equal('Not authorized');
        done();
      });
  });

  it('A user should not be able to place an order without a quantity', (done) => {
    const { isAuth, token } = testData.userAuth;
    request(app)
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .send(testData.orderDataWithoutQuantity)
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });


  it('A user should not be able to place an order with invalid foodItem id', (done) => {
    const { isAuth, token } = testData.userAuth;
    request(app)
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .send(testData.orderDataInvalidFoodItemId)
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });
  it('A user should not be able to place an order if order is empty', (done) => {
    const { isAuth, token } = testData.userAuth;
    request(app)
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .send(testData.orderDataWithEmptyOrder)
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });
  it('A user should not be able to place an order without foodItem id', (done) => {
    const { isAuth, token } = testData.userAuth;
    request(app)
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .send(testData.orderDataWithoutFoodItemId)
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('A user should not be able to place an order without destination address', (done) => {
    const { isAuth, token } = testData.userAuth;
    request(app)
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .send(testData.orderDataWithoutdestinationAddress)
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('A user should not be able to place an order without state', (done) => {
    const { isAuth, token } = testData.userAuth;
    request(app)
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .send(testData.orderDataWithoutState)
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('A user should not be able to place an order without user data', (done) => {
    const { isAuth, token } = testData.userAuth;
    request(app)
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .send(testData.orderDataWithoutStateField)
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('A user should not be able to place an order without food item id', (done) => {
    const { isAuth, token } = testData.userAuth;
    request(app)
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .send(testData.orderDataWithoutFoodItemId)
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('The admin user should be able to get all customer orders', (done) => {
    const { isAuth, token } = testData.adminUserAuth;
    request(app)
      .get('/api/v1/customer/orders?customerOrders=true')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data.length).to.equal(3);
        done();
      });
  });

  it('The admin user should be able to accept an order', (done) => {
    const { isAuth, token } = testData.adminUserAuth;
    request(app)
      .put('/api/v1/orders/1')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .send({
        status: 'Processing',
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.msg).to.equal('Processing order');
        done();
      });
  });

  it('The admin user should be able to decline an order', (done) => {
    const { isAuth, token } = testData.adminUserAuth;
    request(app)
      .put('/api/v1/orders/2')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .send({
        status: 'Cancelled',
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.msg).to.equal('Cancelled order');
        done();
      });
  });

  it('The admin user should be able to mark an order as completed', (done) => {
    const { isAuth, token } = testData.adminUserAuth;
    request(app)
      .put('/api/v1/orders/1')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .send({
        status: 'Completed',
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.msg).to.equal('Completed order');
        done();
      });
  });

  it('The admin user should not be able to accept an order that is completed', (done) => {
    const { isAuth, token } = testData.adminUserAuth;
    request(app)
      .put('/api/v1/orders/1')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .send({
        status: 'Completed',
      })
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.msg).to.equal('Order is already completed');
        done();
      });
  });

  it('The admin user should not be able to decline an order that is completed', (done) => {
    const { isAuth, token } = testData.adminUserAuth;
    request(app)
      .put('/api/v1/orders/1')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .send(testData.orderDataDecline)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.msg).to.equal('Order is already completed');
        done();
      });
  });

  it('The admin user should not be able to accept, decline, or complete an order with invalid id', (done) => {
    const { isAuth, token } = testData.adminUserAuth;
    request(app)
      .put('/api/v1/orders/food')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .send(testData.orderDataDecline)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.msg).to.equal('invalid parameter id. id must be an integer');
        done();
      });
  });

  it('A user should be able to get his or her orders', (done) => {
    const { isAuth, token } = testData.userAuth;
    request(app)
      .get('/api/v1/user/orders')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .end((err, res) => {
        // console.log(res.body);
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        done();
      });
  });

  it('A user should be able to get his or her orders', (done) => {
    const { isAuth, token } = testData.adminUserAuth;
    request(app)
      .get('/api/v1/user/orders')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .end((err, res) => {
        // console.log(res.body);
        expect(res.status).to.equal(404);
        expect(res.body.msg).to.equal('Not Found');
        done();
      });
  });

  it('A user or the admin should be able to get an order', (done) => {
    const { isAuth, token } = testData.userAuth;
    request(app)
      .get('/api/v1/orders/1')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        done();
      });
  });

  it('A user or the admin should be able to get an order details', (done) => {
    const { isAuth, token } = testData.adminUserAuth;
    request(app)
      .get('/api/v1/orders/1/details')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.data.name).to.equal('Fried rice + Chicken + Dodo');
        done();
      });
  });

  it('A user or the admin should not be able to get an order details', (done) => {
    const { isAuth, token } = testData.adminUserAuth;
    request(app)
      .get('/api/v1/orders/20/details')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.msg).to.equal('Not Found');
        done();
      });
  });

  it('A user or the admin should not be able to get an order with invalid id', (done) => {
    const { isAuth, token } = testData.userAuth;
    request(app)
      .get('/api/v1/orders/food')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.msg).to.equal('invalid parameter id. id must be an integer');
        done();
      });
  });
});
