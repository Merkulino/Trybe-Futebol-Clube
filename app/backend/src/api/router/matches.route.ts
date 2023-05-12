import * as express from 'express';
import MatchesController from '../controller/matches.controller';

const router = express.Router();

// router.get(
//   '/',
//   (req, res, next) => MatchesController.matchByProgress(req, res, next),
// );

router.get(
  '/',
  (req, res) => MatchesController.allMatches(req, res),
);

router.get(
  '/:id',
  (req, res) => MatchesController.matchById(req, res),
);

export default router;
