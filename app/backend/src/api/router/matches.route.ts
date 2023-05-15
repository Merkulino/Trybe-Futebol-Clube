import * as express from 'express';
import MatchesController from '../controller/matches.controller';
import { validateTokenMiddleware } from '../middleware/validateInputs';

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

router.patch(
  '/:id',
  validateTokenMiddleware,
  // Funcionalidade extra: validar campos da requisição
  (req, res) => MatchesController.updateMatchGoals(req, res),
);

router.patch(
  '/:id/finish',
  validateTokenMiddleware,
  (req, res) => MatchesController.endMatch(req, res),
);

export default router;
