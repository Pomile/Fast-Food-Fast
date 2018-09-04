import { describe, it } from 'mocha';
import chai from 'chai';
import request from 'supertest';
import app from '../server';

const expect = chai.expect;
const userAuth = {
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
  role: 'user',
};

const adminData = {
  firstname: 'admin',
  lastname: 'admin',
  email: 'admin@live.com',
  phone: '+123192928',
  password: 'adminPassword123',
  cpassword: 'adminPassword123',
  role: 'admin',
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
        .send(adminData)
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
        .send(userData)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body.msg).to.equal('user already exists');
          done();
        });
    });

    it('A user should not be able to create an account without firstname', (done) => {
      userData = {
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
        .send(userData)
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
        email: 'olusegun@gmail.com',
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

    /* it('A user should be able to get a fast food item', (done) => {
      request(app)
        .get('/api/v1/fastfoods/1')
        .set('Accept', 'application/json')
        .end((err, res) => {
          const { fastFood } = res.body;
          if (!err) {
            expect(res.status).to.equal(200);
            expect(foods.length).to.equal(1);
            done();
          }
        });
    }); */
  });
});
