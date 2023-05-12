import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/Matches';
import { allMatches, matchesInProgressMock } from './Mocks/matches.mock.test';

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
  
  
});
