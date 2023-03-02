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
  const uid = useSelector((state: RootState) => state.todos.uid);

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
