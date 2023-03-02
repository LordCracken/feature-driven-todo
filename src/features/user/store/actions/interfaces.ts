import { AuthErrorCodes } from 'firebase/auth';

type ValueOf<T> = T[keyof T];

export interface AuthError extends Error {
  code: ValueOf<typeof AuthErrorCodes>;
}
