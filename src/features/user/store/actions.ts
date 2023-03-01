import {
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { Dispatch } from '@reduxjs/toolkit';
import { userActions, UserStatuses } from './slice';
import camelizeData from '../../../shared/camelizeData';

export const signUpUser = (email: Email, password: Password) => async (dispatch: Dispatch) => {
  dispatch(userActions.updateStatus({ status: UserStatuses.loading, message: 'Загрузка...' }));

  try {
    const auth = getAuth();
    const response = await createUserWithEmailAndPassword(auth, email, password);
    dispatch(userActions.signIn(response.user.uid));
    localStorage.setItem('refreshToken', response.user.refreshToken);
    dispatch(
      userActions.updateStatus({ status: UserStatuses.success, message: 'Добро пожаловать!' }),
    );
  } catch (error) {
    if (error instanceof Error) {
      switch (error.message) {
        case AuthErrorCodes.EMAIL_EXISTS:
          dispatch(
            userActions.updateStatus({ status: UserStatuses.error, message: 'Email уже занят' }),
          );
          break;
        case AuthErrorCodes.WEAK_PASSWORD:
          dispatch(
            userActions.updateStatus({
              status: UserStatuses.error,
              message: 'Пароль должен быть длиннее 6 символов',
            }),
          );
          break;
        default:
          dispatch(
            userActions.updateStatus({
              status: UserStatuses.error,
              message: 'Не удалось зарегистрироваться',
            }),
          );
      }
    }
  }
};

export const signInUser = (email: Email, password: Password) => async (dispatch: Dispatch) => {
  dispatch(userActions.updateStatus({ status: UserStatuses.loading, message: 'Загрузка...' }));

  try {
    const auth = getAuth();
    const response = await signInWithEmailAndPassword(auth, email, password);
    dispatch(userActions.signIn(response.user.uid));
    localStorage.setItem('refreshToken', response.user.refreshToken);
    dispatch(
      userActions.updateStatus({ status: UserStatuses.success, message: 'С возвращением!' }),
    );
  } catch (error) {
    if (error instanceof Error) {
      switch (error.message) {
        case AuthErrorCodes.INVALID_PASSWORD:
          dispatch(
            userActions.updateStatus({ status: UserStatuses.error, message: 'Неверный пароль' }),
          );
          break;
        case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
          dispatch(
            userActions.updateStatus({
              status: UserStatuses.error,
              message: 'Слишком много неудачных попыток. Попробуйте войти позже',
            }),
          );
          break;
        default:
          dispatch(
            userActions.updateStatus({
              status: UserStatuses.error,
              message: 'Не удалось войти в аккаунт',
            }),
          );
      }
    }
  }
};

export const signOutUser = () => async (dispatch: Dispatch) => {
  dispatch(userActions.updateStatus({ status: UserStatuses.loading, message: 'Загрузка...' }));

  try {
    const auth = getAuth();
    await signOut(auth);
    dispatch(userActions.signOut());
    localStorage.removeItem('refreshToken');
    dispatch(userActions.updateStatus({ status: UserStatuses.success, message: 'До встречи!' }));
  } catch (error) {
    if (error instanceof Error) {
      dispatch(
        userActions.updateStatus({
          status: UserStatuses.error,
          message: 'Не удалось выйти из аккаунт',
        }),
      );
    }
  }
};

export const autologin = () => async (dispatch: Dispatch) => {
  dispatch(userActions.updateStatus({ status: UserStatuses.loading, message: 'Загрузка...' }));
  const refreshToken = localStorage.getItem('refreshToken');

  if (refreshToken) {
    try {
      const response = await fetch(
        `https://securetoken.googleapis.com/v1/token?key=${process.env.REACT_APP_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
        },
      );
      const data = camelizeData(await response.json());

      localStorage.setItem('refreshToken', refreshToken);
      dispatch(userActions.signIn(data.userId));
      dispatch(
        userActions.updateStatus({ status: UserStatuses.success, message: 'С возвращением!' }),
      );
    } catch (error) {
      if (error instanceof Error) {
        switch (error.message) {
          case AuthErrorCodes.TOKEN_EXPIRED:
            dispatch(
              userActions.updateStatus({
                status: UserStatuses.error,
                message: 'Срок действия токена истёк',
              }),
            );
            break;
          default:
            dispatch(
              userActions.updateStatus({
                status: UserStatuses.error,
                message: 'Не удалось войти в аккаунт',
              }),
            );
        }
      }
    }
  }
};
