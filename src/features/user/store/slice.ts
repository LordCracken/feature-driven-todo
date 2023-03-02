import { createSlice } from '@reduxjs/toolkit';
import { Statuses } from '../../../shared/components/Status';

interface IUser {
  id: UniqueID;
  isModalOpen: boolean;
  status?: Statuses;
  statusMsg?: string;
}

const initialState: IUser = { id: '', isModalOpen: false };

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    updateStatus: (state, action) => {
      state.status = action.payload.status;
      state.statusMsg = action.payload.message;
    },
    switchModal: state => {
      state.isModalOpen = !state.isModalOpen;
    },
    signIn: (state, action) => {
      state.id = action.payload;
      state.isModalOpen = false;
    },
    signOut: () => initialState,
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
