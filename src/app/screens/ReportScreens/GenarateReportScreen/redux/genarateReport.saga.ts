import { takeLatest, takeEvery } from 'redux-saga/effects';
import createAPISaga from 'app/helpers/sagas.helper';
import { FETCH_BATCHES, FETCH_ASSIGNMENTS } from './genarateReport.types';
import { fetchBatchesReducer } from './genarateReport.reducer';
import { getAssignmentsReducer } from './genarateReport.reducer';
import { getAllAssignments } from 'app/helpers/private.api.helper';
import { getAllBatches } from 'app/helpers/private.api.helper';

const fetchAssignmentSaga = createAPISaga(getAssignmentsReducer);

function* fetchAssignment({ type, payload }: any) {
  try {
    const totalAssignments = [];
    const payloadToPass = JSON.parse(JSON.stringify(payload));
    yield fetchAssignmentSaga(getAllAssignments, payloadToPass, (data: any) => {
      data.data.page = payloadToPass.pageNumber;
      return data.data;
    });
  } catch (error) {
    console.log(error);
  }
}

const fetchBatchesSaga = createAPISaga(fetchBatchesReducer);

function* fetchBatch({ type, payload }: any) {
  try {
    const payloadToPass = JSON.parse(JSON.stringify(payload));
    yield fetchBatchesSaga(getAllBatches, payloadToPass, (data: any) => {
      data.data.page = payloadToPass.pageNumber;
      return data.data;
    });
  } catch (error) {
    console.log(error);
  }
}

export default [
  takeEvery(FETCH_ASSIGNMENTS, fetchAssignment),
  takeLatest(FETCH_BATCHES, fetchBatch),
];
