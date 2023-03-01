import { Dispatch } from '@reduxjs/toolkit';
import { userActions } from './slice';
import { signIn, signOut, signUp } from './utils';
import camelizeData from '../../../shared/camelizeData';

export const signUpUser = (email: Email, password: Password) => async (dispatch: Dispatch) => {
  const user = await signUp(email, password);
  if (user?.uid) {
    dispatch(userActions.signIn(user.uid));
    localStorage.setItem('refreshToken', user.refreshToken);
  }
};

export const signInUser = (email: Email, password: Password) => async (dispatch: Dispatch) => {
  const user = await signIn(email, password);
  if (user?.uid) {
    dispatch(userActions.signIn(user.uid));
    localStorage.setItem('refreshToken', user.refreshToken);
  }
};

export const signOutUser = () => async (dispatch: Dispatch) => {
  const isSignedOut = await signOut();
  if (isSignedOut) {
    dispatch(userActions.signOut());
    localStorage.removeItem('refreshToken');
  }
};

export const autologin = () => async (dispatch: Dispatch) => {
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
    } catch (error) {
      console.error(error);
    }
  }
};
