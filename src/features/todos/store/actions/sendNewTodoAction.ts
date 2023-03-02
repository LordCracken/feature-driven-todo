import { Dispatch } from '@reduxjs/toolkit';
import { GetState } from '../../../../app/store';
import { todosActions } from '../slice';

import { baseUrl } from './index';
import { v4 as generateId } from 'uuid';
import { Statuses } from '../../../../shared/components/Status';

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

    dispatch(todosActions.updateStatus({ status: Statuses.loading, message: 'Загрузка...' }));

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
        dispatch(
          todosActions.updateStatus({ status: Statuses.success, message: 'Задача добавлена!' }),
        );
      }
    } catch (error) {
      dispatch(
        todosActions.updateStatus({ status: Statuses.error, message: 'Не удалось создать задачу' }),
      );
    }
  };
};
