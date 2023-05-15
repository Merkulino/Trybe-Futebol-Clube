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
  // goalsOwn = 5,
  // goalsBalance = 12,
  // efficiency = 86.67,
};

export type TypeLeaderboardResponse = {
  type?: number,
  message: LeaderboardType[] | LeaderboardType
};
