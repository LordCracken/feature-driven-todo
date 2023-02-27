import { createSlice } from '@reduxjs/toolkit';

export interface ITodo {
  id: UniqueID;
  content: string;
  completed: boolean;
}

const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as ITodo[],
  reducers: {
    setTodos: (_state, action) => {
      return action.payload;
    },
    checkTodo: (state, action) => {
      const todo = state.find(item => item.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    addNewTodo: (state, action) => {
      return state.concat(action.payload);
    },
    removeTodo: (state, action) => {
      return state.filter(todo => todo.id !== action.payload);
    },
  },
});

export const todosActions = todosSlice.actions;
export const todosReducer = todosSlice.reducer;
