import { takeLatest } from 'redux-saga/effects';
import { FETCH_QUESTION_ANALYTICS } from './questionAnalytics.types';
import createAPISaga from 'app/helpers/sagas.helper';
import { questionAnalyticsReducerName } from './questionAnalytics.reducer';
import { getQuestionAnalytics } from 'app/helpers/private.api.helper';

const fetchQuestionsSaga = createAPISaga(questionAnalyticsReducerName);

function* fetchQuetionAnalytics({ type, payload }: any) {
  try {
    yield fetchQuestionsSaga(getQuestionAnalytics, payload);
  } catch (error) {
    console.log(error);
  }
}

export default [takeLatest(FETCH_QUESTION_ANALYTICS, fetchQuetionAnalytics)];
