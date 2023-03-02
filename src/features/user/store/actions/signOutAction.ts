import { getAuth, signOut } from 'firebase/auth';

import { Dispatch } from '@reduxjs/toolkit';
import { userActions } from '../slice';

import { Statuses } from '../../../../shared/components/Status';

export const signOutAction = () => async (dispatch: Dispatch) => {
  dispatch(userActions.updateStatus({ status: Statuses.loading, message: 'Загрузка...' }));

  try {
    const auth = getAuth();
    await signOut(auth);
    dispatch(userActions.signOut());
    localStorage.removeItem('refreshToken');
    dispatch(userActions.updateStatus({ status: Statuses.success, message: 'До встречи!' }));
  } catch (error) {
    if (error instanceof Error) {
      dispatch(
        userActions.updateStatus({
          status: Statuses.error,
          message: 'Не удалось выйти из аккаунт',
        }),
      );
    }
  }
};
