import { Request, Response } from 'express';
import TeamsService from '../service/teams.service';

export default class TeamsController {
  static async getAll(_req: Request, res: Response) {
    const response = await TeamsService.getAll();
    return res.status(200).json(response);
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const response = await TeamsService.getById(Number(id));
    return res.status(200).json(response);
  }
}
