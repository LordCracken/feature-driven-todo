import { Dispatch } from '@reduxjs/toolkit';
import { GetState } from '../../../../app/store';
import { todosActions } from '../slice';

import { baseUrl } from './index';
import { Statuses } from '../../../../shared/components/Status';

export const checkTodo = (todoId: UniqueID, completed: boolean) => {
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
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !completed }),
      });

      if (response.ok) {
        dispatch(todosActions.checkTodo(todoId));
        dispatch(todosActions.updateStatus({ status: Statuses.success, message: 'Готово!' }));
      }
    } catch (error) {
      dispatch(todosActions.updateStatus({ status: Statuses.error, message: 'Ошибка!' }));
    }
  };
};
