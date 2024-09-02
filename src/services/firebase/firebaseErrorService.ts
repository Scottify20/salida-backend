import { FirebaseAuthError } from 'firebase-admin/auth';
import { FirebaseError } from 'firebase-admin';

export function isFirebaseAuthError(error: FirebaseError): boolean {
  return error.code?.startsWith('auth/');
}
