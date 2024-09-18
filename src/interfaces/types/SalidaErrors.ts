import { SalidaResponse } from './SalidaResponse';

export interface SalidaErrorResponse extends SalidaResponse {
  stack?: string;
  error: { code: SalidaErrorCodes; source: SalidaErrorSource };
}

export interface SalidaAuthErrorReponse extends SalidaResponse {
  stack?: string;
  code: SalidaAuthErrorCode;
}

export type SalidaErrorCodes = SalidaAuthErrorCode | 'unknown-error';
export type SalidaErrorSource = SalidaAuthErrorSource | 'unknown';

export type SalidaAuthErrorCode =
  | 'auth/no-associated-email'
  | 'auth/user-does-not-exist'
  | 'auth/no-username-provided';

export type SalidaAuthErrorSource = 'password' | 'general' | 'username' | 'email';
