import { FC, useEffect } from 'react';

import UserControls from './components/UserControls';
import SignInDialog from './components/SignInDialog';
import SignOutDialog from './components/SignOutDialog';

import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { userActions } from './store';

import { Status } from '@shared/components';

interface IUserWidget {
  uid: string;
}

export const UserWidget: FC<IUserWidget> = ({ uid }) => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(state => state.user.isAuthenticated);
  const status = useAppSelector(state => state.user.status);
  const message = useAppSelector(state => state.user.statusMsg);

  useEffect(() => {
    if (uid) {
      dispatch(userActions.signIn());
    }
  }, [uid]);

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
