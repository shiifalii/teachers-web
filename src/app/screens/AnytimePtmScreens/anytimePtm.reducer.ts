import createApiReducer from 'app/stores/api.reducer';
import { combineReducers } from 'redux';

export const studentSearchListReducerName = 'studentList';
export const studentProfileSummaryReducerName = 'studentProfileSummary';
export const studentProfileAssignmentsReducerName = 'studentProfileAssignments';
export const studentProfileConceptsReducerName = 'studentProfileConcepts';
export const studentRecentSearchListReducerName = 'studentRecentSearchList';
export const addStudentSearchEventReducerName = 'addStudentSearchEvent';

const studentSearchList = createApiReducer(studentSearchListReducerName, []);

const studentProfileSummary = createApiReducer(
  studentProfileSummaryReducerName,
  {},
);

const studentProfileAssignments = createApiReducer(
  studentProfileAssignmentsReducerName,
  [],
  {
    // Keep on accumulating data for infinite scrolling
    applyPayload: (response: any[], state: any[]) => [...state, ...response],
    extraReducers: () => {},
  },
);
const studentProfileConcepts = createApiReducer(
  studentProfileConceptsReducerName,
  [],
  {
    applyPayload: (response: any[], state: any[]) => [...state, ...response],
    extraReducers: () => {},
  },
);

const studentRecentSearchList = createApiReducer(
  studentRecentSearchListReducerName,
  [],
);

export const studentSearchListActions = {
  ...studentSearchList.actions,
};

export const studentProfileSummaryActions = {
  ...studentProfileSummary.actions,
};

export const studentProfileAssignmentsActions = {
  ...studentProfileAssignments.actions,
};

export const studentProfileConceptsActions = {
  ...studentProfileConcepts.actions,
};

export const studentRecentSearchListActions = {
  ...studentRecentSearchList.actions,
};

export default combineReducers({
  studentList: studentSearchList.reducer,
  studentProfile: studentProfileSummary.reducer,
  studentProfileAssignments: studentProfileAssignments.reducer,
  studentProfileConcepts: studentProfileConcepts.reducer,
  studentRecentSearchList: studentRecentSearchList.reducer,
});
