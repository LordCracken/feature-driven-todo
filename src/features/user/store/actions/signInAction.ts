import { Dispatch } from '@reduxjs/toolkit';
import { AuthErrorCodes, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { userActions } from '../slice';

export const signInAction = (email: Email, password: Password) => async (dispatch: Dispatch) => {
  dispatch(userActions.updateStatus({ status: 'loading', message: 'Загрузка...' }));

  try {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password);
    dispatch(userActions.signIn());
    dispatch(userActions.updateStatus({ status: 'success', message: 'С возвращением!' }));
  } catch (error) {
    switch ((error as AuthError).code) {
      case AuthErrorCodes.INVALID_PASSWORD:
        dispatch(userActions.updateStatus({ status: 'error', message: 'Неверный пароль' }));
        break;
      case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
        dispatch(
          userActions.updateStatus({
            status: 'error',
            message: 'Слишком много неудачных попыток. Попробуйте войти позже',
          }),
        );
        break;
      case AuthErrorCodes.USER_DELETED:
        dispatch(
          userActions.updateStatus({
            status: 'error',
            message: 'Пользователя с таким Email не существует',
          }),
        );
        break;
      default:
        dispatch(
          userActions.updateStatus({
            status: 'error',
            message: 'Не удалось войти в аккаунт',
          }),
        );
    }
  }
};
