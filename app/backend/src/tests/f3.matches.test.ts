import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/Matches';
import { allMatches, matchesInProgressMock } from './Mocks/matches.mock.test';
import { tokenMock, userMock } from './Mocks/user.mock.test';

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
    sinon.stub(jwt, 'verify').resolves(userMock);

    const responseHttp = await chai
    .request(app)
    .patch('/matches/3/finish')
    .set('Authorization', tokenMock);

    expect(responseHttp.status).to.be.equals(200);
    expect(responseHttp.body).to.deep.equal({ "message": "Finished" });
  });
  
  it('update one match information', async () => { 
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
    sinon.stub(jwt, 'verify').resolves(userMock);

    const responseHttp = await chai
    .request(app)
    .post('/matches/')
    .set('Authorization', tokenMock)
    .send({
      "homeTeamId": 16, // O valor deve ser o id do time
      "awayTeamId": 8, // O valor deve ser o id do time
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
    });

    expect(responseHttp.status).to.be.equals(201);
    expect(responseHttp.body).to.deep.equal({
      "id": 1,
      "homeTeamId": 16,
      "homeTeamGoals": 2,
      "awayTeamId": 8,
      "awayTeamGoals": 2,
      "inProgress": true,
    });
  });

  it('is not possible add two equal teams on one match', async () => { 
    sinon.stub(jwt, 'verify').resolves(userMock);

    const responseHttp = await chai
    .request(app)
    .post('/matches/')
    .set('Authorization', tokenMock)
    .send({
      "homeTeamId": 1, // O valor deve ser o id do time
      "awayTeamId": 1, // O valor deve ser o id do time
      "homeTeamGoals": 0,
      "awayTeamGoals": 0,
    });

    expect(responseHttp.status).to.be.equals(422);
    expect(responseHttp.body).to.deep.equal({ "message": "It is not possible to create a match with two equal teams" });
  });
  
  it('is not possible add a team that doesnt exist on database', async () => { 
    sinon.stub(jwt, 'verify').resolves(userMock);

    const responseHttp = await chai
    .request(app)
    .post('/matches/')
    .set('Authorization', tokenMock)
    .send({
      "homeTeamId": 99999, // O valor deve ser o id do time
      "awayTeamId": 1, // O valor deve ser o id do time
      "homeTeamGoals": 0,
      "awayTeamGoals": 0,
    });

    expect(responseHttp.status).to.be.equals(422);
    expect(responseHttp.body).to.deep.equal({ "message": "There is no team with such id!" }
    );
  });

});
