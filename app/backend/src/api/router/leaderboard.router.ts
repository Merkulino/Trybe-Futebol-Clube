import * as express from 'express';
import LeaderboardController from '../controller/leaderboard.controller';
// import { validateLogin, validateTokenMiddleware } from '../middleware/validateInputs';

const router = express.Router();

router.get(
  '/home',
  (req, res) => LeaderboardController.getHomeLeaderboard(req, res),
);

export default router;
