import * as express from 'express';
import TeamsController from '../controller/teams.controller';

const router = express.Router();

router.get('/', (req, res) => TeamsController.getAll(req, res));
router.get('/:id', (req, res) => TeamsController.getById(req, res));

export default router;
