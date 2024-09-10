import express, { Router } from 'express';
import MessageResponse from '../interfaces/types/MessageResponse';
import api_v1 from './v1/index';

const router: Router = express.Router();
router.use('/v1', api_v1);

router.get<{}, MessageResponse>('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({ message: 'Welcome to salida API version 1👋' });
});

export default router;
