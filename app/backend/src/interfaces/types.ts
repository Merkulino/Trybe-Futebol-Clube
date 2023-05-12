import Matches from '../database/models/Matches';

export type TypeResponse = {
  type?: number,
  message: string
};

export type TypeMatchesResponse = {
  type?: number,
  message: Matches[] | Matches
};
