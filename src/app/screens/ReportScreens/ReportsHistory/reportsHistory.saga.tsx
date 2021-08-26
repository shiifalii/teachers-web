import { takeLatest } from 'redux-saga/effects';
import createAPISaga from 'app/helpers/sagas.helper';
import { REPORTS_HISTORY } from './reportsHistory.actions';
import { fetchHistoryReducer } from './reportsHistory.reducer';
import { getReportsHistory } from 'app/helpers/private.api.helper';

const fetchHistorySaga = createAPISaga(fetchHistoryReducer);

function* fetchReports({ type, payload }: any) {
  try {
    yield fetchHistorySaga(getReportsHistory, payload, (data: any) => {
      data.data.page = payload.pageNumber;
      return data.data;
    });
  } catch (error) {
    console.log(error);
  }
}

export default [takeLatest(REPORTS_HISTORY, fetchReports)];
