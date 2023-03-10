import { Dispatch } from '@reduxjs/toolkit';
import { todosActions } from '../slice';
import { v4 as generateId } from 'uuid';

import { baseUrl } from './index';

export const sendNewTodo = (todoContent: string) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
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

    dispatch(todosActions.updateStatus({ status: 'loading', message: 'Загрузка...' }));

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: todoContent, completed: false }),
      });

      if (response.ok) {
        const data = await response.json();
        createTodo(todoContent, data.name);
        dispatch(todosActions.updateStatus({ status: 'success', message: 'Задача добавлена!' }));
      }
    } catch (error) {
      dispatch(
        todosActions.updateStatus({ status: 'error', message: 'Не удалось создать задачу' }),
      );
    }
  };
};
