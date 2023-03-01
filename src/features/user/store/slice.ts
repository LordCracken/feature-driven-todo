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
    signIn: (state, action) => {
      state.id = action.payload;
      state.isModalOpen = false;
    },
    signOut: () => initialState,
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
