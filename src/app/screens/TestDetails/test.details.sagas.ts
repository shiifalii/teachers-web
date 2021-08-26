import createSaga from '../../helpers/sagas.helper';
import {
  testDetailsReducerName,
  testAnalyticsReducerName,
} from './test.details.reducer';

export const fetchTestDetails = createSaga(testDetailsReducerName);
export const fetchTestAnalytics = createSaga(testAnalyticsReducerName);
