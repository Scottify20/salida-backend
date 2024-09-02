import { db } from '../../utils/firebase/firebaseAdmin';

import { UserInFireStore } from '../../interfaces/models/User';

export async function addUserToFirestore(userData: UserInFireStore): Promise<boolean> {
  try {
    await db.collection('users').doc(userData.uid).set(userData);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function getUserFromFirestore(uid: string): Promise<UserInFireStore | null> {
  try {
    const query = db.collection('users').where('uid', '==', uid);
    const snapshot = await query.get();

    if (snapshot.empty) {
      return null; // User not found
    }

    const userDoc = snapshot.docs[0];
    const userData = userDoc.data() as UserInFireStore;

    return userData; // Return the user object
  } catch (error) {
    throw error;
  }
}
