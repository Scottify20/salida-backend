import express from 'express';
import { getUserDataController, registerUserController } from './controller';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Your request url is incomplete!' });
});

router.post('/make-permanent', async (req, res) => {
  registerUserController(req, res);
});

router.delete('/delete', async (req, res) => {});

router.patch('/update-data', async (req, res) => {});

router.get('/get-data', async (req, res) => {
  getUserDataController(req, res);
});

export default router;
