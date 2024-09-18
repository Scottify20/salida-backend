import express, { Router } from 'express';
import api_v1 from './v1/index';
import { SalidaResponse } from '../interfaces/types/SalidaResponse';

const router: Router = express.Router();
router.use('/v1', api_v1);

router.get<{}, SalidaResponse>('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({ message: 'Welcome to salida API version 1👋' });
});

export default router;
