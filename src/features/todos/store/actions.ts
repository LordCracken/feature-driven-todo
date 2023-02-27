import { Dispatch } from '@reduxjs/toolkit';
import { todosActions } from './slice';
import { sendTodosRequest } from './utils';

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

export const getTodos = () => async (dispatch: Dispatch) => {
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

  const response = await sendTodosRequest(dispatch, { url });
  if (response?.ok) {
    const data = await response.json();
    transformTodos(data);
  }
};

export const sendNewTodo = (todoContent: string) => {
  return async (dispatch: Dispatch) => {
    const headers = {
      'Content-Type': 'application/json',
    };

    const createTodo = (todoContent: string, todoData: ITodoData) => {
      const generatedId = todoData.name;
      const createdTodo = {
        id: generatedId,
        content: todoContent,
        completed: false,
      };

      dispatch(todosActions.addNewTodo(createdTodo));
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
      createTodo(todoContent, data);
    }
  };
};

export const removeTodo = (todoId: UniqueID) => {
  return async (dispatch: Dispatch) => {
    const todoUrl = url.split('.json').at(0) + `/${todoId}.json`;

    const response = await sendTodosRequest(
      dispatch,
      { url: todoUrl, method: 'DELETE' },
      'Задача удалена',
      'Не удалось удалить задачу',
    );
    if (response?.ok) dispatch(todosActions.removeTodo(todoId));
  };
};

export const checkTodo = (todoId: UniqueID, completed: boolean) => {
  return async (dispatch: Dispatch) => {
    const todoUrl = url.split('.json').at(0) + `/${todoId}.json`;
    const headers = {
      'Content-Type': 'application/json',
    };

    const response = await sendTodosRequest(dispatch, {
      url: todoUrl,
      method: 'PATCH',
      headers,
      body: { completed: !completed },
    });
    if (response?.ok) dispatch(todosActions.checkTodo(todoId));
  };
};
