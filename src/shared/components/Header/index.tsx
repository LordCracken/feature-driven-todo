import { AppBar, Container, Toolbar } from '@mui/material';

import Logo from './Logo';
import SignInButton from './SignInButton';

const Header = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo />
          <SignInButton />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
