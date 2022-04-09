import axios from 'axios';
import { UserType } from '../../types/User';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { isAuthenticate } from '../../utils/localstorage';

interface UserState {
  token: string;
  value: any;
  loading: boolean
}

const initialState: UserState = {
  token: "",
  value: isAuthenticate()?.user,
  loading: false,
}

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<any>) {
      const user = action.payload;
      state.value = user.user;
      state.token = user.token;
    },
    removeUser(state) {
      state.value = null;
      state.token = "";
    },
  },
})

export const { login, removeUser } = user.actions
export default user.reducer
