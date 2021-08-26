import { createAction } from '@reduxjs/toolkit';
import { FETCH_BATCHES } from './genarateReport.types';
import { FETCH_ASSIGNMENTS } from './genarateReport.types';

export const fetchAllBatches = createAction(FETCH_BATCHES, function prepare(
  payload,
) {
  return {
    payload,
  };
});

export const fetchAllAssignments = createAction(
  FETCH_ASSIGNMENTS,
  function prepare(payload) {
    return {
      payload,
    };
  },
);
