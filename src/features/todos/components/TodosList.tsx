import { useEffect } from 'react';

import { List } from '@mui/material';
import TodoItem from './TodoItem';
import TodosListStatus from './TodosListStatus';

import { useAppDispatch, useAppSelector } from '../../../shared/hooks';
import { getTodos } from '../store';

const TodosList = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos.list);
  const uid = useAppSelector(state => state.todos.uid);

  useEffect(() => {
    dispatch(getTodos());
  }, [uid]);

  return (
    <>
      {(todos.length === 0 || !uid) && <TodosListStatus />}
      <List>
        {todos.map(todo => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </List>
    </>
  );
};

export default TodosList;
