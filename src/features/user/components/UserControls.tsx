import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../app/store';
import { userActions } from '../store';

import { Button } from '@mui/material';

const UserMenu = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = !!useSelector((state: RootState) => state.user.id);

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
