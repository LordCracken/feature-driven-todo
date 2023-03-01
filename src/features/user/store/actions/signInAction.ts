import { AuthErrorCodes, getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { Dispatch } from '@reduxjs/toolkit';
import { userActions, UserStatuses } from '../slice';

export const signInAction = (email: Email, password: Password) => async (dispatch: Dispatch) => {
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
