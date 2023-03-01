import { getAuth, signOut } from 'firebase/auth';

import { Dispatch } from '@reduxjs/toolkit';
import { userActions, UserStatuses } from '../slice';

export const signOutAction = () => async (dispatch: Dispatch) => {
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
