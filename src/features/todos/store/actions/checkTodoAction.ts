import { Dispatch } from '@reduxjs/toolkit';
import { todosActions } from '../slice';

import { baseUrl } from './index';

export const checkTodo = (todoId: UniqueID, completed: boolean) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const uid = getState().todos.uid;

    if (!uid) {
      dispatch(todosActions.checkTodo(todoId));
      const todos = getState().todos.list;
      sessionStorage.setItem('todos', JSON.stringify(todos));
      return;
    }

    const url = `${baseUrl}/${uid}/${todoId}.json`;

    dispatch(todosActions.updateStatus({ status: 'loading', message: 'Загрузка...' }));

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
        dispatch(todosActions.updateStatus({ status: 'success', message: 'Готово!' }));
      }
    } catch (error) {
      dispatch(todosActions.updateStatus({ status: 'error', message: 'Ошибка!' }));
    }
  };
};
