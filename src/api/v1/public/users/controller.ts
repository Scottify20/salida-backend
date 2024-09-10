import { getUserEmailsByUsernameFromFirestore } from '../../../../services/firebase/firebaseFirestoreService';

import { Request, Response } from 'express';

export async function getUserEmailsByUsernameController(req: Request, res: Response) {
  const username: string = req.body.username || null;

  if (!username) {
    return res.status(400).json({ message: `Please provide an email.` });
  }

  try {
    const emails = await getUserEmailsByUsernameFromFirestore(username);

    if (!emails) {
      return res
        .status(404)
        .json({ message: `No associated emails found for username: ${username}.` });
    }

    return res
      .status(200)
      .json({ message: `Emails found for username ${username}.`, data: emails });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error` });
  }
}
