import createApiReducer from '../../stores/api.reducer';
import { combineReducers } from 'redux';

export const testDetailsReducerName = 'testDetails';
export const testAnalyticsReducerName = 'testAnalytics';

const testDetailsSlice = createApiReducer(testDetailsReducerName, []);
const testAnalyticsSlice = createApiReducer(testAnalyticsReducerName, {});

const { reducer, actions } = testDetailsSlice;

export const testDetailsActions = { ...actions };
export const testAnalyticsActions = { ...testAnalyticsSlice.actions };

export default combineReducers({
  testDetails: reducer,
  testAnalytics: testAnalyticsSlice.reducer,
});
