import { Request, Response } from 'express';
import MatchesService from '../service/matches.service';

export default class MatchesController {
  static async allMatches(_req: Request, res: Response) {
    const { type, message } = await MatchesService.allMatches();
    if (type) return res.status(type).json({ message });
    return res.status(200).json(message);
  }

  static async matchByProgress(req: Request, res: Response) {
    const { inProgress } = req.query;
    console.log('ele ta aqaui?');
    if (inProgress !== '') return res.status(500).json({ message: 'error' }); // Rever isso aqui

    const { type, message } = await MatchesService.matchByProgress(inProgress);
    if (type) return res.status(type).json({ message });

    return res.status(200).send(message);
  }

  static async matchById(req: Request, res: Response) {
    const { id } = req.params;
    const { type, message } = await MatchesService.matchById(Number(id));
    if (type) return res.status(type).json({ message });
    return res.status(200).send(message);
  }
}
