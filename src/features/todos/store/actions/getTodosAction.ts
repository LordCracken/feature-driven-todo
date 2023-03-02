import { Dispatch } from '@reduxjs/toolkit';
import { todosActions } from '../slice';

import { baseUrl } from './index';
import { Statuses } from '../../../../shared/components/Status';

interface IServerTodos {
  [key: string]: {
    content: string;
    completed: boolean;
  };
}

export const getTodos = () => async (dispatch: Dispatch, getState: () => RootState) => {
  const uid = getState().todos.uid;

  if (!uid) {
    const todos = sessionStorage.getItem('todos');
    dispatch(todosActions.setTodos(todos ? JSON.parse(todos) : []));
    return;
  }

  const url = `${baseUrl}/${uid}.json`;

  const transformTodos = (todos: IServerTodos) => {
    const loadedTodos = [];

    for (const todoKey in todos) {
      loadedTodos.push({
        id: todoKey,
        content: todos[todoKey].content,
        completed: todos[todoKey].completed,
      });
    }

    dispatch(todosActions.setTodos(loadedTodos));
  };

  dispatch(todosActions.updateStatus({ status: Statuses.loading, message: 'Загрузка...' }));

  try {
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      transformTodos(data);
      dispatch(todosActions.updateStatus({ status: Statuses.success, message: 'Готово!' }));
    }
  } catch (error) {
    dispatch(todosActions.updateStatus({ status: Statuses.error, message: 'Ошибка!' }));
  }
};
