import { Dispatch } from '@reduxjs/toolkit';
import { todosActions } from './slice';
import { ISendRequest } from '../../../shared/hooks/use-http';

interface IServerTodos {
  [key: string]: {
    content: string;
    completed: boolean;
  };
}

const url =
  'https://feature-driven-todos-default-rtdb.europe-west1.firebasedatabase.app/todos.json';

export const getTodos = (sendRequest: ISendRequest) => (dispatch: Dispatch) => {
  const transformTodos = (todos: unknown) => {
    const loadedTodos = [];
    const data = todos as IServerTodos;

    for (const todoKey in data) {
      loadedTodos.push({
        id: todoKey,
        content: data[todoKey].content,
        completed: data[todoKey].completed,
      });
    }

    dispatch(todosActions.setTodos(loadedTodos));
  };

  sendRequest({ url }, transformTodos);
};
