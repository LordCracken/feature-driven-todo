import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';

import UserControls from './components/UserControls';
import SignInDialog from './components/SignInDialog';
import SignOutDialog from './components/SignOutDialog';

import { RootState, useAppDispatch } from '../../app/store';
import { userActions } from './store';

import Status from '../../shared/components/Status';

interface IUserWidget {
  uid: string;
}

export const UserWidget: FC<IUserWidget> = ({ uid }) => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const status = useSelector((state: RootState) => state.user.status);
  const message = useSelector((state: RootState) => state.user.statusMsg);

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
