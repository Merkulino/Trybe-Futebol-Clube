import { TypeLeaderboardResponse, TypeResponse } from '../../interfaces/types';
import Teams from '../../database/models/TeamsModel';
import Matches from '../../database/models/Matches';

const includeTeam = (team: string) => ({
  model: Teams,
  as: team,
  required: true,
  attributes: { exclude: ['id'] },
});

// const INCLUDE_HOME_AWAY_TEAM = { include: [includeTeam('homeTeam'), includeTeam('awayTeam')] };

const INCLUDE_HOME_TEAM = { include: [includeTeam('homeTeam')] };

// const INCLUDE_AWAY_TEAM = { include: [includeTeam('awayTeam')] };

export default class LeaderboardService {
  public static async getHomeLeaderboard(): Promise<TypeResponse | TypeLeaderboardResponse> {
    const response = await Matches.findAll({
      ...INCLUDE_HOME_TEAM,
      where: { inProgress: false },
      attributes: { exclude: ['inProgress'] },
      order: ['home_team_id'],
    });
    if (!response) return { type: 500, message: 'Was not possible to get role' };

    const newObj = response.map(({ dataValues: dV }) => ({
      name: dV.homeTeam.teamName,
      totalPoints: 13,
      totalGames: 5,
      totalVictories: 4,
      totalDraws: 1,
      totalLosses: 0,
      goalsFavor: 17,
      // goalsOwn = 5,
      // goalsBalance = 12,
      // efficiency = 86.67,
    }));

    return { message: newObj };
  }
}
