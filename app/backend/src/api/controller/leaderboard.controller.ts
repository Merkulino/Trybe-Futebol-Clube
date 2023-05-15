import { Request, Response } from 'express';
import LeaderboardService from '../service/leaderboard.service';

export default class LeaderboardController {
  static async getHomeLeaderboard(req: Request, res: Response) {
    const { type, message } = await LeaderboardService.getHomeLeaderboard();
    if (type) return res.status(type).json({ message });
    return res.status(200).json(message);
  }
}
