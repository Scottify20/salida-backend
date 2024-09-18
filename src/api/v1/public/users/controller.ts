import { SalidaEmailsResponse } from '../../../../interfaces/types/SalidaEmailsResponse';
import { SalidaResponse } from '../../../../interfaces/types/SalidaResponse';
import { getUserEmailsByUsernameFromFirestore } from '../../../../services/firebase/firebaseFirestoreService';

import { Request, Response } from 'express';

export async function getUserEmailsByUsernameController(req: Request, res: Response) {
  const username: string | null = req.params.username || null;

  let errorResponse: SalidaResponse = {
    code: 'unknown-error',
    source: 'unknown',
    message: '',
  };

  let successResponse: SalidaEmailsResponse = {
    data: {
      emails: [],
    },
    message: '',
  };

  if (!username) {
    errorResponse = {
      code: 'auth/no-username-provided',
      source: 'username',
      message: `Please provide an email.`,
    };
    return res.status(400).json(errorResponse);
  }

  try {
    const emails = await getUserEmailsByUsernameFromFirestore(username);

    if (emails == null) {
      errorResponse = {
        code: 'auth/user-does-not-exist',
        source: 'username',
        message: `User with username: ${username} does not exist.`,
      };
      return res.status(404).json(errorResponse);
    }

    if (emails.length == 0) {
      errorResponse = {
        code: 'auth/no-associated-email',
        source: 'username',
        message: `User with username: ${username} does not have any associated email.`,
      };
      return res.status(404).json(errorResponse);
    }

    successResponse = {
      data: { emails: emails },
      message: `Email/s found for username: ${username}.`,
    };

    return res.status(200).json(successResponse);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
