import { createSlice } from '@reduxjs/toolkit';

export interface ITodo {
  id: UniqueID;
  content: string;
  completed: boolean;
}

const todosSlice = createSlice({
  name: 'todos',
  initialState: [
    { id: '0', content: 'Create Todos App', completed: false },
    { id: '1', content: 'Learn React', completed: true },
  ] as ITodo[],
  reducers: {
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
export default todosSlice.reducer;
