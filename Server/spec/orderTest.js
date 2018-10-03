import chai from 'chai';
import request from 'supertest';
import app from '../server';
import testData from './testData';

const expect = chai.expect;

describe('Order API', () => {
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

  it('A user should not be able to place an order with invalid user id', (done) => {
    const { isAuth, token } = testData.userAuth;
    request(app)
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .send(testData.orderDataWithInvalidUserId)
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });
  it('A user should not be able to place an order without user id', (done) => {
    const { isAuth, token } = testData.userAuth;
    request(app)
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .send(testData.orderDataWithoutUserId)
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
      .get('/api/v1/orders?customerOrders=true')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.length).to.equal(2);
        done();
      });
  });

  it('The admin user should be able to accept an order', (done) => {
    const { isAuth, token } = testData.adminUserAuth;
    request(app)
      .put('/api/v1/orders/1')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .send(testData.orderDataAccept)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.msg).to.equal('order accepted');
        done();
      });
  });

  it('The admin user should be able to decline an order', (done) => {
    const { isAuth, token } = testData.adminUserAuth;
    request(app)
      .put('/api/v1/orders/2')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .send(testData.orderDataDecline)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.msg).to.equal('order declined');
        done();
      });
  });

  it('The admin user should be able to mark an order as completed', (done) => {
    const { isAuth, token } = testData.adminUserAuth;
    request(app)
      .put('/api/v1/orders/1')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .send(testData.orderDataCompleted)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.msg).to.equal('order completed');
        done();
      });
  });

  it('The admin user should not be able to accept an order that is completed', (done) => {
    const { isAuth, token } = testData.adminUserAuth;
    request(app)
      .put('/api/v1/orders/1')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .send(testData.orderDataAccept)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.msg).to.equal('cannot accept an order that is already completed');
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
        expect(res.body.msg).to.equal('cannot decline an order that is already completed');
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
        expect(res.body.success).to.equal(false);
        expect(res.body.msg).to.equal('invalid request. request parameter must be an integer');
        done();
      });
  });

  it('The admin user should be able to mark an order as uncompleted', (done) => {
    const { isAuth, token } = testData.adminUserAuth;
    request(app)
      .put('/api/v1/orders/1')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .send(testData.orderDataUnCompleted)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.msg).to.equal('order not completed');
        done();
      });
  });

  it('A user should be able to get his or her orders', (done) => {
    const { isAuth, token } = testData.adminUserAuth;
    request(app)
      .get('/api/v1/orders')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.success).to.equal(true);
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

  it('A user or the admin should not be able to get an order with invalid id', (done) => {
    const { isAuth, token } = testData.userAuth;
    request(app)
      .get('/api/v1/orders/food')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.msg).to.equal('invalid request. request parameter must be an integer');
        done();
      });
  });
});
