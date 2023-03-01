import { AuthErrorCodes, createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

import { Dispatch } from '@reduxjs/toolkit';
import { userActions, UserStatuses } from '../slice';

export const signUpAction = (email: Email, password: Password) => async (dispatch: Dispatch) => {
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
