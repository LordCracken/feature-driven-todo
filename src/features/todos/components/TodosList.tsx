import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { List } from '@mui/material';
import TodoItem from './TodoItem';
import TodosListStatus from './TodosListStatus';

import { RootState, useAppDispatch } from '../../../app/store';
import { getTodos } from '../store';

const TodosList = () => {
  const dispatch = useAppDispatch();
  const todos = useSelector((state: RootState) => state.todos.list);

  useEffect(() => {
    dispatch(getTodos());
  }, []);

  return (
    <>
      {todos.length === 0 && <TodosListStatus />}
      <List>
        {todos.map(todo => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </List>
    </>
  );
};

export default TodosList;
