import createApiReducer from 'app/stores/api.reducer';
import { combineReducers } from 'redux';

export const questionAnalyticsReducerName = 'questionAnalytics';

const questionAnalyticsSlice = createApiReducer(
  questionAnalyticsReducerName,
  [],
);

const { reducer, actions } = questionAnalyticsSlice;

export const questionAnalyticsActions = { ...actions };

export default combineReducers({
  questionAnalytics: reducer,
});
