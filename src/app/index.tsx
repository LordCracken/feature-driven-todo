import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { Container } from '@mui/material';
import { Todos } from '../features/todos';
import { UserWidget } from '../features/user';
import Header from '../shared/components/Header';

import './styles.scss';

const App = () => {
  const auth = getAuth();
  const [user, setUser] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user.uid);
        sessionStorage.removeItem('todos');
      } else {
        setUser('');
      }
    });
  }, []);

  return (
    <>
      <Header>
        <UserWidget uid={user} />
      </Header>
      <Container sx={{ mt: '50px' }}>
        <Todos uid={user} />
      </Container>
    </>
  );
};

export default App;
