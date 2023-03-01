import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import UserControls from './components/UserControls';
import SignInDialog from './components/SignInDialog';
import SignOutDialog from './components/SignOutDialog';
import { RootState, useAppDispatch } from '../../app/store';
import { autologin } from './store';

export const UserWidget = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = !!useSelector((state: RootState) => state.user.id);

  useEffect(() => {
    dispatch(autologin());
  }, []);

  return (
    <>
      <UserControls />
      {isAuthenticated ? <SignOutDialog /> : <SignInDialog />}
    </>
  );
};
