import express from 'express';
import protectedUsers from './users/index';
import tmdb from './tmdb/tmdb';

const router = express.Router();

router.use('/users', protectedUsers);
router.use('/tmdb', tmdb);

router.get('/', (req, res) => {
  res.status(200).json({ message: 'This is the public route.' });
});

export default router;
