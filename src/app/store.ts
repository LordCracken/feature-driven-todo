import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import todosSlice from '../features/todos/store';

const store = configureStore({
  reducer: {
    todos: todosSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
