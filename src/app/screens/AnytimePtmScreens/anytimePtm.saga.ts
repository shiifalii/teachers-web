import {
  studentSearchListReducerName,
  studentProfileSummaryReducerName,
  studentProfileAssignmentsReducerName,
  studentProfileConceptsReducerName,
  studentRecentSearchListReducerName,
  addStudentSearchEventReducerName,
} from './anytimePtm.reducer';
import { takeLatest } from 'redux-saga/effects';
import {
  FETCH_STUDENT_LIST_BY_KEYWORD,
  FETCH_STUDENT_PROFILE_SUMMARY,
  FETCH_STUDENT_CONCEPTS,
  FETCH_STUDENT_ASSIGNMENTS,
  FETCH_STUDENT_RECENT_SEARCH_LIST,
  ADD_STUDENT_SEARCH_EVENT,
} from './anytimePtm.actionTypes';
import createAPISaga from 'app/helpers/sagas.helper';
import {
  fetchStudentsFromKeyword,
  fetchStudentProfileSummary,
  fetchStudentProfileAssignments,
  fetchStudentProfileConcepts,
  fetchStudentRecentSearchList as fetchStudentRecentSearchListApi,
  addStudentRecentSearchEvent,
} from 'app/helpers/private.api.helper';
import { take } from 'lodash';

const studentSearchListSaga = createAPISaga(studentSearchListReducerName);

function* fetchStudentSearchList({ payload }: any) {
  try {
    yield studentSearchListSaga(
      fetchStudentsFromKeyword,
      payload,
      ({ data: { students } }: any) => students,
    );
  } catch (error) {
    console.log(error);
  }
}

const studentProfileSaga = createAPISaga(studentProfileSummaryReducerName);

function* fetchStudentProfile({ payload }: any) {
  try {
    yield studentProfileSaga(
      fetchStudentProfileSummary,
      payload,
      ({ data }: any) => data,
    );
  } catch (error) {
    console.log(error);
  }
}

const studentAssignmentsSaga = createAPISaga(
  studentProfileAssignmentsReducerName,
);

function* fetchStudentAssignments({ payload }: any) {
  try {
    yield studentAssignmentsSaga(
      fetchStudentProfileAssignments,
      payload,
      ({ data: { assignments } }: any) => assignments,
    );
  } catch (error) {
    console.log(error);
  }
}

const studentConceptsSaga = createAPISaga(studentProfileConceptsReducerName);

function* fetchStudentConcepts({ payload }: any) {
  try {
    yield studentConceptsSaga(
      fetchStudentProfileConcepts,
      payload,
      ({ data: { concepts } }: any) => concepts,
    );
  } catch (error) {
    console.log(error);
  }
}

const studentRecentSearchListSaga = createAPISaga(
  studentRecentSearchListReducerName,
);

function* fetchStudentRecentSearchList({ payload }: any) {
  try {
    yield studentRecentSearchListSaga(
      fetchStudentRecentSearchListApi,
      payload,
      ({ data: { events } }: any) => events,
    );
  } catch (error) {
    console.log(error);
  }
}

// No reducer as we don't need the save the result
function* studentAddSearchEvent({ payload }: any) {
  try {
    yield addStudentRecentSearchEvent(payload);
  } catch (error) {
    console.log(error);
  }
}

export default [
  takeLatest(FETCH_STUDENT_LIST_BY_KEYWORD, fetchStudentSearchList),
  takeLatest(FETCH_STUDENT_PROFILE_SUMMARY, fetchStudentProfile),
  takeLatest(FETCH_STUDENT_ASSIGNMENTS, fetchStudentAssignments),
  takeLatest(FETCH_STUDENT_CONCEPTS, fetchStudentConcepts),
  takeLatest(FETCH_STUDENT_RECENT_SEARCH_LIST, fetchStudentRecentSearchList),
  takeLatest(ADD_STUDENT_SEARCH_EVENT, studentAddSearchEvent),
];
