import Matches from '../database/models/Matches';

export type TypeResponse = {
  type?: number,
  message: string
};

export type TypeMatchesResponse = {
  type?: number,
  message: Matches[] | Matches
};

type LeaderboardType = {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,
};

export type TypeLeaderboardResponse = {
  type?: number,
  message: LeaderboardType[] | LeaderboardType
};

export type MatchGoalsType = {
  homeTeamGoals: number,
  awayTeamGoals: number,
  dataValues?: [
    homeTeamGoals: number,
    awayTeamGoals: number,
  ]
};

export type TeamsMatchesType = {
  id: number,
  teamName: string,
  homeMatch: MatchGoalsType[],
  awayMatch: MatchGoalsType[],
};
