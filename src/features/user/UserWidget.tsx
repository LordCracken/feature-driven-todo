import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import UserControls from './components/UserControls';
import SignInDialog from './components/SignInDialog';
import SignOutDialog from './components/SignOutDialog';

import { RootState, useAppDispatch } from '../../app/store';
import { userActions } from './store';

import Status from '../../shared/components/Status';

export const UserWidget = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const status = useSelector((state: RootState) => state.user.status);
  const message = useSelector((state: RootState) => state.user.statusMsg);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
      if (user) {
        dispatch(userActions.signIn());
      }
    });
  }, []);

  return (
    <>
      <UserControls />
      {isAuthenticated ? <SignOutDialog /> : <SignInDialog />}
      {!!status && !!message && (
        <Status
          status={status}
          message={message}
          position={{ vertical: 'top', horizontal: 'center' }}
        />
      )}
    </>
  );
};
