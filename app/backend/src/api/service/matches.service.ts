// import bcrypt = require('bcryptjs');
// import jwt = require('jsonwebtoken');
import { TypeMatchesResponse, TypeResponse } from '../../interfaces/types';
import Matches from '../../database/models/matches';
import Teams from '../../database/models/TeamsModel';

const includeTeam = (team: string) => ({
  model: Teams,
  as: team,
  required: true,
  attributes: { exclude: ['id'] },
});

const INCLUDE_HOME_AWAY_TEAM = { include: [includeTeam('homeTeam'), includeTeam('awayTeam')] };

export default class MatchesService {
  public static async allMatches():Promise<TypeMatchesResponse | TypeResponse> {
    const matches = await Matches.findAll(INCLUDE_HOME_AWAY_TEAM);

    if (!matches) return { type: 500, message: 'some error sei la' };

    return { message: matches };
  }

  public static async matchByProgress(_progress: string):
  Promise<TypeResponse | TypeMatchesResponse> {
    const matches = await Matches.findAll();

    if (!matches) return { type: 500, message: 'some ersror sei la' };

    return { message: matches };
  }

  public static async matchById(id: number):
  Promise<TypeResponse | TypeMatchesResponse> {
    const matches = await Matches.findByPk(id, INCLUDE_HOME_AWAY_TEAM);
    if (!matches) return { type: 500, message: 'some error sei la' };
    return { message: matches };
  }
}
