import * as admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

export class FirebaseAdminService {
  initialize(): void {
    if (!admin.apps.length) {
      const serviceAccount =
        process.env.NODE_ENV === 'production'
          ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY || '{}')
          : require(process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH || '');

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://salida-sitf.firebaseio.com',
      });
    }
  }
}

console.log('running firebase');

const db = admin.firestore();
const auth = admin.auth();

export { admin, db, auth };
