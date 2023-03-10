import { userActions } from '../store';

import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@shared/hooks';

const UserMenu = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(state => state.user.isAuthenticated);

  const openUserModalHandler = () => {
    dispatch(userActions.switchModal());
  };

  return (
    <Button color="inherit" onClick={openUserModalHandler}>
      {isAuthenticated ? 'Выйти' : 'Войти'}
    </Button>
  );
};

export default UserMenu;
