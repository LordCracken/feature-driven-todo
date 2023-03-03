import { FC, PropsWithChildren } from 'react';

import { AppBar, Container, Toolbar } from '@mui/material';
import Logo from './Logo';

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
