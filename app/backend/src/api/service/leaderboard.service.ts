import {
  LeaderboardType,
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

export default class LeaderboardService {
  private teamsMatch;
  constructor(teamsMatch: TeamStringType[] = ['home', 'away']) {
    this.teamsMatch = teamsMatch;
  }

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

  public getGoalsFavor(team: TeamsMatchesType): number {
    let counter = 0;
    if (this.teamsMatch.includes('home')) {
      counter += LeaderboardService
        .countGoals(team.homeMatch, 'home');
    }
    if (this.teamsMatch.includes('away')) {
      counter += LeaderboardService.countGoals(team.awayMatch, 'away');
    }
    return counter;
  }

  public getGoalsOwn(team: TeamsMatchesType): number {
    let counter = 0;
    if (this.teamsMatch.includes('home')) {
      counter += LeaderboardService
        .countGoals(team.homeMatch, 'away');
    }
    if (this.teamsMatch.includes('away')) {
      counter += LeaderboardService.countGoals(team.awayMatch, 'home');
    }
    return counter;
  }

  /**
   * @index 0 for get all Victories
   * @index 1 for get all Draws
   * @index 2 for get all Points
  */
  private mapDataPointsResults(team: TeamsMatchesType, index: number): number {
    let counter = 0;
    if (this.teamsMatch.includes('home')) {
      counter += LeaderboardService
        .countMatchesResult(team.homeMatch, 'home', 'away')[index];
    }
    if (this.teamsMatch.includes('away')) {
      counter += LeaderboardService.countMatchesResult(team.awayMatch, 'away', 'home')[index];
    }
    return counter;
  }

  public getLosses(team: TeamsMatchesType): number {
    let counter = 0;
    if (this.teamsMatch.includes('home')) {
      counter += LeaderboardService
        .countMatchesResult(team.homeMatch, 'away', 'home')[0];
    }
    if (this.teamsMatch.includes('away')) {
      counter += LeaderboardService.countMatchesResult(team.awayMatch, 'home', 'away')[0];
    }
    return counter;
  }

  public countGames(team: TeamsMatchesType): number {
    let counter = 0;
    if (this.teamsMatch.includes('home')) counter += team.homeMatch.length;
    if (this.teamsMatch.includes('away')) counter += team.awayMatch.length;
    return counter;
  }

  public getEfficencyTeam(team: TeamsMatchesType): number {
    const efficiencyNumber = (
      (this.mapDataPointsResults(team, 2)
        / ((this.countGames(team)) * 3)
      ) * 100);
    return Number((Math.round(efficiencyNumber * 100) / 100).toFixed(2));
  }

  public static sortTeams(teams: LeaderboardType[]): LeaderboardType[] {
    return teams.sort((a, b) => { // Feio Tenta refatorar
      if (a.totalPoints !== b.totalPoints) {
        return b.totalPoints - a.totalPoints;
      } if (a.totalVictories !== b.totalVictories) {
        return b.totalVictories - a.totalVictories;
      } if (a.goalsBalance !== b.goalsBalance) {
        return b.goalsBalance - a.goalsBalance;
      }
      return b.goalsFavor - a.goalsFavor;
    });
  }

  public static async findAllTeamsGames(): Promise<TeamsMatchesType[]> {
    const response = await Teams.findAll({ ...INCLUDE_HOME_AWAY_MATCH });
    return response as unknown as TeamsMatchesType[];
  }

  public async getHomeLeaderboard(): Promise<TypeResponse | TypeLeaderboardResponse> {
    const response = await LeaderboardService.findAllTeamsGames();

    const newObj = response.map((team) => ({
      name: team.teamName,
      totalPoints: this.mapDataPointsResults(team, 2),
      totalGames: this.countGames(team),
      totalVictories: this.mapDataPointsResults(team, 0),
      totalDraws: this.mapDataPointsResults(team, 1),
      totalLosses: this.getLosses(team),
      goalsFavor: this.getGoalsFavor(team),
      goalsOwn: this.getGoalsOwn(team),
      goalsBalance: this.getGoalsFavor(team) - this.getGoalsOwn(team),
      efficiency: this.getEfficencyTeam(team),
    }));

    const teamsSorted = LeaderboardService.sortTeams(newObj);

    return { message: teamsSorted };
  }
}
