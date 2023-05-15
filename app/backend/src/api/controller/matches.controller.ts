import { Request, Response } from 'express';
import MatchesService from '../service/matches.service';

export default class MatchesController {
  static async allMatches(req: Request, res: Response) {
    const { inProgress } = req.query;

    if (inProgress && typeof inProgress === 'string') {
      const boolValue = (/true/).test(inProgress);
      const { type, message } = await MatchesService.matchByProgress(boolValue);
      if (type) return res.status(type).json({ message });
      return res.status(200).send(message);
    }

    const { type, message } = await MatchesService.allMatches();
    if (type) return res.status(type).json({ message });
    return res.status(200).json(message);
  }

  static async matchById(req: Request, res: Response) {
    const { id } = req.params;
    const { type, message } = await MatchesService.matchById(Number(id));
    if (type) return res.status(type).json({ message });
    return res.status(200).send(message);
  }

  static async endMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { type, message } = await MatchesService.endMatch(Number(id));
    if (type) return res.status(type).json({ message });
    return res.status(200).send({ message });
  }

  static async updateMatchGoals(req: Request, res: Response) {
    const { id } = req.params;
    const dataGoals = req.body;
    const { type, message } = await MatchesService.updateMatchGoals(Number(id), dataGoals);
    if (type) return res.status(type).json({ message });
    return res.status(200).send({ message });
  }

  static async newMatch(req: Request, res: Response) {
    const dataTeams = req.body;
    const { type, message } = await MatchesService.newMatch(dataTeams);
    if (type) return res.status(type).json({ message });
    return res.status(201).send(message);
  }
}
