declare module '*.module.scss';

type ValueOf<T> = T[keyof T];

type UniqueID = string;
type Email = string;
type Password = string;

declare type Statuses = 'loading' | 'success' | 'error';

declare interface AuthError extends Error {
  code: ValueOf<typeof import('firebase/auth').AuthErrorCodes>;
}

