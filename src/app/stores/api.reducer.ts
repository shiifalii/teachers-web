import { createSlice, ActionReducerMapBuilder } from '@reduxjs/toolkit';

export enum API_STATE {
  INIT,
  LOADING,
  LOADED,
  ERROR,
  FAILED,
}

export interface ApiInterface {
  apiState: API_STATE;
  data: any;
  error: string;
}

interface OptionsInterface {
  applyPayload: any;
  extraReducers: (builder: ActionReducerMapBuilder<any>) => void;
}

const defaultApplyPayload = (payload: any) => payload;

export default function createApiReducer(
  reducerName: string,
  initData: any,
  { applyPayload, extraReducers }: OptionsInterface = {
    applyPayload: defaultApplyPayload,
    extraReducers: () => {},
  },
) {
  // Defining initial state
  const initialState = {
    apiState: API_STATE.INIT,
    data: initData,
    error: '',
  };

  return createSlice({
    name: reducerName,
    initialState,
    reducers: {
      [`${reducerName}Init`]: () => initialState,
      [`${reducerName}Loading`]: (state: ApiInterface) => ({
        ...state,
        apiState: API_STATE.LOADING,
      }),
      [`${reducerName}Loaded`]: (state: ApiInterface, action) => ({
        error: '',
        apiState: API_STATE.LOADED,
        data: applyPayload(action.payload, state.data),
      }),
      [`${reducerName}Error`]: (state: ApiInterface, action) => ({
        ...state,
        apiState: API_STATE.ERROR,
        error: action.payload,
      }),
      [`${reducerName}Failed`]: (state: ApiInterface, action) => ({
        ...state,
        apiState: API_STATE.FAILED,
        error: action.payload,
      }),
    },
    extraReducers,
  });
}
