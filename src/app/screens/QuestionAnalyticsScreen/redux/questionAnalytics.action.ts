import { createAction } from '@reduxjs/toolkit';
import { FETCH_QUESTION_ANALYTICS } from './questionAnalytics.types';

export const fetchQuestionAnalytics = createAction(
  FETCH_QUESTION_ANALYTICS,
  function prepare(payload) {
    return {
      payload,
    };
  },
);
