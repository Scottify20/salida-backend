import express, { Router } from 'express';
import api_v1 from './v1';
import MessageResponse from '../interfaces/MessageResponse';

const router: Router = express.Router();

router.use('/v1', api_v1);

router.get<{}, MessageResponse>('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json({ message: 'Welcome to salida API 👋' });
});

export default router;
