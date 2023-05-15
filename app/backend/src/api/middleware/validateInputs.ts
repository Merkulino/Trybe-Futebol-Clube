import { Request, Response, NextFunction } from 'express';
import jwt = require('jsonwebtoken');
import validateLoginSchema from './joi';
import TeamsService from '../service/teams.service';

const SECRET_KEY = process.env.JWT_SECRET || 'jwt_secret';

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'All fields must be filled' });

  const { error } = validateLoginSchema({ email, password });
  if (error) return res.status(401).json({ message: 'Invalid email or password' });
  next();
};

const validateTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (token === undefined) return res.status(401).json({ message: 'Token not found' });
  try {
    const decode = await jwt.verify(token, SECRET_KEY); // Await ta ai pra rodar o teste, tenho que refatorar
    req.body.currentUser = decode;
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  next();
};

const validateTeamsIdOnNewMatch = async (req: Request, res: Response, next: NextFunction) => {
  const dataTeams = req.body;
  const { homeTeamId, awayTeamId } = dataTeams;
  const teamsArr: number[] = [homeTeamId, awayTeamId];

  if (homeTeamId === awayTeamId) {
    return res.status(422)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }

  const responseTeams = teamsArr.map(async (teamId) => {
    const response = await TeamsService.getById(teamId);
    if (!response) return null;
    return response;
  });

  const teamsValidation = await Promise.all(responseTeams);

  if (teamsValidation.some((value) => value === null)) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }

  next();
};

export {
  validateLogin,
  validateTokenMiddleware,
  validateTeamsIdOnNewMatch,
};
