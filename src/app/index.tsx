import { Container, Typography } from '@mui/material';
import { Todos } from '../features/todos';

const App = () => {
  return (
    <Container>
      <Typography
        variant="h3"
        component="h1"
        sx={{ mb: '20px', textAlign: 'center', fontSize: { xs: '1.5rem', md: '3rem' } }}
      >
        Feature-Driven Todos
      </Typography>
      <Todos />
    </Container>
  );
};

export default App;
