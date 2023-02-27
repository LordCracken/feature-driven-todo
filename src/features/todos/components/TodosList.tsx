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

  if (isLoading) return <TodosListStatus info="Загрузка..." />;
  if (!isLoading && error) return <TodosListStatus info="Что-то пошло не так." />;
  if (todos.length === 0) return <TodosListStatus info="Задач нет, пора создать новые!" />;

  return (
    <List>
      {todos.map(todo => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </List>
  );
};

export default TodosList;
