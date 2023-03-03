import { Dispatch } from '@reduxjs/toolkit';
import { getAuth, signOut } from 'firebase/auth';
import { userActions } from '../slice';

export const signOutAction = () => async (dispatch: Dispatch) => {
  dispatch(userActions.updateStatus({ status: 'loading', message: 'Загрузка...' }));

  try {
    const auth = getAuth();
    await signOut(auth);
    await auth.updateCurrentUser(null);

    dispatch(userActions.signOut());
    dispatch(userActions.updateStatus({ status: 'success', message: 'До встречи!' }));
  } catch (error) {
    if (error instanceof Error) {
      dispatch(
        userActions.updateStatus({
          status: 'error',
          message: 'Не удалось выйти из аккаунт',
        }),
      );
    }
  }
};
