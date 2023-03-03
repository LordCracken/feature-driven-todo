import { AuthErrorCodes, createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

import { Dispatch } from '@reduxjs/toolkit';
import { userActions } from '../slice';

export const signUpAction = (email: Email, password: Password) => async (dispatch: Dispatch) => {
  dispatch(userActions.updateStatus({ status: 'loading', message: 'Загрузка...' }));

  try {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password);
    dispatch(userActions.signIn());
    dispatch(userActions.updateStatus({ status: 'success', message: 'Добро пожаловать!' }));
  } catch (error) {
    switch ((error as AuthError).code) {
      case AuthErrorCodes.EMAIL_EXISTS:
        dispatch(userActions.updateStatus({ status: 'error', message: 'Email уже занят' }));
        break;
      case AuthErrorCodes.WEAK_PASSWORD:
        dispatch(
          userActions.updateStatus({
            status: 'error',
            message: 'Пароль должен быть длиннее 6 символов',
          }),
        );
        break;
      case AuthErrorCodes.INVALID_EMAIL:
        dispatch(
          userActions.updateStatus({
            status: 'error',
            message: 'Неверный формат Email',
          }),
        );
        break;
      default:
        dispatch(
          userActions.updateStatus({
            status: 'error',
            message: 'Не удалось зарегистрироваться',
          }),
        );
    }
  }
};
