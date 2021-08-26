// import createApiReducer from '../../stores/api.reducer';
import { combineReducers } from 'redux';
import { createSlice } from '@reduxjs/toolkit';
export const organizationReducerName = 'organizations';
export const organizationCentersName = 'organizationCenters';

const initStateLogin = {
  userId: '',
  password: '',
  userIdForgetPassword: '',
  isLoggedIn: false,
};

const loginSlice = createSlice({
  name: 'login',
  initialState: initStateLogin,
  reducers: {
    setUserId: (state, action) => ({ ...state, userId: action.payload }),
    setPassword: (state, action) => ({ ...state, password: action.payload }),
    setUserIdForgetPassword: (state, action) => ({
      ...state,
      userIdForgetPassword: action.payload,
    }),
    resetState: () => initStateLogin,
    setIsLoggedIn: (state, action) => ({
      ...state,
      isLoggedIn: action.payload,
    }),
  },
});

export const loginActions = loginSlice.actions;

const loginReducer = combineReducers({
  login: loginSlice.reducer,
});

export const LoginReducer = typeof loginReducer;
export default loginReducer;
