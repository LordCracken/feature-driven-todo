import { createSlice } from '@reduxjs/toolkit';

interface IUser {
  id: UniqueID;
  isModalOpen: boolean;
}

const initialState: IUser = { id: '', isModalOpen: false };

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    switchModal: state => {
      state.isModalOpen = !state.isModalOpen;
    },
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
