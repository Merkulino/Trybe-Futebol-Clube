import * as express from 'express';
import LeaderboardController from '../controller/leaderboard.controller';
// import { validateLogin, validateTokenMiddleware } from '../middleware/validateInputs';

const router = express.Router();

router.get(
  '/',
  (req, res) => LeaderboardController.getAllLeaderboard(req, res),
);

router.get(
  '/home',
  (req, res) => LeaderboardController.getHomeLeaderboard(req, res),
);

router.get(
  '/away',
  (req, res) => LeaderboardController.getAwayLeaderboard(req, res),
);

export default router;
