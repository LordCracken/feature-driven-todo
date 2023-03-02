import { Dispatch } from '@reduxjs/toolkit';
import { todosActions } from './slice';
import { sendTodosRequest } from './utils';
import { GetState } from '../../../app/store';
import { v4 as generateId } from 'uuid';

interface IServerTodos {
  [key: string]: {
    content: string;
    completed: boolean;
  };
}

const baseUrl = 'https://feature-driven-todos-default-rtdb.europe-west1.firebasedatabase.app';

export const getTodos = () => async (dispatch: Dispatch, getState: GetState) => {
  const uid = getState().todos.uid;

  if (!uid) {
    dispatch(todosActions.setTodos(JSON.parse(sessionStorage.getItem('todos') || '')));
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

  const response = await sendTodosRequest(dispatch, { url });
  if (response?.ok) {
    const data = await response.json();
    transformTodos(data);
  }
};

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
