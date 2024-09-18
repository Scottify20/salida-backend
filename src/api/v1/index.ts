import express, { Router } from 'express';
import filterUndefinedNullProps from '../../middlewares/data_transform/filterUndefinesNullProps';
import protected_route from './protected/index';
import public_route from './public/index';
import { SalidaResponse } from '../../interfaces/types/SalidaResponse';

const router: Router = express.Router();

router.use(filterUndefinedNullProps);

// public routes (requests from users that are not logged in or dont have an account yet)
// still requires requests to come from the salida website
router.use('/public', public_route);

// protected routes (requests from logged in users only)
router.use('/protected', protected_route);

router.get<{}, SalidaResponse>('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json({ message: 'Welcome to salida API Version 1👋' });
});

export default router;
