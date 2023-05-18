import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/TeamsModel';
import { allTeamsResponseMock, leaderboardAll, leaderboardAway, leaderboardHome } from './Mocks/leaderboard.mock.test';

chai.use(chaiHttp);

const { expect } = chai;

describe('leaderboard tests', () => {
  afterEach(function () {
    sinon.restore();
  });

  it('return leaderboard home infos', async () => {
    sinon.stub(Teams, 'findAll').resolves(allTeamsResponseMock);
    const response = await chai.request(app).get('/leaderboard/home');
    
    expect(response.status).to.be.equals(200);
    expect(response.body).to.deep.equal(leaderboardHome);
  });

  it('return leaderboard away infos', async () => {
    sinon.stub(Teams, 'findAll').resolves(allTeamsResponseMock);
    const response = await chai.request(app).get('/leaderboard/away');

    expect(response.status).to.be.equals(200);
    expect(response.body).to.deep.equal(leaderboardAway);
  });

  it('return leaderboard all infos', async () => {
    sinon.stub(Teams, 'findAll').resolves(allTeamsResponseMock);
    const response = await chai.request(app).get('/leaderboard/');

    expect(response.status).to.be.equals(200);
    expect(response.body).to.deep.equal(leaderboardAll);
  });

});
