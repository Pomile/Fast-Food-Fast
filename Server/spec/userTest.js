import chai from 'chai';
import request from 'supertest';
import app from '../server';
import testData from './testData';

const expect = chai.expect;

describe('Fast-Food-Fast Test Suite', () => {
  describe('User API', () => {
    it('A user should be able to create an account', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send(testData.adminUser)
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
        .send(testData.user)
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
        .send(testData.adminUser)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body.msg).to.equal('user already exists');
          done();
        });
    });

    it('A user should not be able to create an account without firstname', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send(testData.userDataWithoutFirstname)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('A user should not be able to create an account without lastname', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send(testData.userDataWithoutLastname)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('A user should not be able to create an account with invalid email', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send(testData.userDataWithInvalidEmail)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('A user should not be able to create an account without a phone number', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send(testData.userDataWithPhoneNo)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('A user should not be able to create an account if the length of a password is below 5', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send(testData.userDataWithInvalidPasswordLength)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('A user should not be able to create an account if the password does not contain a number', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send(testData.userDataWithInvalidPassword)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('A user should not be able to create an account if password does not match', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send(testData.userDataWithWrongPassword)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('The admin user should be able to sign in', (done) => {
      request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(testData.adminUserCredentials)
        .end((err, res) => {
          testData.adminUserAuth.token = res.body.token;
          testData.adminUserAuth.isAuth = res.body.isAuth;
          expect(res.body.msg).to.equal('user logged in sucessfully');
          done();
        });
    });

    it('The admin user should be able to sign in', (done) => {
      request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(testData.userCredentials)
        .end((err, res) => {
          testData.userAuthWithInvalidToken.token = `${res.body.token}yteytyte`;
          testData.adminUserAuth.isAuth = res.body.isAuth;
          expect(res.body.msg).to.equal('user logged in sucessfully');
          done();
        });
    });

    it('A user should be able to sign in', (done) => {
      request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(testData.userCredentials)
        .end((err, res) => {
          testData.userAuth.token = res.body.token;
          testData.userAuth.isAuth = res.body.isAuth;
          expect(res.body.msg).to.equal('user logged in sucessfully');
          done();
        });
    });

    it('A user should not be able to sign in if a password is not authentic ', (done) => {
      request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(testData.adminCredentialsWithInvalidPassword)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.msg).to.equal('invalid password');
          done();
        });
    });
    it('A user should not be able to sign in if an email is incorrect', (done) => {
      request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(testData.adminUserCredentialsWithInvalidEmail)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.msg).to.equal('user not found');
          done();
        });
    });

    it('A user should be able to modify user role', (done) => {
      const { isAuth, token } = testData.adminUserAuth;
      request(app)
        .put('/api/v1/admin/assignment')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}`, isAuth: `${isAuth}` })
        .send({ email: 'user2@live.com', role: 'user' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.msg).to.equal('user role updated successfully');
          done();
        });
    });
  });
});
