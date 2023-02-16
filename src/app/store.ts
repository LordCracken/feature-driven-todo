import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { todosReducer } from '../features/todos';

const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
