import { AuthErrorCodes, createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

import { Dispatch } from '@reduxjs/toolkit';
import { userActions } from '../slice';

import { AuthError } from './interfaces';
import { Statuses } from '../../../../shared/components/Status';

export const signUpAction = (email: Email, password: Password) => async (dispatch: Dispatch) => {
  dispatch(userActions.updateStatus({ status: Statuses.loading, message: 'Загрузка...' }));

  try {
    const auth = getAuth();
    const response = await createUserWithEmailAndPassword(auth, email, password);
    dispatch(userActions.signIn(response.user.uid));
    localStorage.setItem('refreshToken', response.user.refreshToken);
    dispatch(userActions.updateStatus({ status: Statuses.success, message: 'Добро пожаловать!' }));
  } catch (error) {
    switch ((error as AuthError).code) {
      case AuthErrorCodes.EMAIL_EXISTS:
        dispatch(userActions.updateStatus({ status: Statuses.error, message: 'Email уже занят' }));
        break;
      case AuthErrorCodes.WEAK_PASSWORD:
        dispatch(
          userActions.updateStatus({
            status: Statuses.error,
            message: 'Пароль должен быть длиннее 6 символов',
          }),
        );
        break;
      case AuthErrorCodes.INVALID_EMAIL:
        dispatch(
          userActions.updateStatus({
            status: Statuses.error,
            message: 'Неверный формат Email',
          }),
        );
        break;
      default:
        dispatch(
          userActions.updateStatus({
            status: Statuses.error,
            message: 'Не удалось зарегистрироваться',
          }),
        );
    }
  }
};
