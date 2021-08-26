import { createAction } from '@reduxjs/toolkit';
import {
  FETCH_CPP_TESTS,
  FETCH_ASSIGNMENT_HISTORY,
  FETCH_BATCH_STUDENTS,
  FETCH_BATCH_SUMMARY,
  FETCH_BATCH_STUDENT_LIST,
  CPP_ASSIGN_TEST,
  FETCH_CPP_TEST_DETAILS,
  CPP_SNACKBAR,
} from './cpp.actionTypes';

export const fetchCppTests = createAction(FETCH_CPP_TESTS, function prepare(
  payload,
) {
  return {
    payload,
  };
});

export const fetchAssignmentHistory = createAction(
  FETCH_ASSIGNMENT_HISTORY,
  function prepare(payload) {
    return {
      payload,
    };
  },
);

export const fetchBatchStudents = createAction(
  FETCH_BATCH_STUDENTS,
  function prepare(payload) {
    return {
      payload,
    };
  },
);

export const fetchBatchSummary = createAction(
  FETCH_BATCH_SUMMARY,
  function prepare(payload) {
    return {
      payload,
    };
  },
);

export const fetchCppTestDeatils = createAction(
  FETCH_CPP_TEST_DETAILS,
  function prepare(payload) {
    return {
      payload,
    };
  },
);

export const fetchBatchStudentList = createAction(
  FETCH_BATCH_STUDENT_LIST,
  function prepare(payload) {
    return {
      payload,
    };
  },
);

export const cppAssignTest = createAction(CPP_ASSIGN_TEST, function prepare(
  payload,
) {
  return {
    payload,
  };
});

export const cppSnackbar = createAction(CPP_SNACKBAR, function prepare(
  payload,
) {
  return {
    payload,
  };
});
