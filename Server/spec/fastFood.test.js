import chai from 'chai';
import request from 'supertest';
import app from '../server';
import testData from './test.data';

const expect = chai.expect;


describe('FastFood API', () => {
    it('A user should be able to get a list of fast food items', (done) => {
      const { isAuth, id } = testData.userAuth;

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
      const { isAuth, id } = testData.userAuth;
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
    it('A user should not be able to get a fast food item that does not exist', (done) => {
      const { isAuth, id } = testData.userAuth;
      request(app)
        .get('/api/v1/fastFoods/9')
        .set('Accept', 'application/json')
        .set({ authorization: `${isAuth}`, user: `${id}` })
        .end((err, res) => {
          const { foodItem } = res.body;
          if (!err) {
            expect(res.status).to.equal(404);
            expect(res.body.msg).to.equal('Fast food not found');
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
            expect(res.status).to.equal(401);
            expect(res.body.msg).to.equal('user is not authenticated');
            done();
          }
        });
    });
    it('A user should not be able to add a food item', (done) => {
      const { isAuth, id } = testData.userAuth;
      request(app)
        .post('/api/v1/fastFoods')
        .set('Accept', 'application/json')
        .set({ authorization: `${isAuth}`, user: `${id}` })
        .send(testData.foodItem)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          done();
        });
    });
    it('The admin should be able to add a food item', (done) => {
      const { isAuth, id } = testData.adminUserAuth;
      request(app)
        .post('/api/v1/fastFoods')
        .set('Accept', 'application/json')
        .set({ authorization: `${isAuth}`, user: `${id}` })
        .send(testData.foodItem)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.success).to.equal(true);
          expect(res.body.data.id).to.equal(5);
          done();
        });
    });

    it('The admin should be able to add a food category, food name, and food item,  if they does exist', (done) => {
      const { isAuth, id } = testData.adminUserAuth;
      request(app)
        .post('/api/v1/fastFoods')
        .set('Accept', 'application/json')
        .set({ authorization: `${isAuth}`, user: `${id}` })
        .send(testData.foodCategoryNameItem)
        .end((err, res) => {
          
          expect(res.status).to.equal(201);
          expect(res.body.success).to.equal(true);
          expect(res.body.data.id).to.equal(6);
          done();
        });
    });
    it('The admin should not be able to add a food item that already exists', (done) => {
      const { isAuth, id } = testData.adminUserAuth;
      request(app)
        .post('/api/v1/fastFoods')
        .set('Accept', 'application/json')
        .set({ authorization: `${isAuth}`, user: `${id}` })
        .send(testData.foodCategoryNameItem)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body.success).to.equal(false);
          done();
        });
    });

    it('The admin should not be able to add a food item without food name', (done) => {
      const { isAuth, id } = testData.adminUserAuth;
      request(app)
        .post('/api/v1/fastFoods')
        .set('Accept', 'application/json')
        .set({ authorization: `${isAuth}`, user: `${id}` })
        .send(testData.foodItemWithoutName)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('The admin should not be able to add a food item with invalid price', (done) => {
      const { isAuth, id } = testData.adminUserAuth;
      request(app)
        .post('/api/v1/fastFoods')
        .set('Accept', 'application/json')
        .set({ authorization: `${isAuth}`, user: `${id}` })
        .send(testData.foodItemWithInvalidprice)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('The admin should not be able to add a food item without quantity', (done) => {
      const { isAuth, id } = testData.adminUserAuth;
      request(app)
        .post('/api/v1/fastFoods')
        .set('Accept', 'application/json')
        .set({ authorization: `${isAuth}`, user: `${id}` })
        .send(testData.foodItemWithoutQuantity)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('The admin should not be able to add a food item without a description', (done) => {
      const { isAuth, id } = testData.adminUserAuth;
      request(app)
        .post('/api/v1/fastFoods')
        .set('Accept', 'application/json')
        .set({ authorization: `${isAuth}`, user: `${id}` })
        .send(testData.foodItemWithoutDescription)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('The admin should be able to update a food item', (done) => {
      const { isAuth, id } = testData.adminUserAuth;
      request(app)
        .put('/api/v1/fastFoods/5')
        .set('Accept', 'application/json')
        .set({ authorization: `${isAuth}`, user: `${id}` })
        .send(testData.foodItemUpdate)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('The admin should not be able to update a food item that does not exist', (done) => {
      const { isAuth, id } = testData.adminUserAuth;
      request(app)
        .put('/api/v1/fastFoods/20')
        .set('Accept', 'application/json')
        .set({ authorization: `${isAuth}`, user: `${id}` })
        .send(testData.foodItemUpdate)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.msg).to.equal('food item does not exist');
          done();
        });
    });

    it('The admin should not be able to update a food item that does not exists', (done) => {
      const { isAuth, id } = testData.adminUserAuth;
      request(app)
        .put('/api/v1/fastFoods/9')
        .set('Accept', 'application/json')
        .set({ authorization: `${isAuth}`, user: `${id}` })
        .send(testData.foodItemThatDoesNotExistUpdate)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.msg).to.equal('food item does not exist');
          done();
        });
    });

    it('The admin should not be able to update a food item without a price', (done) => {
      const { isAuth, id } = testData.adminUserAuth;
      request(app)
        .put('/api/v1/fastFoods/5')
        .set('Accept', 'application/json')
        .set({ authorization: `${isAuth}`, user: `${id}` })
        .send(testData.foodItemWithoutPrice)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('The admin should not be able to update a food item without a description', (done) => {
      const { isAuth, id } = testData.adminUserAuth;
      request(app)
        .put('/api/v1/fastFoods/5')
        .set('Accept', 'application/json')
        .set({ authorization: `${isAuth}`, user: `${id}` })
        .send(testData.foodItemUpdateWithoutDescription)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('The admin should not be able to update a food item without a deliveryTime', (done) => {
      const { isAuth, id } = testData.adminUserAuth;
      request(app)
        .put('/api/v1/fastFoods/5')
        .set('Accept', 'application/json')
        .set({ authorization: `${isAuth}`, user: `${id}` })
        .send(testData.foodItemUpdateWithoutExpectedDeliveryTime)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('The admin should be able to update a food name', (done) => {
      const { isAuth, id } = testData.adminUserAuth;
      request(app)
        .put('/api/v1/fastFood/3')
        .set('Accept', 'application/json')
        .set({ authorization: `${isAuth}`, user: `${id}` })
        .send(testData.foodNameUpdate)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.msg).to.equal('food modified successfully');
          done();
        });
    });

    it('The admin should not be able to update a food without a name', (done) => {
      const { isAuth, id } = testData.adminUserAuth;
      request(app)
        .put('/api/v1/fastFood/3')
        .set('Accept', 'application/json')
        .set({ authorization: `${isAuth}`, user: `${id}` })
        .send(testData.foodUpdateWithoutName)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('The admin should be able to delete a food and its item', (done) => {
      const { isAuth, id } = testData.adminUserAuth;
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
      const { isAuth, id } = testData.adminUserAuth;
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