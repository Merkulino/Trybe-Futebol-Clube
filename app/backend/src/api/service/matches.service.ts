// import bcrypt = require('bcryptjs');
// import jwt = require('jsonwebtoken');
import { TypeMatchesResponse, TypeResponse } from '../../interfaces/types';
import Matches from '../../database/models/Matches';
import Teams from '../../database/models/TeamsModel';

const ERROR_SERVER_MESSAGE = 'An error occurred on the server';

const includeTeam = (team: string) => ({
  model: Teams,
  as: team,
  required: true,
  attributes: { exclude: ['id'] },
});

const INCLUDE_HOME_AWAY_TEAM = { include: [includeTeam('homeTeam'), includeTeam('awayTeam')] };

type homeAwayGoalsType = {
  homeTeamGoals: number,
  awayTeamGoals: number,
};

export default class MatchesService {
  public static async allMatches(): Promise<TypeMatchesResponse | TypeResponse> {
    const matches = await Matches.findAll(INCLUDE_HOME_AWAY_TEAM);

    if (!matches) return { type: 500, message: ERROR_SERVER_MESSAGE };

    return { message: matches };
  }

  public static async matchByProgress(progress: boolean):
  Promise<TypeResponse | TypeMatchesResponse> {
    const matches = await Matches.findAll({
      ...INCLUDE_HOME_AWAY_TEAM,
      where: { inProgress: progress },
    });

    if (!matches) return { type: 500, message: 'some ersror sei la' };

    return { message: matches };
  }

  public static async matchById(id: number):
  Promise<TypeResponse | TypeMatchesResponse> {
    const matches = await Matches.findByPk(id, INCLUDE_HOME_AWAY_TEAM);
    if (!matches) return { type: 500, message: ERROR_SERVER_MESSAGE };
    return { message: matches };
  }

  public static async endMatch(id: number):
  Promise<TypeResponse | TypeMatchesResponse> { // Funcionalidade Extra: Switch value true/false
    const matches = await Matches.update({ inProgress: false }, { where: { id } });
    if (!matches) return { type: 500, message: ERROR_SERVER_MESSAGE };
    return { message: 'Finished' };
  }

  public static async updateMatchGoals(id: number, goalsData: homeAwayGoalsType):
  Promise<TypeResponse | TypeMatchesResponse> {
    const matches = await Matches.update({
      homeTeamGoals: goalsData.homeTeamGoals,
      awayTeamGoals: goalsData.awayTeamGoals,
    }, { where: { id } });

    if (!matches) return { type: 500, message: ERROR_SERVER_MESSAGE };

    return { message: 'Match updated!' };
  }
}
