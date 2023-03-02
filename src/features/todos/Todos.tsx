import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

import TodoForm from './components/TodoForm';
import TodosList from './components/TodosList';
import Status from '../../shared/components/Status';

export const Todos = () => {
  const status = useSelector((state: RootState) => state.todos.status);
  const message = useSelector((state: RootState) => state.todos.statusMsg);

  return (
    <>
      <TodoForm />
      <TodosList />
      {!!status && !!message && <Status status={status} message={message} />}
    </>
  );
};
