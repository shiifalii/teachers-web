import { takeLatest } from 'redux-saga/effects';
import { FETCH_STUDENT_ANALYTICS } from './studentAnalytics.types';
import createAPISaga from 'app/helpers/sagas.helper';
import { studentAnalyticsReducerName } from './studentAnalytics.reducer';
import { getStudentAnalytics } from 'app/helpers/private.api.helper';

const fetchStudentsSaga = createAPISaga(studentAnalyticsReducerName);

function* fetchStudentAnalytics({ type, payload }: any) {
  try {
    yield fetchStudentsSaga(getStudentAnalytics, payload);
  } catch (error) {
    console.log(error);
  }
}

export default [takeLatest(FETCH_STUDENT_ANALYTICS, fetchStudentAnalytics)];
