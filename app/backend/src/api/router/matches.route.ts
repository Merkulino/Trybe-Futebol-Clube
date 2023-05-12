import * as express from 'express';
import MatchesController from '../controller/matches.controller';

const router = express.Router();

router.get(
  '/',
  (req, res) => MatchesController.allMatches(req, res),
);

router.get(
  '/',
  (req, res) => MatchesController.matchByProgress(req, res),
);

router.get(
  '/:id',
  (req, res) => MatchesController.matchById(req, res),
);

export default router;
