import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/TeamsModel';

import { Response } from 'superagent';
import { allTeams } from './Mocks/team.mock.test';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests of teams', () => {
  afterEach(function () {
    sinon.restore();
  });

  it.only('Returns all teams', async () => {
    sinon.stub(Teams, 'findAll').resolves(allTeams);
    const responseHttp = await chai.request(app).get('/teams');

    expect(responseHttp.status).to.be.equals(200);
    expect(responseHttp).to.deep.equal(allTeams);
  });
  
  it('Returns specific team by his id', async () => {
    sinon.stub(Teams, 'findByPk').resolves(allTeams[2]);
    const responseHttp = await chai.request(app).get('/teams/3');

    expect(responseHttp.status).to.be.equals(200);
    expect(responseHttp).to.deep.equal(allTeams[2]);
  });
  
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });
});
