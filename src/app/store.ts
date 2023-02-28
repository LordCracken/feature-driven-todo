import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { todosReducer } from '../features/todos';
import { userReducer } from '../features/user';

const store = configureStore({
  reducer: {
    todos: todosReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
