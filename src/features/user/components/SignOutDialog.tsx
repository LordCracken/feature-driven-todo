import { signOutAction, userActions } from '../store';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '@shared/hooks';

const SignOutDialog = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(state => state.user.isModalOpen);

  const closeHandler = () => {
    dispatch(userActions.switchModal());
  };

  const signOutHandler = () => {
    dispatch(signOutAction());
  };

  return (
    <Dialog
      open={isOpen}
      onClose={closeHandler}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Выход из профиля</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Вы действительно хотите выйти?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeHandler}>Отмена</Button>
        <Button onClick={signOutHandler} autoFocus>
          Выйти
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SignOutDialog;
