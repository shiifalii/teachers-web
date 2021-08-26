import { createSlice } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

export enum API_STATE {
  INIT,
  LOADING,
  LOADED,
  ERROR,
  FAILED,
}

interface ApiInterface {
  apiState: API_STATE;
  data: any;
  error: string;
}

// Defining initial state
const initialState = {
  apiState: API_STATE.INIT,
  data: {
    unreadCount: 0,
    list: [],
  },
  error: '',
};

export const notificationReducerName = 'notifications';

const notificationSlice = createSlice({
  name: notificationReducerName,
  initialState,
  reducers: {
    notificationsInit: () => initialState,
    notificationsLoading: (state: ApiInterface) => {
      state.apiState = API_STATE.LOADING;
    },
    notificationsLoaded: (state: ApiInterface, action) => {
      const newList = state.data.list.concat(action.payload.list);
      state.data = { ...state.data, ...action.payload, list: newList };
      state.error = '';
      state.apiState = API_STATE.LOADED;
    },
    unreadCountLoaded: (state: ApiInterface, action) => {
      state.data.unreadCount = action.payload;
    },
    notificationViewed: (state: ApiInterface, action) => {
      state.data.list[action.payload].isViewed = true;
    },
    notificationsError: (state: ApiInterface, action) => {
      state.apiState = API_STATE.ERROR;
      state.error = action.payload;
    },
    notificationsFailed: (state: ApiInterface, action) => {
      state.apiState = API_STATE.FAILED;
      state.error = action.payload;
    },
  },
});

export const notificationActions = notificationSlice.actions;

export default combineReducers({
  notifications: notificationSlice.reducer,
});
