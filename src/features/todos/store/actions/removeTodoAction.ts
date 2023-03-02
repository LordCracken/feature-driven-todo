import { Dispatch } from '@reduxjs/toolkit';
import { GetState } from '../../../../app/store';
import { todosActions } from '../slice';

import { baseUrl } from './index';
import { Statuses } from '../../../../shared/components/Status';

export const removeTodo = (todoId: UniqueID) => {
  return async (dispatch: Dispatch, getState: GetState) => {
    const uid = getState().todos.uid;

    if (!uid) {
      dispatch(todosActions.removeTodo(todoId));
      const todos = getState().todos.list;
      sessionStorage.setItem('todos', JSON.stringify(todos));
      return;
    }

    const url = `${baseUrl}/${uid}/${todoId}.json`;

    dispatch(todosActions.updateStatus({ status: Statuses.loading, message: 'Загрузка...' }));

    try {
      const response = await fetch(url, { method: 'DELETE' });

      if (response.ok) {
        dispatch(todosActions.removeTodo(todoId));
        dispatch(
          todosActions.updateStatus({
            status: Statuses.success,
            message: 'Задача удалена',
          }),
        );
      }
    } catch (error) {
      dispatch(
        todosActions.updateStatus({ status: Statuses.error, message: 'Не удалось удалить задачу' }),
      );
    }
  };
};
