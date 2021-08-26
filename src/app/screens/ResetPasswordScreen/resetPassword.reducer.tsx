// import createApiReducer from '../../stores/api.reducer';
import { combineReducers } from 'redux';
import { createSlice } from '@reduxjs/toolkit';

const initStateLogin = {
  newPassword: '',
  confirmPassword: '',
  isPasswordResetSuccessful: false,
};

const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState: initStateLogin,
  reducers: {
    setNewPassword: (state, action) => ({
      ...state,
      newPassword: action.payload,
    }),
    setConfirmPassword: (state, action) => ({
      ...state,
      confirmPassword: action.payload,
    }),
    resetState: () => initStateLogin,
    setIsPasswordResetSuccessful: (state, action) => ({
      ...state,
      isPasswordResetSuccessful: action.payload,
    }),
  },
});

export const resetPasswordActions = resetPasswordSlice.actions;

const resetPasswordReducer = combineReducers({
  resetPassword: resetPasswordSlice.reducer,
});

export const ResetPasswordReducer = typeof resetPasswordReducer;
export default resetPasswordReducer;
