import { Request, Response } from 'express';
import { getUserFromAuth } from '../../../../services/firebase/firebaseAuthService';
import {
  addUserToFirestore,
  getUserDataByUsernameFromFirestore,
  getUserFromFirestore,
} from '../../../../services/firebase/firebaseFirestoreService';

export async function registerUserController(req: Request, res: Response) {
  const userData = req.body;

  // Validate user data presence
  if (!userData.uid) {
    return res.status(400).json({ message: 'No uid provided' });
  }

  if (!userData.email && !userData.phoneNumber) {
    return res.status(400).json({ message: 'The user must have an email or phone number' });
  }

  // Check user in auth database
  const userFromAuth = await getUserFromAuth(userData.uid);

  if (!userFromAuth) {
    res.status(400).json({
      message: `User with uid ${userData.uid} does not exist on auth database. User was not added to Firestore.`,
    });
    return;
  }

  // Check if user already exists in Firestore
  const userInFirestore = await getUserFromFirestore(userData.uid);

  if (userInFirestore) {
    res.status(400).json({ message: 'User already exists in Firestore.' });
    return;
  }

  // Add user to Firestore only if not already present
  const userAdded = await addUserToFirestore(userData);

  if (userAdded) {
    console.log(`Added user with uid: ${userData.uid} to Firestore.`);
    res.status(201).json({ message: `Added user with uid ${userData.uid} to Firestore.` });
    return;
  } else {
    res.status(500).json({ message: `Failed to add user with uid: ${userData.uid} to Firestore.` });
    console.log(`Failed to add user with uid: ${userData.uid} to Firestore.`);
    return;
  }
}

export async function getUserDataController(req: Request, res: Response) {
  const username: string = req.body.username || null;
  if (!username) {
    return res.status(400).json({ message: `Please provide a username.` });
  }

  try {
    const userData = await getUserDataByUsernameFromFirestore(username);

    if (!userData) {
      return res.status(404).json({ message: `User with username: ${username} does not exist.` });
    }

    res.status(200).json({
      message: `User with username ${username} found.`,
      data: userData,
    });
  } catch {
    res.status(500).json({ message: 'Internal server error.' });
  }
}
