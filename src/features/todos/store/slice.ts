import { createSlice } from '@reduxjs/toolkit';

export enum TodosStatuses {
  success,
  loading,
  error,
}

export interface ITodo {
  id: UniqueID;
  content: string;
  completed: boolean;
}

interface ITodosSlice {
  list: ITodo[];
  status?: TodosStatuses;
  statusMsg?: string;
}

const todosSlice = createSlice({
  name: 'todos',
  initialState: { list: [] } as ITodosSlice,
  reducers: {
    updateStatus: (state, action) => {
      state.status = action.payload.status;
      state.statusMsg = action.payload.message;
    },
    setTodos: (state, action) => {
      state.list = action.payload;
    },
    checkTodo: (state, action) => {
      const todo = state.list.find(item => item.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    addNewTodo: (state, action) => {
      state.list.push(action.payload);
    },
    removeTodo: (state, action) => {
      state.list = state.list.filter(todo => todo.id !== action.payload);
    },
  },
});

export const todosActions = todosSlice.actions;
export const todosReducer = todosSlice.reducer;
