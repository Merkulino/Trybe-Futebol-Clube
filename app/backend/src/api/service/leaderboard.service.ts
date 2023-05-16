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

type TeamStringType = 'home' | 'away';

// Função Total Points

// Função Total Games

export default class LeaderboardService {
  public static countGoals(match: MatchGoalsType[], currency: TeamStringType): number {
    const count = match.reduce((acc, curr) => acc + curr[`${currency}TeamGoals`], 0);
    return count;
  }

  public static countMatchesResult(
    match: MatchGoalsType[],
    team1: TeamStringType,
    team2: TeamStringType,
  ): number[] {
    let drawMatch = 0;
    let teamPoints = 0;
    const count = match.reduce((acc, curr) => {
      if (curr[`${team1}TeamGoals`] > curr[`${team2}TeamGoals`]) {
        teamPoints += 3;
        return acc + 1;
      }
      if (curr[`${team1}TeamGoals`] === curr[`${team2}TeamGoals`]) drawMatch += 1;
      return acc + 0;
    }, 0);
    teamPoints += drawMatch;
    return [count, drawMatch, teamPoints];
  }

  public static getGoalsFavor(team: TeamsMatchesType): number {
    return this.countGoals(team.homeMatch, 'home') + this.countGoals(team.awayMatch, 'away');
  }

  public static getGoalsOwn(team: TeamsMatchesType): number {
    return this.countGoals(team.homeMatch, 'away') + this.countGoals(team.awayMatch, 'home');
  }

  /**
   * @index 0 for get all Victories
   * @index 1 for get all Draws
   * @index 2 for get all Points
  */
  private static mapDataPointsResults(team: TeamsMatchesType, index: number): number {
    return this.countMatchesResult(team.homeMatch, 'home', 'away')[index]
      + this.countMatchesResult(team.awayMatch, 'away', 'home')[index];
  }

  public static getLosses(team: TeamsMatchesType): number {
    return this.countMatchesResult(team.homeMatch, 'away', 'home')[0]
      + this.countMatchesResult(team.awayMatch, 'home', 'away')[0];
  }

  public static getEfficencyTeam(team: TeamsMatchesType): number {
    const efficiencyNumber = (
      (this.mapDataPointsResults(team, 2)
        / ((team.homeMatch.length + team.awayMatch.length) * 3)
      ) * 100);
    return Number((Math.round(efficiencyNumber * 100) / 100).toFixed(2));
  }

  public static async findAllTeamsGames(): Promise<TeamsMatchesType[]> {
    const response = await Teams.findAll({ ...INCLUDE_HOME_AWAY_MATCH });
    return response as unknown as TeamsMatchesType[];
  }

  public static async getHomeLeaderboard(): Promise<TypeResponse | TypeLeaderboardResponse> {
    const response = await LeaderboardService.findAllTeamsGames();

    const newObj = response.map((team) => ({
      name: team.teamName,
      totalPoints: this.mapDataPointsResults(team, 2),
      totalGames: team.homeMatch.length + team.awayMatch.length,
      totalVictories: this.mapDataPointsResults(team, 0),
      totalDraws: this.mapDataPointsResults(team, 1),
      totalLosses: this.getLosses(team),
      goalsFavor: this.getGoalsFavor(team),
      goalsOwn: this.getGoalsOwn(team),
      goalsBalance: this.getGoalsFavor(team) - this.getGoalsOwn(team),
      efficiency: this.getEfficencyTeam(team),
    }));

    return { message: newObj };
  }
}
