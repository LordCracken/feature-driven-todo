import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { Dispatch } from '@reduxjs/toolkit';
import { userActions, UserStatuses } from './slice';
import camelizeData from '../../../shared/camelizeData';

export const signUpUser = (email: Email, password: Password) => async (dispatch: Dispatch) => {
  try {
    const auth = getAuth();
    const response = await createUserWithEmailAndPassword(auth, email, password);
    dispatch(userActions.signIn(response.user.uid));
    localStorage.setItem('refreshToken', response.user.refreshToken);
  } catch (error) {
    if (error instanceof Error) {
      dispatch(userActions.updateStatus({ status: UserStatuses.error, message: error.message }));
      console.log(error);
    }
  }
};

export const signInUser = (email: Email, password: Password) => async (dispatch: Dispatch) => {
  try {
    const auth = getAuth();
    const response = await signInWithEmailAndPassword(auth, email, password);
    dispatch(userActions.signIn(response.user.uid));
    localStorage.setItem('refreshToken', response.user.refreshToken);
  } catch (error) {
    if (error instanceof Error) {
      dispatch(userActions.updateStatus({ status: UserStatuses.error, message: error.message }));
      console.log(error);
    }
  }
};

export const signOutUser = () => async (dispatch: Dispatch) => {
  try {
    const auth = getAuth();
    await signOut(auth);
    dispatch(userActions.signOut());
    localStorage.removeItem('refreshToken');
  } catch (error) {
    if (error instanceof Error) {
      dispatch(userActions.updateStatus({ status: UserStatuses.error, message: error.message }));
      console.log(error);
    }
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
