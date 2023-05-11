import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';
import { loginMock, tokenMock, userMock } from './Mocks/user.mock.test';

describe('a login test', () => {
  it('make a login with right values and return a token', async () => {
    sinon.stub(User, 'findOne').resolves(userMock)
    // sinon.stub(ClasseToken, 'generateToken').resolves(tokenMock)

    const response = await chai.request(app).post('/login')
    .set('Authorization', tokenMock).send({ body: loginMock});

    expect(response.status).to.be.equals(200);
    expect(response.body.token).to.be.equals(tokenMock);
  });

  it('returns an error when email is not passed', async () => {
    sinon.stub(User, 'findOne').resolves(userMock)

    // sinon.stub(ClasseToken, 'generateToken').resolves(tokenMock)

    const response = await chai.request(app).post('/login')
    .set('Authorization', tokenMock).send({ body: { password: '123' } });

    expect(response.status).to.be.equals(400);
    expect(response.body).to.be.equals({ "message": "All fields must be filled" });
  });
  
  it('returns an error when password is not passed', async () => {
    sinon.stub(User, 'findOne').resolves(userMock)

    // sinon.stub(ClasseToken, 'generateToken').resolves(tokenMock)

    const response = await chai.request(app).post('/login')
    .set('Authorization', tokenMock).send({ body: { email: 'mail@mail.com' } });

    expect(response.status).to.be.equals(400);
    expect(response.body).to.be.equals({ "message": "All fields must be filled" });
  });
  
  it('returns an error when token is not passed', async () => {
    sinon.stub(User, 'findOne').resolves(userMock)

    // sinon.stub(ClasseToken, 'generateToken').resolves(tokenMock)

    const response = await chai.request(app).post('/login').send({ body: loginMock });

    expect(response.status).to.be.equals(401);
    expect(response.body).to.be.equals({ "message": "Token not found" });
  });

  it('returns an error when password or email is invalid', async () => {
    sinon.stub(User, 'findOne').resolves()
    // sinon.stub(ClasseToken, 'generateToken').resolves(tokenMock)

    const response = await chai.request(app).post('/login')
    .set('Authorization', tokenMock).send({ body: loginMock});

    expect(response.status).to.be.equals(401);
    expect(response.body).to.be.equals({ "message": "Invalid email or password" });
  });
  
  it('returns an error when token is invalid', async () => {
    sinon.stub(User, 'findOne').resolves()
    // sinon.stub(ClasseToken, 'generateToken').resolves(tokenMock)

    const response = await chai.request(app).post('/login');

    expect(response.status).to.be.equals(401);
    expect(response.body).to.be.equals({ "message": "Token must be a valid token" });
  });
  
  it("get the rigth user 'role' ", async () => {
    sinon.stub(User, 'findByPk').resolves(userMock)
    // sinon.stub(ClasseToken, 'generateToken').resolves(tokenMock)

    const response = await chai.request(app).get('/login/role')
    .set('authorization', tokenMock);

    expect(response.status).to.be.equals(200);
    expect(response.body).to.be.deep.equal({ role: 'admin' });
  });

  afterEach(() => {
    sinon.restore();
  })
});