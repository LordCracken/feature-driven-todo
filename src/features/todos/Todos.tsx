import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/hooks';

import TodoForm from './components/TodoForm';
import TodosList from './components/TodosList';
import {Status} from '@shared/components';
import { todosActions } from './store';

interface ITodos {
  uid: string;
}

export const Todos: FC<ITodos> = ({ uid }) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.todos.status);
  const message = useAppSelector(state => state.todos.statusMsg);

  useEffect(() => {
    dispatch(todosActions.setUser(uid));
  }, [uid]);

  return (
    <>
      <TodoForm />
      <TodosList />
      {!!status && !!message && <Status status={status} message={message} />}
    </>
  );
};
