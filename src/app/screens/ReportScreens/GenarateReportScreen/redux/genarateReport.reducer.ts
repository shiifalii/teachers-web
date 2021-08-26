import createApiReducer from 'app/stores/api.reducer';
import { combineReducers } from 'redux';

export const fetchBatchesReducer = 'fetchBatches';

const fetchBatchesSlice = createApiReducer(fetchBatchesReducer, []);

export const getAssignmentsReducer = 'getAssignments';

const getAssignmentsSlice = createApiReducer(getAssignmentsReducer, [], {
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

export const getBatchesActions = { ...fetchBatchesSlice.actions };
export const getAssignmentsActions = { ...getAssignmentsSlice.actions };

export default combineReducers({
  getBatches: fetchBatchesSlice.reducer,
  getAssignments: getAssignmentsSlice.reducer,
});
