import { describe, it } from 'mocha';
import chai from 'chai';
import request from 'supertest';
import app from '../server';

const expect = chai.expect;
const userAuth = {
  id: null,
  isAuth: false,
};

const userAuth2 = {
  id: null,
  isAuth: false,
};

let userData = {
  firstname: 'user1',
  lastname: 'user1',
  email: 'user1@live.com',
  phone: '+123192000',
  password: 'password1',
  cpassword: 'password1',
  role: 'admin',
};

let userData2 = {
  firstname: 'user2',
  lastname: 'user2',
  email: 'user2@live.com',
  phone: '+123192928',
  password: 'Password123',
  cpassword: 'Password123',
  role: 'user',
};

describe('Fast-Food-Fast Test Suite', () => {
  describe('User API', () => {
    it('A user should be able to create an account', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send(userData)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.msg).to.equal('user added successfully');
          done();
        });
    });

    it('The admin user should be able to create an account', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send(userData2)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.msg).to.equal('user added successfully');
          done();
        });
    });

    it('A user should not be able to create an existing account', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send(userData2)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body.msg).to.equal('user already exists');
          done();
        });
    });

    it('A user should not be able to create an account without firstname', (done) => {
      userData2 = {
        firstname: '',
        lastname: 'Olusegun',
        email: 'olusegun@live.com',
        phone: '+1231921200',
        password: 'warlord1',
        cpassword: 'warlord1',
        role: 'user',
      };
      request(app)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send(userData2)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          done();
        });
    });

    it('A user should not be able to create an account without lastname', (done) => {
      userData = {
        firstname: 'Olusegun',
        lastname: '',
        email: 'olusegun@live.com',
        phone: '+1231921200',
        password: 'warlord1',
        cpassword: 'warlord1',
        role: 'user',
      };
      request(app)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send(userData)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          done();
        });
    });

    it('A user should not be able to create an account with invalid email', (done) => {
      userData = {
        firstname: 'Olusegun',
        lastname: 'Obasanjo',
        email: 'olus',
        phone: '+1231921200',
        password: 'warlord1',
        cpassword: 'warlord1',
        role: 'user',
      };
      request(app)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send(userData)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          done();
        });
    });

    it('A user should not be able to create an account without a phone number', (done) => {
      userData = {
        firstname: 'Olusegun',
        lastname: 'Obasanjo',
        email: 'Olusegun@gmail.com',
        phone: '',
        password: 'warlord1',
        cpassword: 'warlord1',
        role: 'user',
      };
      request(app)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send(userData)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          done();
        });
    });
    it('A user should not be able to create an account if the length of a password is below 5', (done) => {
      userData = {
        firstname: 'olusegun',
        lastname: 'obasanjo',
        email: 'olusegun@live.com',
        phone: '+1231921200',
        password: 'war1',
        cpassword: 'war1',
        role: 'user',
      };
      request(app)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send(userData)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          done();
        });
    });

    it('A user should not be able to create an account if the password does not contain a number', (done) => {
      userData = {
        firstname: 'olusegun',
        lastname: 'obasanjo',
        email: 'olusegun@live.com',
        phone: '+1231921200',
        password: 'warlord',
        cpassword: 'warlord',
        role: 'user',
      };
      request(app)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send(userData)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          done();
        });
    });
    it('A user should not be able to create an account if password does not match', (done) => {
      userData = {
        firstname: 'olusegun',
        lastname: 'obasanjo',
        email: 'olusegun@live.com',
        phone: '+1231921200',
        password: 'warlord1',
        cpassword: 'warlor1',
        role: 'user',
      };
      request(app)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send(userData)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          done();
        });
    });
    it('A user should be able to sign in', (done) => {
      const userCredentials = {
        email: 'user1@live.com',
        password: 'password1',
      };
      request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(userCredentials)
        .end((err, res) => {
          userAuth.id = res.body.user;
          userAuth.isAuth = res.body.isAuth;
          expect(res.body.msg).to.equal('user logged in sucessfully');
          done();
        });
    });

    it('A user should be able to sign in', (done) => {
      const userCredentials = {
        email: 'user2@live.com',
        password: 'Password123',
      };
      request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(userCredentials)
        .end((err, res) => {
          userAuth2.id = res.body.user;
          userAuth2.isAuth = res.body.isAuth;
          expect(res.body.msg).to.equal('user logged in sucessfully');
          done();
        });
    });

    it('A user should not be able to sign in if a password is not authentic ', (done) => {
      const userCredentials = {
        email: 'user1@live.com',
        password: 'pass',
      };
      request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(userCredentials)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.msg).to.equal('invalid password');
          done();
        });
    });
    it('A user should not be able to sign in if an email is incorrect', (done) => {
      const userCredentials = {
        email: 'user@live.com',
        password: 'password1',
      };
      request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(userCredentials)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.msg).to.equal('user not found');
          done();
        });
    });
  });
  describe('FastFood API', () => {
    it('A user should be able to get a list of fast food items', (done) => {
      const { isAuth } = userAuth;
      const { id } = userAuth;
      request(app)
        .get('/api/v1/fastFoods')
        .set('Accept', 'application/json')
        .set({ authorization: `${isAuth}`, user: `${id}` })
        .end((err, res) => {
          const { fastFoods } = res.body;
          if (!err) {
            expect(res.status).to.equal(200);
            expect(fastFoods.length).to.equal(4);
            done();
          }
        });
    });

    it('A user should be able to get a fast food item', (done) => {
      const { isAuth } = userAuth;
      const { id } = userAuth;
      request(app)
        .get('/api/v1/fastFoods/1')
        .set('Accept', 'application/json')
        .set({ authorization: `${isAuth}`, user: `${id}` })
        .end((err, res) => {
          const { foodItem } = res.body;
          if (!err) {
            expect(res.status).to.equal(200);
            expect(foodItem.description).to.equal('Shawamma with 1 hotdog');
            done();
          }
        });
    });
    it('A user should not be able to get fast food item(s) if not authenticated', (done) => {
      const isAuth = false;
      const id = 1;
      request(app)
        .get('/api/v1/fastFoods/1')
        .set('Accept', 'application/json')
        .set({ authorization: `${isAuth}`, user: `${id}` })
        .end((err, res) => {
          if (!err) {
            expect(res.status).to.equal(403);
            expect(res.body.msg).to.equal('user is not authenticated');
            done();
          }
        });
    });
    it('A user should not be able to add a food item', (done) => {
      const { isAuth } = userAuth2;
      const { id } = userAuth2;
      request(app)
        .post('/api/v1/fastFoods')
        .set('Accept', 'application/json')
        .set({ authorization: `${isAuth}`, user: `${id}` })
        .send({
          foodCategoryName: 'Fries',
          name: 'Chicken and chips',
          price: 2500,
          description: '2 Chickens and a pack of chips',
          quantity: 25,
          expectedDeliveryTime: '45 min',
        })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          done();
        });
    });
    it('The admin should be able to add a food item', (done) => {
      const { isAuth } = userAuth;
      const { id } = userAuth;
      request(app)
        .post('/api/v1/fastFoods')
        .set('Accept', 'application/json')
        .set({ authorization: `${isAuth}`, user: `${id}` })
        .send({
          foodCategoryName: 'Fries',
          name: 'Chicken and chips',
          price: 2500,
          description: '2 Chickens and a pack of chips',
          quantity: 25,
          expectedDeliveryTime: '45 min',
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.success).to.equal(true);
          done();
        });
    });

    it('The admin should be able to add a food category, food name, and food item,  if they does exist', (done) => {
      const { isAuth } = userAuth;
      const { id } = userAuth;
      request(app)
        .post('/api/v1/fastFoods')
        .set('Accept', 'application/json')
        .set({ authorization: `${isAuth}`, user: `${id}` })
        .send({
          foodCategoryName: 'Sides',
          name: 'Pie',
          price: 5500,
          description: '2 Chicken Pie with a bottle of coke',
          quantity: 25,
          expectedDeliveryTime: '25 min',
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.success).to.equal(true);
          done();
        });
    });
    it('The admin should not be able to add a food item that already exists', (done) => {
      const { isAuth } = userAuth;
      const { id } = userAuth;
      request(app)
        .post('/api/v1/fastFoods')
        .set('Accept', 'application/json')
        .set({ authorization: `${isAuth}`, user: `${id}` })
        .send({
          foodCategoryName: 'Fries',
          name: 'Chicken and chips',
          price: 2500,
          description: '2 Chickens and a pack of chips',
          quantity: 25,
          expectedDeliveryTime: '45 min',
        })
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body.success).to.equal(false);
          done();
        });
    });

    it('The admin should not be able to add a food item without food name', (done) => {
      const { isAuth } = userAuth;
      const { id } = userAuth;
      request(app)
        .post('/api/v1/fastFoods')
        .set('Accept', 'application/json')
        .set({ authorization: `${isAuth}`, user: `${id}` })
        .send({
          foodCategoryName: 'Fries',
          name: '',
          price: 2500,
          description: '2 Chickens and a pack of chips',
          quantity: 25,
          expectedDeliveryTime: '45 min',
        })
        .end((err, res) => {
          expect(res.status).to.equal(422);
          done();
        });
    });

    it('The admin should not be able to add a food item with invalid price', (done) => {
      const { isAuth } = userAuth;
      const { id } = userAuth;
      request(app)
        .post('/api/v1/fastFoods')
        .set('Accept', 'application/json')
        .set({ authorization: `${isAuth}`, user: `${id}` })
        .send({
          foodCategoryName: 'Fries',
          name: 'Chicken and chips',
          price: '2500',
          description: '2 Chickens and a pack of chips',
          quantity: 25,
          expectedDeliveryTime: '45 min',
        })
        .end((err, res) => {
          expect(res.status).to.equal(422);
          done();
        });
    });

    it('The admin should not be able to add a food item without quantity', (done) => {
      const { isAuth } = userAuth;
      const { id } = userAuth;
      request(app)
        .post('/api/v1/fastFoods')
        .set('Accept', 'application/json')
        .set({ authorization: `${isAuth}`, user: `${id}` })
        .send({
          foodCategoryName: 'Fries',
          name: 'Chiken and chips',
          price: 2500,
          quantity: '',
          description: '2 Chickens and a pack of chips',
          expectedDeliveryTime: '45 min',
        })
        .end((err, res) => {
          expect(res.status).to.equal(422);
          done();
        });
    });

    it('The admin should not be able to add a food item without a description', (done) => {
      const { isAuth } = userAuth;
      const { id } = userAuth;
      request(app)
        .post('/api/v1/fastFoods')
        .set('Accept', 'application/json')
        .set({ authorization: `${isAuth}`, user: `${id}` })
        .send({
          foodCategoryName: 'Fries',
          name: 'Chiken and chips',
          price: 2500,
          description: '',
          expectedDeliveryTime: '45 min',
        })
        .end((err, res) => {
          expect(res.status).to.equal(422);
          done();
        });
    });

    it('The admin should be able to update a food item', (done) => {
      const { isAuth } = userAuth;
      const { id } = userAuth;
      request(app)
        .put('/api/v1/fastFoods/5')
        .set('Accept', 'application/json')
        .set({ authorization: `${isAuth}`, user: `${id}` })
        .send({
          foodId: 3,
          image: null,
          price: 2500,
          description: '2 Chickens and a pack of chips with a bottle of coke',
          quantity: 25,
          expectedDeliveryTime: '45 min',
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('The admin should be able to update a food item', (done) => {
      const { isAuth } = userAuth;
      const { id } = userAuth;
      request(app)
        .put('/api/v1/fastFoods/9')
        .set('Accept', 'application/json')
        .set({ authorization: `${isAuth}`, user: `${id}` })
        .send({
          foodId: 3,
          image: null,
          price: 2500,
          description: '2 Chickens and a pack of chips with a bottle of coke',
          quantity: 25,
          expectedDeliveryTime: '45 min',
        })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.msg).to.equal('food item does not exist');
          done();
        });
    });

    it('The admin should not be able to update a food item without a price', (done) => {
      const { isAuth } = userAuth;
      const { id } = userAuth;
      request(app)
        .put('/api/v1/fastFoods/5')
        .set('Accept', 'application/json')
        .set({ authorization: `${isAuth}`, user: `${id}` })
        .send({
          foodId: 3,
          image: null,
          price: 0,
          description: '2 Chickens and a pack of chips with a bottle of coke',
          quantity: 25,
          expectedDeliveryTime: '45 min',
        })
        .end((err, res) => {
          expect(res.status).to.equal(422);
          done();
        });
    });

    it('The admin should not be able to update a food item without a description', (done) => {
      const { isAuth } = userAuth;
      const { id } = userAuth;
      request(app)
        .put('/api/v1/fastFoods/5')
        .set('Accept', 'application/json')
        .set({ authorization: `${isAuth}`, user: `${id}` })
        .send({
          foodId: 3,
          image: null,
          price: 1500,
          description: '',
          quantity: 25,
          expectedDeliveryTime: '45 min',
        })
        .end((err, res) => {
          expect(res.status).to.equal(422);
          done();
        });
    });

    it('The admin should not be able to update a food item without a deliveryTime', (done) => {
      const { isAuth } = userAuth;
      const { id } = userAuth;
      request(app)
        .put('/api/v1/fastFoods/5')
        .set('Accept', 'application/json')
        .set({ authorization: `${isAuth}`, user: `${id}` })
        .send({
          foodId: 3,
          image: null,
          price: 1500,
          description: '2 Chickens and a pack of chips',
          quantity: 25,
          expectedDeliveryTime: '',
        })
        .end((err, res) => {
          expect(res.status).to.equal(422);
          done();
        });
    });

    it('The admin should be able to update a food name', (done) => {
      const { isAuth } = userAuth;
      const { id } = userAuth;
      request(app)
        .put('/api/v1/fastFood/3')
        .set('Accept', 'application/json')
        .set({ authorization: `${isAuth}`, user: `${id}` })
        .send({
          foodId: 3,
          name: 'Sandwich',
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.msg).to.equal('food modified successfully');
          done();
        });
    });

    it('The admin should not be able to update a food without a name', (done) => {
      const { isAuth } = userAuth;
      const { id } = userAuth;
      request(app)
        .put('/api/v1/fastFood/3')
        .set('Accept', 'application/json')
        .set({ authorization: `${isAuth}`, user: `${id}` })
        .send({
          foodId: 3,
          name: '',
        })
        .end((err, res) => {
          expect(res.status).to.equal(422);
          done();
        });
    });

    it('The admin should be able to delete a food and its item', (done) => {
      const { isAuth } = userAuth;
      const { id } = userAuth;
      request(app)
        .delete('/api/v1/fastFood/3')
        .set('Accept', 'application/json')
        .set({ authorization: `${isAuth}`, user: `${id}` })
        .send({
          foodId: 3,
        })
        .end((err, res) => {
          expect(res.status).to.equal(204);
          done();
        });
    });

    it('The admin should be able to delete a food item', (done) => {
      const { isAuth } = userAuth;
      const { id } = userAuth;
      request(app)
        .delete('/api/v1/fastFoods/4')
        .set('Accept', 'application/json')
        .set({ authorization: `${isAuth}`, user: `${id}` })
        .send({
          foodId: 3,
        })
        .end((err, res) => {
          expect(res.status).to.equal(204);
          done();
        });
    });
  });
  describe('Order API', () => {
    it('A user should be able to place an order', (done) => {
      const order = [
        {
          userId: 1, foodItemId: 4, destinationAddress: '4, ereko street fadeyi, lagos', quantity: 3,
        },
        {
          userId: 1, foodItemId: 3, destinationAddress: '4, ereko street fadeyi, lagos', quantity: 2,
        },
      ];
      const { isAuth } = userAuth;
      const { id } = userAuth;
      request(app)
        .post('/api/v1/orders')
        .set('Accept', 'application/json')
        .send(order)
        .set({ authorization: `${isAuth}`, user: `${id}` })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.msg).to.equal('order placed successfully');
          done();
        });
    });
    it('A user should be able to place an order without authentication', (done) => {
      const order = [
        {
          userId: 1, foodItemId: 4, destinationAddress: '4, ereko street fadeyi, lagos', quantity: 3,
        },
        {
          userId: 1, foodItemId: 3, destinationAddress: '4, ereko street fadeyi, lagos', quantity: 2,
        },
      ];
      // const { isAuth } = userAuth;
      // const { id } = userAuth;
      request(app)
        .post('/api/v1/orders')
        .set('Accept', 'application/json')
        .send(order)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.msg).to.equal('not authenticated');
          done();
        });
    });

    it('A user should not be able to place an order without a quantity', (done) => {
      const orders = [
        {
          userId: 1, foodItemId: 4, destinationAddress: '4, ereko street fadeyi, lagos', quantity: 0,
        },
        {
          userId: 1, foodItemId: 3, destinationAddress: '4, ereko street fadeyi, lagos', quantity: 2,
        },
      ];
      const { isAuth } = userAuth;
      const { id } = userAuth;
      request(app)
        .post('/api/v1/orders')
        .set('Accept', 'application/json')
        .send({ orders })
        .set({ authorization: `${isAuth}`, user: `${id}` })
        .end((err, res) => {
          expect(res.status).to.equal(422);
          done();
        });
    });

    it('A user should not be able to place an order without destination address', (done) => {
      const orders = [
        {
          userId: 1, foodItemId: 4, destinationAddress: '4, ereko street fadeyi, lagos', quantity: 0,
        },
        {
          userId: 1, foodItemId: 3, destinationAddress: '', quantity: 2,
        },
      ];
      const { isAuth } = userAuth;
      const { id } = userAuth;
      request(app)
        .post('/api/v1/orders')
        .set('Accept', 'application/json')
        .send({ orders })
        .set({ authorization: `${isAuth}`, user: `${id}` })
        .end((err, res) => {
          expect(res.status).to.equal(422);
          done();
        });
    });

    it('A user should not be able to place an order without food item id', (done) => {
      const orders = [
        { userId: 1, destinationAddress: '4, ereko street fadeyi, lagos', quantity: 0 },
        {
          userId: 1, foodItemId: 3, destinationAddress: '', quantity: 2,
        },
      ];
      const { isAuth } = userAuth;
      const { id } = userAuth;
      request(app)
        .post('/api/v1/orders')
        .set('Accept', 'application/json')
        .send({ orders })
        .set({ authorization: `${isAuth}`, user: `${id}` })
        .end((err, res) => {
          expect(res.status).to.equal(422);
          done();
        });
    });

    it('The admin user should be able to get all customer orders', (done) => {
      const { isAuth } = userAuth;
      const { id } = userAuth;

      request(app)
        .get('/api/v1/orders')
        .set('Accept', 'application/json')
        .set({ authorization: `${isAuth}`, user: `${id}` })
        .end((err, res) => {
          // console.log(res.body);
          expect(res.status).to.equal(200);
          expect(res.body.length).to.equal(4);
          done();
        });
    });

    it('The admin user should be able to accept an order', (done) => {
      const { isAuth } = userAuth;
      const { id } = userAuth;
      request(app)
        .put('/api/v1/orders/1')
        .set('Accept', 'application/json')
        .set({ authorization: `${isAuth}`, user: `${id}` })
        .send({ accept: true })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.msg).to.equal('order accepted');
          done();
        });
    });

    it('The admin user should be able to decline an order', (done) => {
      const { isAuth } = userAuth;
      const { id } = userAuth;
      request(app)
        .put('/api/v1/orders/2')
        .set('Accept', 'application/json')
        .set({ authorization: `${isAuth}`, user: `${id}` })
        .send({ decline: true })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.msg).to.equal('order declined');
          done();
        });
    });

    it('The admin user should be able to mark an order as completed', (done) => {
      const { isAuth } = userAuth;
      const { id } = userAuth;
      request(app)
        .put('/api/v1/orders/1')
        .set('Accept', 'application/json')
        .set({ authorization: `${isAuth}`, user: `${id}` })
        .send({ completed: true })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.msg).to.equal('order completed');
          done();
        });
    });

    it('The admin user should not be able to accept an order that is completed', (done) => {
      const { isAuth } = userAuth;
      const { id } = userAuth;
      request(app)
        .put('/api/v1/orders/1')
        .set('Accept', 'application/json')
        .set({ authorization: `${isAuth}`, user: `${id}` })
        .send({ accept: true })
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body.msg).to.equal('cannot accept an order that is already completed');
          done();
        });
    });

    it('The admin user should not be able to decline an order that is completed', (done) => {
      const { isAuth } = userAuth;
      const { id } = userAuth;
      request(app)
        .put('/api/v1/orders/1')
        .set('Accept', 'application/json')
        .set({ authorization: `${isAuth}`, user: `${id}` })
        .send({ decline: true })
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body.msg).to.equal('cannot decline an order that is already completed');
          done();
        });
    });

    it('The admin user should be able to mark an an order as uncompleted', (done) => {
      const { isAuth } = userAuth;
      const { id } = userAuth;
      request(app)
        .put('/api/v1/orders/1')
        .set('Accept', 'application/json')
        .set({ authorization: `${isAuth}`, user: `${id}` })
        .send({ completed: false })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.msg).to.equal('order not completed');
          done();
        });
    });
    it('A user should be able to get his or her orders', (done) => {
      const { isAuth } = userAuth;
      const { id } = userAuth;
      request(app)
        .get('/api/v1/orders?customerOrders=true')
        .set('Accept', 'application/json')
        .set({ authorization: `${isAuth}`, user: `${id}` })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          done();
        });
    });

    it('A user or the admin should be able to get an orders', (done) => {
      const { isAuth } = userAuth;
      const { id } = userAuth;
      request(app)
        .get('/api/v1/orders/1')
        .set('Accept', 'application/json')
        .set({ authorization: `${isAuth}`, user: `${id}` })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          done();
        });
    });
  });
});
