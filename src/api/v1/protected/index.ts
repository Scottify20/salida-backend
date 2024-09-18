import express from 'express';
import users from './users/index';
import { verifyFirebaseToken } from '../../../middlewares/auth/verifyFirebaseToken';

const router = express.Router();

router.use(verifyFirebaseToken);
router.use('/users', users);

router.get('/', (req, res) => {
  res.status(200).json({ message: 'this is the protected route.' });
});

export default router;
