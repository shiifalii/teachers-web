import createApiReducer from 'app/stores/api.reducer';
import { combineReducers } from 'redux';

export const fetchHistoryReducer = 'fetchHistory';

const fetchHistorySlice = createApiReducer(fetchHistoryReducer, [], {
  extraReducers: () => {},
  applyPayload: (payload: any, stateData: any) =>
    payload.page === 1 ? payload : buildData(payload, stateData),
});

const buildData = (payload: any, stateData: any) => {
  const newList = stateData.list.concat(payload.list);
  payload.pageInfo = stateData.pageInfo;
  payload.list = newList;
  return payload;
};

export const getBatchesActions = { ...fetchHistorySlice.actions };

export default combineReducers({
  reportsHistory: fetchHistorySlice.reducer,
});
