import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';
import {StateType} from '@redux/store';
import {HistoryRoom, Room} from '@shared/types/Room';

type State = {
  views: HistoryRoom[];
  calls: HistoryRoom[];
};

const initialState: State = {
  calls: [],
  views: [],
};

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addCallHistory(state: State, action: PayloadAction<Room>) {
      state.calls.push({
        ...action.payload,
        addedAt: new Date().toISOString(),
      });
    },
    addViewsHistory(state: State, action: PayloadAction<Room>) {
      state.views.push({
        ...action.payload,
        addedAt: new Date().toISOString(),
      });
    },
    clearCallsHistory(state: State) {
      state.calls = [];
    },
    clearViewsHistory(state: State) {
      state.views = [];
    },
  },
});

export const useGetCallsHistory = () => {
  return useSelector((state: StateType) => state.history.calls);
};

export const useGetViewsHistory = () => {
  return useSelector((state: StateType) => state.history.views);
};

export const {
  addCallHistory,
  addViewsHistory,
  clearCallsHistory,
  clearViewsHistory,
} = historySlice.actions;

const historyReducer = historySlice.reducer;
export default historyReducer;
