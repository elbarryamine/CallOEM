import {configureStore} from '@reduxjs/toolkit';
import userReducer from '@redux/user';

const store = configureStore({
  reducer: {
    auth: userReducer,
  },
});

export type StateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
