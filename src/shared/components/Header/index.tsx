import { FC, PropsWithChildren } from 'react';
import Logo from './Logo';
import { AppBar, Container, Toolbar } from '@mui/material';

export const Header: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo />
          {children}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
