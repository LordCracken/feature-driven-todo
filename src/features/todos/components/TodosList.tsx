import { useSelector } from 'react-redux';
import { List, Typography } from '@mui/material';

import TodoItem from './TodoItem';
import { RootState } from '../../../app/store';

const TodosList = () => {
  const todos = useSelector((state: RootState) => state.todos);

  if (todos.length === 0) {
    return <Typography variant='h5' mt={5} sx={{textAlign: 'center' }} color='grey'>Задач нет, пора создать новые!</Typography>;
  }

  return (
    <List>
      {todos.map(todo => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </List>
  );
};

export default TodosList;
