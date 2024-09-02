import { admin } from '../../utils/firebase/firebaseAdmin';
import { Request, Response, NextFunction } from 'express';
import { DecodedIdToken } from 'firebase-admin/auth';

export async function verifyFirebaseToken(req: Request, res: Response, next: NextFunction) {
  const idToken = req.headers.authorization?.replace('Bearer ', '');

  if (!idToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken: DecodedIdToken) => {
      const uid = decodedToken.uid;
      if (uid) {
        return next();
      }
    })
    .catch((error) => {
      console.log('Error verfying ID token');
      return res.status(401).json({ message: 'Unauthorized' });
    });
}
