import { Dispatch } from '@reduxjs/toolkit';
import { GetState } from '../../../../app/store';
import { todosActions } from '../slice';

import { sendTodosRequest } from '../utils';
import { baseUrl } from './index';

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
    const response = await sendTodosRequest(
      dispatch,
      { url, method: 'DELETE' },
      'Задача удалена',
      'Не удалось удалить задачу',
    );
    if (response?.ok) dispatch(todosActions.removeTodo(todoId));
  };
};
