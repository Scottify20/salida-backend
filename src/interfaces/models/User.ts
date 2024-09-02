import { UserPreferences } from './UserPreferences';

export interface UserInFireStore {
  uid: string;
  password?: string;
  passwordHash?: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
  phoneNumber?: string;
  providerData: SignInProvider[];
  preferences?: UserPreferences;
  role: Role;
  createdAt?: string;
  lastLoginAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

interface SignInProvider {
  providerId: string; // google.com, phone, password, etc
  uid: string;
  displayName?: string;
  email?: string;
  phoneNumber?: string;
  photoURL?: string;
}

type Role = 'admin' | 'user' | undefined;
