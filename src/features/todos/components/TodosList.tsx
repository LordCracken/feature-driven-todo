import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { List } from '@mui/material';

import TodoItem from './TodoItem';
import LoadingInfo from './LoadingInfo';

import { RootState, useAppDispatch } from '../../../app/store';
import { getTodos } from '../store';
import useHttp from '../../../shared/hooks/use-http';

const TodosList = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error, sendRequest } = useHttp();
  const todos = useSelector((state: RootState) => state.todos);

  useEffect(() => {
    dispatch(getTodos(sendRequest));
  }, []);

  if (isLoading) return <LoadingInfo info="Загрузка..." />;
  if (!isLoading && error) return <LoadingInfo info="Что-то пошло не так." />;
  if (todos.length === 0) return <LoadingInfo info="Задач нет, пора создать новые!" />;

  return (
    <List>
      {todos.map(todo => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </List>
  );
};

export default TodosList;
