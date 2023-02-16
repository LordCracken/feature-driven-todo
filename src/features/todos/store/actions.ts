import { Dispatch } from '@reduxjs/toolkit';
import { todosActions } from './slice';
import { ISendRequest } from '../../../shared/hooks/use-http';

interface IServerTodos {
  [key: string]: {
    content: string;
    completed: boolean;
  };
}

interface ITodoData {
  name: UniqueID;
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

export const sendNewTodo = (todoContent: string, sendRequest: ISendRequest) => {
  return (dispatch: Dispatch) => {
    const headers = {
      'Content-Type': 'application/json',
    };

    const createTodo = (todoContent: string, todoData: unknown) => {
      const data = todoData as ITodoData;
      const generatedId = data.name;
      const createdTodo = {
        id: generatedId,
        content: todoContent,
        completed: false,
      };

      dispatch(todosActions.addNewTodo(createdTodo));
    };

    sendRequest(
      { url, method: 'POST', headers, body: { content: todoContent } },
      createTodo.bind(null, todoContent),
    );
  };
};
