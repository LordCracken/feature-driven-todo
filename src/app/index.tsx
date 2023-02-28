import { Container } from '@mui/material';
import { Todos } from '../features/todos';
import Header from '../shared/components/Header';
import { UserWidget } from '../features/user';

import './styles.scss';

const App = () => {
  return (
    <>
      <Header>
        <UserWidget />
      </Header>
      <Container sx={{ mt: '50px' }}>
        <Todos />
      </Container>
    </>
  );
};

export default App;
