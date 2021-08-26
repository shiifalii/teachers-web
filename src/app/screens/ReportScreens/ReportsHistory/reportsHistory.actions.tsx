import { createAction } from '@reduxjs/toolkit';
export const REPORTS_HISTORY = 'REPORTS_HISTORY';

export const getHistory = createAction(REPORTS_HISTORY, function prepare(
  payload,
) {
  return {
    payload,
  };
});
