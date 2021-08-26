import createApiReducer from 'app/stores/api.reducer';
import { combineReducers } from 'redux';
import { createSlice } from '@reduxjs/toolkit';

export const cppTestsReducerName = 'cppTests';

const cppTests = createApiReducer(cppTestsReducerName, null, {
  extraReducers: () => {},
  applyPayload: (payload: any, stateData: any) =>
    payload.page === 1 ? payload : buildData(payload, stateData),
});

const buildData = (payload: any, stateData: any) => {
  const newList = stateData.tests.concat(payload.tests);
  payload.testsCount = stateData.testsCount;
  payload.tests = newList;
  return payload;
};

export const fetchAssignmentsReducerName = 'fetchAssignmentsHistory';
const fetchHistorySlice = createApiReducer(
  fetchAssignmentsReducerName,
  {},
  {
    applyPayload: (response: any[], state: any) => ({ ...state, ...response }),
    extraReducers: () => {},
  },
);

export const cppTestsActions = {
  ...cppTests.actions,
};

export const fetchStudentsBatchReducerName = 'fetchBatchStudents';
const fetchBatchStudentSlice = createApiReducer(
  fetchStudentsBatchReducerName,
  [],
);

export const fetchBatchStudentsAction = { ...fetchBatchStudentSlice.actions };

export const fetchBatchSummaryReducerName = 'fetchBatchSummary';
const fetchBatchSummarySlice = createApiReducer(
  fetchBatchSummaryReducerName,
  null,
);

export const fetchBatchStudentListReducerName = 'fetchBatchStudentList';
const fetchBatchStudentListSlice = createApiReducer(
  fetchBatchStudentListReducerName,
  null,
);

export const cppAssignTestReducerName = 'cppAssignTest';
const cppAssignTestSlice = createApiReducer(cppAssignTestReducerName, null);

export const fetchCppTestDeatilsReducer = 'fetchCppTestDetails';
const fetchCppTestDetailsSlice = createApiReducer(
  fetchCppTestDeatilsReducer,
  [],
);

export const fetchCppTestDetailsAction = {
  ...fetchCppTestDetailsSlice.actions,
};

export const cppSnackbarReducerName = 'cppSnackbar';
export const cppSnackbarSlice = createSlice({
  name: cppSnackbarReducerName,
  initialState: { type: null, message: null, show: false },
  reducers: {
    [`${cppSnackbarReducerName}Init`]: () => ({
      type: null,
      message: null,
      show: false,
    }),
    [`${cppSnackbarReducerName}Update`]: (state: any, action: any) =>
      action.payload,
  },
});
export const cppSnackbarActions = { ...cppSnackbarSlice.actions };

export default combineReducers({
  cppTests: cppTests.reducer,
  assignmentHistory: fetchHistorySlice.reducer,
  studentsList: fetchBatchStudentSlice.reducer,
  batchSummary: fetchBatchSummarySlice.reducer,
  batchStudentList: fetchBatchStudentListSlice.reducer,
  cppAssignTest: cppAssignTestSlice.reducer,
  cppTestDetail: fetchCppTestDetailsSlice.reducer,
  cppSnackbar: cppSnackbarSlice.reducer,
});
