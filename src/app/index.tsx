import { Container, Typography } from '@mui/material';
import TodoForm from '../features/todos/components/TodoForm';
import TodosList from '../features/todos/components/TodosList';

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
      <TodoForm />
      <TodosList />
    </Container>
  );
};

export default App;
