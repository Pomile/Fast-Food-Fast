import chai from 'chai';
import request from 'supertest';
import app from '../server';
import testData from './testData';
import db from '../src/model';

const { pgConnection } = db;

const expect = chai.expect;


describe('FastFood API', () => {
  it('A user should be able to add a list of food category', (done) => {
    const { isAuth, token } = testData.adminUserAuth;
    request(app)
      .post('/api/v1/fastFood-categories')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .send(testData.foodCategories)
      .end((err, res) => {
        if (!err) {
          expect(res.status).to.equal(201);
          expect(res.body.msg).to.equal('foodcategories added successfully');
          done();
        }
      });
  });

  it('A user should be able to get a list of fast food categories', (done) => {
    const { isAuth, token } = testData.userAuth;
    request(app)
      .get('/api/v1/fastFoodCategories')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .end((err, res) => {
        // const { data } = res.body;
        if (!err) {
          expect(res.status).to.equal(200);
          // expect(data.length).to.equal(5);
          done();
        }
      });
  });

  it('A user should not be able to get a list of fast food categories with invalid token', (done) => {
    const { isAuth, token } = testData.userAuthWithInvalidToken;
    request(app)
      .get('/api/v1/fastFoodCategories')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .end((err, res) => {
        if (!err) {
          console.log(res.body);
          expect(res.status).to.equal(401);
          done();
        }
      });
  });

  it('The admin user should be able to add bulk fastFoods', (done) => {
    const { isAuth, token } = testData.adminUserAuth;
    request(app)
      .post('/api/v1/bulk-fastFoods')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .send(testData.foods)
      .end((err, res) => {
        if (!err) {
          expect(res.status).to.equal(201);
          expect(res.body.msg).to.equal('foods added successfully');
          done();
        }
      });
  });

  it('The admin user should be able to add bulk fastFood Variants', (done) => {
    const { isAuth, token } = testData.adminUserAuth;
    request(app)
      .post('/api/v1/bulk-fastFoodVariants')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .send(testData.foodVariants)
      .end((err, res) => {
        if (!err) {
          expect(res.status).to.equal(201);
          expect(res.body.msg).to.equal('food variants added successfully');
          done();
        }
      });
  });

  it('A user should be able to get a list of fast food items', (done) => {
    const { isAuth, token } = testData.userAuth;
    request(app)
      .get('/api/v1/fastFoods')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .end((err, res) => {
        const { data } = res.body;
        if (!err) {
          expect(res.status).to.equal(200);
          expect(data.length).to.equal(5);
          done();
        }
      });
  });

  it('A user should be able to get a list of fast food items with limit', (done) => {
    const { isAuth, token } = testData.userAuth;
    request(app)
      .get('/api/v1/fastFoods?limit=2&offset=0')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .end((err, res) => {
        const { data } = res.body;
        if (!err) {
          expect(res.status).to.equal(200);
          expect(data.length).to.equal(2);
          done();
        }
      });
  });

  it('A user should not be able to get a list of fast food items with invalid query parameter', (done) => {
    const { isAuth, token } = testData.userAuth;
    request(app)
      .get('/api/v1/fastFoods?limit=hghdgdg&offset=0')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .end((err, res) => {
        if (!err) {
          expect(res.status).to.equal(400);
          expect(res.body.msg).to.equal('invalid input, limit and offset must be an integer');
          done();
        }
      });
  });
  it('A user should be able to get a fast food item', (done) => {
    const { isAuth, token } = testData.userAuth;
    request(app)
      .get('/api/v1/fastFoods/1')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .end((err, res) => {
        if (!err) {
          expect(res.status).to.equal(200);
          // expect(foodItem.description).to.equal('Shawamma with 1 hotdog');
          done();
        }
      });
  });

  it('A user should be able to get a fast food item by name', (done) => {
    const { isAuth, token } = testData.userAuth;
    request(app)
      .get('/api/v1/fastFoods?search=Chicken and chips')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .end((err, res) => {
        if (!err) {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          done();
        }
      });
  });
  it('A user should be able to get a list of fast food', (done) => {
    const { isAuth, token } = testData.adminUserAuth;
    request(app)
      .get('/api/v1/fastFoods')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .end((err, res) => {
        const { data } = res.body;
        if (!err) {
          expect(res.status).to.equal(200);
          expect(data.length).to.equal(5);
          done();
        }
      });
  });

  it('A user should be able to get a list of fast food by category', (done) => {
    const { isAuth, token } = testData.adminUserAuth;
    request(app)
      .get('/api/v1/fastFoods/categories/2')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .end((err, res) => {
        const { data } = res.body;
        if (!err) {
          expect(res.status).to.equal(200);
          expect(data.length).to.equal(3);
          done();
        }
      });
  });
  it('A user should not be able to get a fast food item with invalid id', (done) => {
    const { isAuth, token } = testData.userAuth;
    request(app)
      .get('/api/v1/fastFoods/gffgff')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .end((err, res) => {
        if (!err) {
          expect(res.status).to.equal(400);
          expect(res.body.msg).to.equal('invalid parameter id. id must be an integer');
          done();
        }
      });
  });
  it('A user should not be able to get a fast food item that does not exist', (done) => {
    const { isAuth, token } = testData.userAuth;
    request(app)
      .get('/api/v1/fastFoods/20')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .end((err, res) => {
        if (!err) {
          expect(res.status).to.equal(404);
          expect(res.body.msg).to.equal('food variants not found');
          done();
        }
      });
  });
  it('A user should not be able to get fast food item(s) if not authenticated', (done) => {
    request(app)
      .get('/api/v1/fastFoods/1')
      .set('Accept', 'application/json')
      .set({ isAuth: `${false}` })
      .end((err, res) => {
        if (!err) {
          expect(res.status).to.equal(401);
          expect(res.body.msg).to.equal('user is not authenticated');
          done();
        }
      });
  });
  it('A user should not be able to add a food item', (done) => {
    const { isAuth, token } = testData.userAuth;
    request(app)
      .post('/api/v1/fastFoods')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .send(testData.foodItem)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        done();
      });
  });
  it('The admin should be able to add a food category', (done) => {
    const { isAuth, token } = testData.adminUserAuth;
    request(app)
      .post('/api/v1/fastFoodsCategories')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .send({ foodCategoryName: 'Junks' })
      .end((err, res) => {
        console.log(res.body);
        expect(res.status).to.equal(201);
        expect(res.body.success).to.equal(true);
        done();
      });
  });

  it('The admin should be able to add a food item', (done) => {
    const { isAuth, token } = testData.adminUserAuth;
    request(app)
      .post('/api/v1/fastFoods')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .send(testData.foodItem)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.success).to.equal(true);
        expect(res.body.data.id).to.equal(5);
        done();
      });
  });

  it('The admin should be able to add a food category, food name, and food item, if anyone of them does not exist', (done) => {
    const { isAuth, token } = testData.adminUserAuth;
    request(app)
      .post('/api/v1/fastFoods')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .send(testData.foodCategoryNameItem)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.success).to.equal(true);
        expect(res.body.data.id).to.equal(6);
        done();
      });
  });
  it('The admin should not be able to add a food category that already exist', (done) => {
    const { isAuth, token } = testData.adminUserAuth;
    request(app)
      .post('/api/v1/fastFoodsCategories')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .send({ foodCategoryName: 'Junks' })
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.success).to.equal(false);
        done();
      });
  });
  it('The admin should not be able to add a food item that already exists', (done) => {
    const { isAuth, token } = testData.adminUserAuth;
    request(app)
      .post('/api/v1/fastFoods')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .send(testData.foodCategoryNameItem)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.success).to.equal(false);
        done();
      });
  });

  it('The admin should not be able to add a food item without food name', (done) => {
    const { isAuth, token } = testData.adminUserAuth;
    request(app)
      .post('/api/v1/fastFoods')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .send(testData.foodItemWithoutName)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('The admin should not be able to add a food item with invalid price', (done) => {
    const { isAuth, token } = testData.adminUserAuth;
    request(app)
      .post('/api/v1/fastFoods')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .send(testData.foodItemWithInvalidprice)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('The admin should not be able to add a food item without quantity', (done) => {
    const { isAuth, token } = testData.adminUserAuth;
    request(app)
      .post('/api/v1/fastFoods')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .send(testData.foodItemWithoutQuantity)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('The admin should not be able to add a food item without a description', (done) => {
    const { isAuth, token } = testData.adminUserAuth;
    request(app)
      .post('/api/v1/fastFoods')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .send(testData.foodItemWithoutDescription)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('The admin should be able to update a fast food', (done) => {
    const { isAuth, token } = testData.adminUserAuth;
    request(app)
      .put('/api/v1/fastFoods/5')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .field('name', testData.foodUpdate.name)
      .attach('image', `${__dirname}/images/o.jpg`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.msg).to.equal('food updated successfully');
        done();
      });
  });

  it('The admin should not be able to update a fast food with invalid image format', (done) => {
    const { isAuth, token } = testData.adminUserAuth;
    request(app)
      .put('/api/v1/fastFoods/5')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .field('name', testData.foodUpdate.name)
      .attach('image', `${__dirname}/images/o.gif`)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('invalid input, image must be either jpg or png');
        done();
      });
  });

  it('The admin should not be able to update a fast food with invalid request id', (done) => {
    const { isAuth, token } = testData.adminUserAuth;
    request(app)
      .put('/api/v1/fastFoods/food')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .field('name', testData.foodUpdate.name)
      .attach('image', `${__dirname}/images/o.jpg`)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('The admin should not be able to update a fast food that does not exist', (done) => {
    const { isAuth, token } = testData.adminUserAuth;
    request(app)
      .put('/api/v1/fastFoods/20')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .field('name', testData.foodUpdate.name)
      .attach('image', `${__dirname}/images/o.jpg`)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.msg).to.equal('fast food not found');
        done();
      });
  });

  it('The admin should not be able to update a fast food variant without a price', (done) => {
    const { isAuth, token } = testData.adminUserAuth;
    request(app)
      .put('/api/v1/fastFoods/variants/5')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .send(testData.foodItemWithoutPrice)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('The admin should not be able to update a fast food variant without a description', (done) => {
    const { isAuth, token } = testData.adminUserAuth;
    request(app)
      .put('/api/v1/fastFoods/variants/5')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .send(testData.foodItemUpdateWithoutDescription)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('The admin should not be able to update a fast food variant without a deliveryTime', (done) => {
    const { isAuth, token } = testData.adminUserAuth;
    request(app)
      .put('/api/v1/fastFoods/variants/5')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .send(testData.foodItemUpdateWithoutExpectedDeliveryTime)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('The admin should be able to update a food variant', (done) => {
    const { isAuth, token } = testData.adminUserAuth;
    request(app)
      .put('/api/v1/fastFoods/variants/6')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .send(testData.foodVariantUpdate)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data.id).to.equal(6);
        expect(res.body.msg).to.equal('food variant updated successfully');
        done();
      });
  });

  it('The admin should not be able to update a food variant that does not exist', (done) => {
    const { isAuth, token } = testData.adminUserAuth;
    request(app)
      .put('/api/v1/fastFoods/variants/20')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .send(testData.foodVariantUpdate)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.msg).to.equal('food variant not found');
        done();
      });
  });

  it('The admin should not be able to update a fast food variant with invalid id', (done) => {
    const { isAuth, token } = testData.adminUserAuth;
    request(app)
      .put('/api/v1/fastFoods/variants/huyuyeuy')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .send(testData.foodNameUpdate)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('The admin should be able to delete a food and its item', (done) => {
    const { isAuth, token } = testData.adminUserAuth;
    request(app)
      .delete('/api/v1/fastFoods/3')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .end((err, res) => {
        expect(res.status).to.equal(204);
        done();
      });
  });

  it('The admin should be able to delete a food and its item', (done) => {
    const { isAuth, token } = testData.adminUserAuth;
    request(app)
      .delete('/api/v1/fastFoods/3')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.msg).to.equal('fast food not found');
        done();
      });
  });

  it('The admin should not be able to delete a food and its item with invalid id', (done) => {
    const { isAuth, token } = testData.adminUserAuth;
    request(app)
      .delete('/api/v1/fastFoods/yydyu')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .end((err, res) => {
        console.log(res.body);
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('The admin should be able to delete a food', (done) => {
    const { isAuth, token } = testData.adminUserAuth;
    request(app)
      .delete('/api/v1/fastFoods/variants/1')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .end((err, res) => {
        expect(res.status).to.equal(204);
        done();
      });
  });

  it('The admin should not be able to delete a food', (done) => {
    const { isAuth, token } = testData.adminUserAuth;
    request(app)
      .delete('/api/v1/fastFoods/variants/1')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.msg).to.equal('fast food not found');
        done();
      });
  });

  it('The admin should not be able to delete a food item with invalid id', (done) => {
    const { isAuth, token } = testData.adminUserAuth;
    request(app)
      .delete('/api/v1/fastFoods/unbnbn')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });
  it('A user should be able to modify a fast food category', (done) => {
    const { isAuth, token } = testData.adminUserAuth;
    request(app)
      .put('/api/v1/fastFoodCategory/7')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .send({ foodCategoryName: 'pastals' })
      .end((err, res) => {
        // const { data } = res.body;
        if (!err) {
          expect(res.status).to.equal(200);
          // expect(data.length).to.equal(5);
          done();
        }
      });
  });
  it('A user should not be able to modify a fast food category', (done) => {
    const { isAuth, token } = testData.adminUserAuth;
    request(app)
      .put('/api/v1/fastFoodCategory/17')
      .set('Accept', 'application/json')
      .set({ authorization: `${token}`, isAuth: `${isAuth}` })
      .send({ foodCategoryName: 'pastals' })
      .end((err, res) => {
        // const { data } = res.body;
        if (!err) {
          expect(res.status).to.equal(404);
          // expect(data.length).to.equal(5);
          done();
        }
      });
  });
});
