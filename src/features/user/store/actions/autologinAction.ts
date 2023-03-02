import { AuthErrorCodes } from 'firebase/auth';

import { Dispatch } from '@reduxjs/toolkit';
import { userActions } from '../slice';

import { AuthError } from './interfaces';
import camelizeData from '../../../../shared/utils/camelizeData';
import { Statuses } from '../../../../shared/components/Status';

export const autologinAction = () => async (dispatch: Dispatch) => {
  const refreshToken = localStorage.getItem('refreshToken');

  if (refreshToken) {
    dispatch(userActions.updateStatus({ status: Statuses.loading, message: 'Загрузка...' }));

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
      dispatch(userActions.updateStatus({ status: Statuses.success, message: 'С возвращением!' }));
    } catch (error) {
      switch ((error as AuthError).code) {
        case AuthErrorCodes.TOKEN_EXPIRED:
          dispatch(
            userActions.updateStatus({
              status: Statuses.error,
              message: 'Срок действия токена истёк',
            }),
          );
          break;
        default:
          dispatch(
            userActions.updateStatus({
              status: Statuses.error,
              message: 'Не удалось войти в аккаунт',
            }),
          );
      }
    }
  }
};
