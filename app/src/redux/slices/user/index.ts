import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';
import {StateType} from '@redux/store';

type User = {
  user: {
    id: string;
    username: string;
    email: string;
    isEmailVerified: boolean;
    joinedAt: Date;
    avatar: string;
  };
  token: string;
};

interface State {
  user: User | null;
}
const initialState: State = {
  user: null,
};

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state: State, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    removeUser(state: State) {
      state.user = null;
    },
  },
});

export const useGetUser = () => {
  return useSelector((state: StateType) => state.auth.user);
};
export const {setUser, removeUser} = userSlice.actions;
export default userSlice.reducer;
