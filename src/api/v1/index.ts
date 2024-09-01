import express, { Router } from 'express';
import tmdb from './tmdb/tmdb';
import MessageResponse from '../../interfaces/MessageResponse';

const router: Router = express.Router();

router.use('/tmdb', tmdb);

router.get<{}, MessageResponse>('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json({ message: 'Welcome to salida API Version 1👋' });
});

export default router;
