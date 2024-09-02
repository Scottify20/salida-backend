import express, { Router } from 'express';
import tmdb from './tmdb/tmdb';
import users from './users/index';
import MessageResponse from '../../interfaces/types/MessageResponse';
import filterUndefinedNullProps from '../../middlewares/data_transform/filterUndefinesNullProps';

const router: Router = express.Router();

router.use(filterUndefinedNullProps);
router.use('/tmdb', tmdb);
router.use('/users', users);

router.get<{}, MessageResponse>('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json({ message: 'Welcome to salida API Version 1👋' });
});

router.post('/register', () => {});

export default router;
