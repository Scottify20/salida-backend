import express from 'express';
import { registerUserController } from './controller';
import { verifyFirebaseToken } from '../../../middlewares/auth/verifyFirebaseToken';

const router = express.Router();
router.use(verifyFirebaseToken);

router.get('/', (req, res) => {
  res.json({ message: 'Your request url is incomplete!' });
});

router.post('/register', async (req, res) => {
  registerUserController(req, res);
});

router.delete('/delete', async (req, res) => {});

router.patch('/update', async (req, res) => {});

export default router;
