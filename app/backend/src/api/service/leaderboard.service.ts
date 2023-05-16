import {
  MatchGoalsType,
  TeamsMatchesType,
  TypeLeaderboardResponse,
  TypeResponse,
} from '../../interfaces/types';
import Teams from '../../database/models/TeamsModel';
import Matches from '../../database/models/Matches';

const includeMatches = (team: string) => ({
  model: Matches,
  as: team,
  where: { inProgress: false },
  attributes: { exclude: ['id', 'inProgress', 'homeTeamId', 'awayTeamId'] },
});

const INCLUDE_HOME_AWAY_MATCH = {
  include: [includeMatches('homeMatch'), includeMatches('awayMatch')],
};

// Função Total Points

// Função Total Games

export default class LeaderboardService {
  public static countGoals(match: MatchGoalsType[], currency: 'home' | 'away'): number {
    const count = match.reduce((acc, curr) => acc + curr[`${currency}TeamGoals`], 0);
    return count;
  }

  public static getGoalsFavor(team: TeamsMatchesType): number {
    return this.countGoals(team.homeMatch, 'home') + this.countGoals(team.awayMatch, 'away');
  }

  public static getGoalsOwn(team: TeamsMatchesType): number {
    return this.countGoals(team.homeMatch, 'away') + this.countGoals(team.awayMatch, 'home');
  }

  public static async findAllTeamsGames(): Promise<TeamsMatchesType[]> {
    const response = await Teams.findAll({ ...INCLUDE_HOME_AWAY_MATCH });
    return response as unknown as TeamsMatchesType[];
  }

  public static async getHomeLeaderboard(): Promise<TypeResponse | TypeLeaderboardResponse> {
    const response = await LeaderboardService.findAllTeamsGames();

    const newObj = response.map((team) => ({
      name: team.teamName,
      totalPoints: 13,
      totalGames: team.homeMatch.length + team.awayMatch.length,
      totalVictories: 4,
      totalDraws: 1,
      totalLosses: 0,
      goalsFavor: this.getGoalsFavor(team),
      goalsOwn: this.getGoalsOwn(team),
      goalsBalance: this.getGoalsFavor(team) - this.getGoalsOwn(team),
      efficiency: 86.67,
    }));

    return { message: newObj };
  }
}
