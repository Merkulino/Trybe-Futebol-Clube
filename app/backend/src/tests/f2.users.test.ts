import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

const { expect } = chai;

import { app } from '../app';
import User from '../database/models/User';
import { loginMock , tokenMock, userMock } from './Mocks/user.mock.test';
import UserService from '../api/service/user.service';
import { validateTokenMiddleware } from '../api/middleware/validateInputs';

const { email, password }=  loginMock;

describe('a login test', () => {
  beforeEach(() => {
    sinon.stub(User, 'findAll').resolves([userMock])
    sinon.stub(User, 'findOne').resolves(userMock)
    sinon.stub(UserService, 'getByEmailAndPassword').resolves({ message: tokenMock });
  })
  it('make a login with right values and return a token', async () => {
    const response = await chai.request(app).post('/login').send({email, password});

    expect(response.status).to.be.equals(200);
    expect(response.body.token).to.be.equals(tokenMock);
  });

  it('returns an error when email is not passed', async () => {
    const response = await chai.request(app).post('/login').send({password});

    expect(response.status).to.be.equals(400);
    expect(response.body).to.deep.equal({ message: "All fields must be filled" });
  });

  it('returns an error when password is not passed', async () => {
    const response = await chai.request(app).post('/login').send({email});

    expect(response.status).to.be.equals(400);
    expect(response.body).to.deep.equals({ message: "All fields must be filled" });
  });

  it('returns an error when token is not passed', async () => {
    const response = await chai.request(app).get('/login/role')
    .send({ email, password });

    expect(response.status).to.be.equals(401);
    expect(response.body).to.deep.equal({ message: "Token not found" });
  });

  it('returns an error when password or email is invalid', async () => {
    const response = await chai.request(app).post('/login').send({email: 'errado', password: 'ss'});

    expect(response.status).to.be.equals(401);
    expect(response.body).to.deep.equal({ "message": "Invalid email or password" });
  });

  it('returns an error when token is invalid', async () => {
    const response = await chai.request(app).get('/login/role')
    .send({ email, password })
    .set('Authorization', tokenMock);

    expect(response.status).to.be.equals(401);
    expect(response.body).to.deep.equal({ "message": "Token must be a valid token" });
  });

  it("get the rigth user 'role' ", async () => {
    sinon.stub(jwt, 'verify').resolves(userMock);

    const response = await chai.request(app).get('/login/role')
    .send({ email, password })
    .set('Authorization', tokenMock);

    expect(response.status).to.be.equals(200);
    expect(response.body).to.be.deep.equal({ role: 'admin' });
  });

  afterEach(() => {
    sinon.restore();
  })
});