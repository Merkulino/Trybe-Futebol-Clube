import Matches from '../database/models/matches';

export type TypeResponse = {
  type?: number,
  message: string
};

export type TypeMatchesResponse = {
  type?: number,
  message: Matches[] | Matches
};
