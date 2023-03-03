import { Dispatch } from '@reduxjs/toolkit';
import { todosActions } from '../slice';

import { baseUrl } from './index';

export const removeTodo = (todoId: UniqueID) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const uid = getState().todos.uid;

    if (!uid) {
      dispatch(todosActions.removeTodo(todoId));
      const todos = getState().todos.list;
      sessionStorage.setItem('todos', JSON.stringify(todos));
      return;
    }

    const url = `${baseUrl}/${uid}/${todoId}.json`;

    dispatch(todosActions.updateStatus({ status: 'loading', message: 'Загрузка...' }));

    try {
      const response = await fetch(url, { method: 'DELETE' });

      if (response.ok) {
        dispatch(todosActions.removeTodo(todoId));
        dispatch(
          todosActions.updateStatus({
            status: 'success',
            message: 'Задача удалена',
          }),
        );
      }
    } catch (error) {
      dispatch(
        todosActions.updateStatus({ status: 'error', message: 'Не удалось удалить задачу' }),
      );
    }
  };
};
