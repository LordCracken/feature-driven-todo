import { Dispatch } from '@reduxjs/toolkit';
import { GetState } from '../../../../app/store';
import { todosActions } from '../slice';

import { v4 as generateId } from 'uuid';
import { sendTodosRequest } from '../utils';

import { baseUrl } from './index';

export const sendNewTodo = (todoContent: string) => {
  return async (dispatch: Dispatch, getState: GetState) => {
    const uid = getState().todos.uid;

    const createTodo = (todoContent: string, todoId: UniqueID) => {
      const createdTodo = {
        id: todoId,
        content: todoContent,
        completed: false,
      };

      dispatch(todosActions.addNewTodo(createdTodo));
    };

    if (!uid) {
      createTodo(todoContent, generateId());
      const todos = getState().todos.list;
      sessionStorage.setItem('todos', JSON.stringify(todos));
      return;
    }

    const url = `${baseUrl}/${uid}.json`;
    const headers = {
      'Content-Type': 'application/json',
    };
    const response = await sendTodosRequest(
      dispatch,
      {
        url,
        method: 'POST',
        headers,
        body: { content: todoContent, completed: false },
      },
      'Задача добавлена!',
      'Не удалось создать задачу',
    );
    if (response?.ok) {
      const data = await response.json();
      createTodo(todoContent, data.name);
    }
  };
};
