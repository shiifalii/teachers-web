import {
  cppTestsReducerName,
  fetchAssignmentsReducerName,
  fetchStudentsBatchReducerName,
  fetchBatchSummaryReducerName,
  fetchBatchStudentListReducerName,
  cppAssignTestReducerName,
  fetchCppTestDeatilsReducer,
  cppSnackbarReducerName,
} from './cpp.reducer';
import { takeLatest, put } from 'redux-saga/effects';
import {
  FETCH_ASSIGNMENT_HISTORY,
  FETCH_BATCH_STUDENTS,
  FETCH_CPP_TESTS,
  FETCH_BATCH_SUMMARY,
  FETCH_BATCH_STUDENT_LIST,
  CPP_ASSIGN_TEST,
  FETCH_CPP_TEST_DETAILS,
  CPP_SNACKBAR,
} from './cpp.actionTypes';
import createAPISaga from 'app/helpers/sagas.helper';
import {
  fetchCppTests as fetchCppTestsApi,
  getAllAssignmentHistoryData,
  getAlStudentsForBatch,
  fetchBatchSummary as fetchBatchSummaryApi,
  fetchBatchStudentList as fetchBatchStudentListApi,
  assignAssignment,
  getCppTestDetail,
} from 'app/helpers/private.api.helper';

const cppTestsSaga = createAPISaga(cppTestsReducerName);

function* fetchCppTests({ payload }: any) {
  try {
    yield cppTestsSaga(fetchCppTestsApi, payload, ({ data }: any) => {
      data.page = payload.offset;
      return data;
    });
  } catch (error) {
    console.log(error);
  }
}

const assignmentHistorySaga = createAPISaga(fetchAssignmentsReducerName);

function* fetchAssignmentHistory({ type, payload }: any) {
  try {
    const payloadToPass: any = JSON.parse(JSON.stringify(payload));
    yield assignmentHistorySaga(
      getAllAssignmentHistoryData,
      payloadToPass,
      ({ data: { assignments } }: any) => ({ [payloadToPass.id]: assignments }),
    );
  } catch (error) {
    console.log(error);
  }
}

const batchStudentsSaga = createAPISaga(fetchStudentsBatchReducerName);

function* FetchStudentsForBaches({ type, payload }: any) {
  try {
    const payloadToPass = JSON.parse(JSON.stringify(payload));
    yield batchStudentsSaga(
      getAlStudentsForBatch,
      payloadToPass,
      (data: any) => {
        data.data.page = payloadToPass.pageNumber;
        return data.data;
      },
    );
  } catch (error) {
    console.log(error);
  }
}

const batchSummarySaga = createAPISaga(fetchBatchSummaryReducerName);
function* fetchBatchSummary({ type, payload }: any) {
  try {
    yield batchSummarySaga(
      fetchBatchSummaryApi,
      payload,
      ({ data }: any) => data,
    );
  } catch (error) {
    console.log(error);
  }
}

const batchStudentListSaga = createAPISaga(fetchBatchStudentListReducerName);
function* fetchBatchStudentList({ type, payload }: any) {
  try {
    yield batchStudentListSaga(
      fetchBatchStudentListApi,
      payload,
      ({ data }: any) => data,
    );
  } catch (error) {
    console.log(error);
  }
}

const cppAssignTestSaga = createAPISaga(cppAssignTestReducerName);
function* cppAssignTest({ type, payload }: any) {
  try {
    yield cppAssignTestSaga(assignAssignment, payload, ({ data }: any) => data);
  } catch (error) {
    console.log(error);
  }
}

const cppTestDetailsSaga = createAPISaga(fetchCppTestDeatilsReducer);
function* cppTestDetail({ type, payload }: any) {
  try {
    const payloadToPass = JSON.parse(JSON.stringify(payload));
    yield cppTestDetailsSaga(getCppTestDetail, payloadToPass, (data: any) => {
      data.data.page = payloadToPass.pageNumber;
      return data.data;
    });
  } catch (error) {
    console.log(error);
  }
}

const cppSnackbarSaga = createAPISaga(cppSnackbarReducerName);
function* cppSnackbar({ type, payload }: any) {
  yield put({ type: `${cppSnackbarReducerName}Loaded`, payload });
}

export default [
  takeLatest(FETCH_CPP_TESTS, fetchCppTests),
  takeLatest(FETCH_ASSIGNMENT_HISTORY, fetchAssignmentHistory),
  takeLatest(FETCH_BATCH_STUDENTS, FetchStudentsForBaches),
  takeLatest(FETCH_BATCH_SUMMARY, fetchBatchSummary),
  takeLatest(FETCH_BATCH_STUDENT_LIST, fetchBatchStudentList),
  takeLatest(CPP_ASSIGN_TEST, cppAssignTest),
  takeLatest(FETCH_CPP_TEST_DETAILS, cppTestDetail),
  // takeLatest(CPP_SNACKBAR, cppSnackbar),
];
