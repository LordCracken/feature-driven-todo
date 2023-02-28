import { createSlice } from '@reduxjs/toolkit';

interface IUser {
  name: string;
  authToken: UniqueID;
  isModalOpen: boolean;
}

const userSlice = createSlice({
  name: 'user',
  initialState: { name: '', authToken: '', isModalOpen: false } as IUser,
  reducers: {
    switchModal: state => {
      state.isModalOpen = !state.isModalOpen;
    },
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
