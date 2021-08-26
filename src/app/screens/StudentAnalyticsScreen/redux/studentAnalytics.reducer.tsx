import createApiReducer from 'app/stores/api.reducer';
import { combineReducers } from 'redux';

export const studentAnalyticsReducerName = 'studentAnalytics';

const studentAnalyticsSlice = createApiReducer(studentAnalyticsReducerName, []);

const { reducer, actions } = studentAnalyticsSlice;

export const studentAnalyticsActions = { ...actions };

export default combineReducers({
  studentAnalytics: reducer,
});
