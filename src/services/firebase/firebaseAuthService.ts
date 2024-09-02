import { UserRecord } from 'firebase-admin/auth';
import { auth } from '../../utils/firebase/firebaseAdmin';

export async function getUserFromAuth(uid: string): Promise<UserRecord | null> {
  try {
    const user = await auth.getUser(uid);
    return user;
  } catch (error) {
    return null;
  }
}
