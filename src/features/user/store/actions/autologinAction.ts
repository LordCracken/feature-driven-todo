import { AuthErrorCodes } from 'firebase/auth';

import { Dispatch } from '@reduxjs/toolkit';
import { userActions, UserStatuses } from '../slice';
import camelizeData from '../../../../shared/utils/camelizeData';

export const autologinAction = () => async (dispatch: Dispatch) => {
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
