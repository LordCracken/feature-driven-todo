import { ChangeEvent, useState } from 'react';
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
import { userActions, signInAction, signUpAction } from '../store';
import useInput from '../../../shared/hooks/useInput';

const SignInDialog = () => {
  const dispatch = useAppDispatch();
  const isOpen = useSelector((state: RootState) => state.user.isModalOpen);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const emailRule = (value: Email) => emailRegex.test(value);
  const passwordRule = (value: Password) => value.length >= 6;

  const {
    value: email,
    error: emailError,
    isTouched: emailIsTouched,
    setIsTouchedHandler: setEmailIsTouched,
    valueChangeHandler: emailChangeHandler,
  } = useInput(emailRule, 'Введите корректный Email');

  const {
    value: password,
    error: passwordError,
    isTouched: passwordIsTouched,
    setIsTouchedHandler: setPasswordIsTouched,
    valueChangeHandler: passwordChangeHandler,
  } = useInput(passwordRule, 'Пароль меньше 6 символов');

  const closeHandler = () => {
    dispatch(userActions.switchModal());
  };

  const emailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const signUpHandler = () => {
    dispatch(signUpAction(email, password));
  };

  const signInHandler = () => {
    dispatch(signInAction(email, password));
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
          error={!!emailError}
          helperText={emailError}
          value={email}
          onChange={emailChangeHandler}
          onBlur={setEmailIsTouched}
        />
        <TextField
          id="password"
          type="password"
          label="Пароль"
          variant="standard"
          sx={{ display: 'flex', mb: '25px' }}
          error={!!passwordError}
          helperText={passwordError}
          value={password}
          onChange={passwordChangeHandler}
          onBlur={setPasswordIsTouched}
        />
        <Stack spacing={{ sm: 2, xs: 1 }} direction={{ xs: 'column', sm: 'row' }}>
          <Button variant="outlined" fullWidth onClick={signUpHandler}>
            Регистрация
          </Button>
          <Button variant="contained" fullWidth onClick={signInHandler}>
            Войти
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default SignInDialog;
