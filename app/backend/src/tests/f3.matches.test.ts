import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/Matches';
import { allMatches, matchesInProgressMock, responseNewMatchMock } from './Mocks/matches.mock.test';
import { tokenMock, userMock } from './Mocks/user.mock.test';
import TeamsService from '../api/service/teams.service';
import Teams from '../database/models/TeamsModel';
import { allTeams } from './Mocks/team.mock.test';

chai.use(chaiHttp);

const { expect } = chai;

describe('matches tests', () => {
  afterEach(function () {
    sinon.restore();
  });

  it('Returns all matches', async () => {
    sinon.stub(Matches, 'findAll').resolves(allMatches);
    const responseHttp = await chai.request(app).get('/matches');

    expect(responseHttp.status).to.be.equals(200);
    expect(responseHttp.body).to.deep.equal(allMatches);
  });
  
  it('Returns specific match by his id', async () => {
    sinon.stub(Matches, 'findByPk').resolves(allMatches[1]);
    const responseHttp = await chai.request(app).get('/matches/2');

    expect(responseHttp.status).to.be.equals(200);
    expect(responseHttp.body).to.deep.equal(allMatches[1]);
  });
 
  it('Filter matches in progress', async () => {
    sinon.stub(Matches, 'findAll').resolves(matchesInProgressMock);
    const responseHttp = await chai
    .request(app)
    .get('/matches/')
    .set({'inProgress': true});

    expect(responseHttp.status).to.be.equals(200);
    expect(responseHttp.body).to.deep.equal(matchesInProgressMock);
  });
  
  it('can be possible finish one match', async () => { 
    sinon.stub(Matches, 'update').resolves([1]);
    sinon.stub(jwt, 'verify').resolves(userMock);

    const responseHttp = await chai
    .request(app)
    .patch('/matches/3/finish')
    .set('Authorization', tokenMock);

    expect(responseHttp.status).to.be.equals(200);
    expect(responseHttp.body).to.deep.equal({ "message": "Finished" });
  });
  
  it('update one match information', async () => { 
    sinon.stub(Matches, 'update').resolves([1]);
    sinon.stub(jwt, 'verify').resolves(userMock);

    const responseHttp = await chai
    .request(app)
    .patch('/matches/1')
    .set('Authorization', tokenMock)
    .send({
      "homeTeamGoals": 3,
      "awayTeamGoals": 1
    });

    expect(responseHttp.status).to.be.equals(200);
  });
  
  it('add new match in progress', async () => { 
    sinon.stub(Teams, 'findAll').resolves(allTeams);
    sinon.stub(Matches, 'create').resolves(responseNewMatchMock);
    sinon.stub(Matches, 'findByPk').resolves(responseNewMatchMock);
    sinon.stub(jwt, 'verify').resolves(userMock);

    const responseHttp = await chai
    .request(app)
    .post('/matches/')
    .set('Authorization', tokenMock)
    .send({
      "homeTeamId": 3, 
      "awayTeamId": 1, 
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
    });

    expect(responseHttp.status).to.be.equals(201);
    expect(responseHttp.body).to.deep.equal({
      "id": 5,
      "homeTeamId": 3,
      "homeTeamGoals": 2,
      "awayTeamId": 1,
      "awayTeamGoals": 2,
      "inProgress": true,
    });
  });

  it('is not possible add two equal teams on one match', async () => { 
    sinon.stub(Teams, 'findAll').resolves(allTeams);
    sinon.stub(jwt, 'verify').resolves(userMock);

    const responseHttp = await chai
    .request(app)
    .post('/matches/')
    .set('Authorization', tokenMock)
    .send({
      "homeTeamId": 1, 
      "awayTeamId": 1, 
      "homeTeamGoals": 0,
      "awayTeamGoals": 0,
    });

    expect(responseHttp.status).to.be.equals(422);
    expect(responseHttp.body).to.deep.equal({ "message": "It is not possible to create a match with two equal teams" });
  });
  
  it('is not possible add a team that doesnt exist on database', async () => { 
    sinon.stub(Teams, 'findByPk').resolves();
    sinon.stub(jwt, 'verify').resolves(userMock);

    const responseHttp = await chai
    .request(app)
    .post('/matches/')
    .set('Authorization', tokenMock)
    .send({
      "homeTeamId": 99999, 
      "awayTeamId": 1, 
      "homeTeamGoals": 0,
      "awayTeamGoals": 0,
    });

    expect(responseHttp.status).to.be.equals(404);
    expect(responseHttp.body).to.deep.equal({ "message": "There is no team with such id!" }
    );
  });

  describe('Token validation', () => {
    it('returns an error when token is not passed', async () => {
      const responseHttp = await chai
      .request(app)
      .patch('/matches/3/finish');
  
      expect(responseHttp.status).to.be.equals(401);
      expect(responseHttp.body).to.deep.equal({ message: "Token not found" });
    });

    it('returns an error when token is invalid', async () => {
      const responseHttp = await chai
      .request(app)
      .patch('/matches/3/finish')
      .set('Authorization', 'wrongToken');
  
      expect(responseHttp.status).to.be.equals(401);
      expect(responseHttp.body).to.deep.equal({ "message": "Token must be a valid token" });
    });
  })

});
