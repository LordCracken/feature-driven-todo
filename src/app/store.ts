import { configureStore } from '@reduxjs/toolkit';

import { todosReducer } from '../features/todos';
import { userReducer } from '../features/user';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    user: userReducer,
  },
});
