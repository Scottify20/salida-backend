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

export async function getUserDataByUsernameFromFirestore(
  username: string
): Promise<UserInFireStore | null> {
  try {
    const collectionRef = db.collection('users');
    const querySnapshot = await collectionRef.where('username', '==', username).limit(1).get();

    if (querySnapshot.empty) {
      return null;
    }

    const userDoc = querySnapshot.docs[0];
    return userDoc.data() as UserInFireStore;
  } catch (error) {
    throw error;
  }
}

export async function getUserEmailsByUsernameFromFirestore(
  username: string
): Promise<string[] | null> {
  try {
    const userData = await getUserDataByUsernameFromFirestore(username);

    if (!userData) {
      return null;
    }

    const emails: (string | null)[] = [];
    emails.push(userData.email ? userData.email : null);

    userData.providerData.forEach((provData) => {
      provData.email ? emails.push(provData.email) : '';
    });

    const nullFilteredEmails = emails.filter((email) => email != null);

    return nullFilteredEmails.length > 0 ? nullFilteredEmails : null;
  } catch (error) {
    throw error;
  }
}
