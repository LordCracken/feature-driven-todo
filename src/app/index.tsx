import { Container } from '@mui/material';
import { Todos } from '../features/todos';
import Header from '../shared/components/Header';

import './styles.scss';

const App = () => {
  return (
    <>
      <Header />
      <Container sx={{ mt: '50px' }}>
        <Todos />
      </Container>
    </>
  );
};

export default App;
