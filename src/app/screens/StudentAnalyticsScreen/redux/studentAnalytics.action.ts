import { createAction } from '@reduxjs/toolkit';
import { FETCH_STUDENT_ANALYTICS } from './studentAnalytics.types';

export const fetchStudentAnalytics = createAction(
  FETCH_STUDENT_ANALYTICS,
  function prepare(payload) {
    return {
      payload,
    };
  },
);
