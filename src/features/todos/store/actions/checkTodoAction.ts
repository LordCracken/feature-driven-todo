import { Dispatch } from '@reduxjs/toolkit';
import { GetState } from '../../../../app/store';
import { todosActions } from '../slice';

import { sendTodosRequest } from '../utils';
import { baseUrl } from './index';

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
    const headers = {
      'Content-Type': 'application/json',
    };
    const response = await sendTodosRequest(dispatch, {
      url,
      method: 'PATCH',
      headers,
      body: { completed: !completed },
    });
    if (response?.ok) dispatch(todosActions.checkTodo(todoId));
  };
};
