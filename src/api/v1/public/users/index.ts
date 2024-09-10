import express from 'express';
import { getUserEmailsByUsernameController } from './controller';

const router = express.Router();

router.get('/get-emails', async (req, res) => {
  getUserEmailsByUsernameController(req, res);
});

router.get('/', (req, res) => {
  res.status(200).json({ message: 'public users route' });
});
export default router;
