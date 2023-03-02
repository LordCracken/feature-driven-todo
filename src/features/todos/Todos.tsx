import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../app/store';

import TodoForm from './components/TodoForm';
import TodosList from './components/TodosList';
import Status from '../../shared/components/Status';
import { todosActions } from './store';

interface ITodos {
  uid: string;
}

export const Todos: FC<ITodos> = ({ uid }) => {
  const dispatch = useAppDispatch();
  const status = useSelector((state: RootState) => state.todos.status);
  const message = useSelector((state: RootState) => state.todos.statusMsg);

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
