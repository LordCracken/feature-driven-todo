import { useSelector } from 'react-redux';

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Close } from '@mui/icons-material';

import { RootState, useAppDispatch } from '../../../app/store';
import { userActions } from '../store/slice';

const UserForm = () => {
  const dispatch = useAppDispatch();
  const isOpen = useSelector((state: RootState) => state.user.isModalOpen);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const closeHandler = () => {
    dispatch(userActions.switchModal());
  };

  return (
    <Dialog open={isOpen} fullScreen={fullScreen} maxWidth="md" onClose={closeHandler}>
      <IconButton sx={{ position: 'absolute', top: 10, right: 10 }} onClick={closeHandler}>
        <Close />
      </IconButton>
      <DialogTitle>Авторизация</DialogTitle>
      <DialogContent
        sx={{ alignSelf: 'center', p: '16px 24px', width: '100vw', maxWidth: '500px' }}
      >
        <TextField
          id="email"
          label="Email"
          variant="standard"
          sx={{ display: 'flex', mb: '10px' }}
        />
        <TextField
          id="password"
          type="password"
          label="Пароль"
          variant="standard"
          sx={{ display: 'flex', mb: '25px' }}
        />
        <Stack spacing={{ sm: 2, xs: 1 }} direction={{ xs: 'column', sm: 'row' }}>
          <Button variant="outlined" fullWidth>
            Регистрация
          </Button>
          <Button variant="contained" fullWidth>
            Войти
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default UserForm;
