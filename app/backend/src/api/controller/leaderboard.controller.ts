import { Request, Response } from 'express';
import LeaderboardService from '../service/leaderboard.service';
// import LeaderboardService from '../service/leaderboard.service';

export default class LeaderboardController {
  static async getAllLeaderboard(req: Request, res: Response) {
    const leaderboardService = new LeaderboardService();
    const { type, message } = await leaderboardService.getHomeLeaderboard();
    if (type) return res.status(type).json({ message });
    return res.status(200).json(message);
  }

  static async getHomeLeaderboard(req: Request, res: Response) {
    const leaderboardService = new LeaderboardService(['home']);
    const { type, message } = await leaderboardService.getHomeLeaderboard();
    if (type) return res.status(type).json({ message });
    return res.status(200).json(message);
  }

  static async getAwayLeaderboard(req: Request, res: Response) {
    const leaderboardService = new LeaderboardService(['away']);
    const { type, message } = await leaderboardService.getHomeLeaderboard();
    if (type) return res.status(type).json({ message });
    return res.status(200).json(message);
  }
}
