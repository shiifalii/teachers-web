import { Tools } from '@tarik.djurdjevic/react-sketch';
import createApiReducer from 'app/stores/api.reducer';
import { combineReducers } from 'redux';
import testEvaluationExtraReducer from './TestEvaluationScreen/testEvaluation.reducer';
import studentSummaryExtraReducer from './StudentSummaryScreen/studentSummary.reducer';
export const testListReducerName = 'testList';
export const assignedTestCountReducerName = 'assignedTestCount';
export const studentListReducerName = 'studentList';
export const studentSummaryReducerName = 'studentSummary';
export const testEvaluationReducerName = 'testEvaluation';
export const teachersPdfReducerName = 'teachersPdf';
export const submitEvaluationReducerName = 'submitEvaluation';

const testListSlice = createApiReducer(testListReducerName, {});

const assignedTestCountSlice = createApiReducer(
  assignedTestCountReducerName,
  {},
);

const studentListSlice = createApiReducer(studentListReducerName, {});
const studentSummarySlice = createApiReducer(
  studentSummaryReducerName,
  {},
  {
    extraReducers: studentSummaryExtraReducer,
    applyPayload: (payload: any) => payload,
  },
);
export const INITIAL_SKETCH_TOOL = {
  tool: Tools.Pan,
};
const testEvaluationSlice = createApiReducer(
  testEvaluationReducerName,
  {
    unsavedQuestions: [],
    unmodifiedPDFPages: [],
    messages: [], // contains response messages for apis (for progress loader)
    pdfPages: [], // store pdf pages in image format
    sketchRef: null, // refrence to SketchField component
    hiddenSketchRef: null, // reference for hidden sketchfield used for combining pageData
    currentPDFPageIndex: -1, // currentPageindex rendered by SketchField
    selectedSketchTool: INITIAL_SKETCH_TOOL,
    showSubmitSummary: false,
    pdfAnnotated: false,
    isFullScreen: false,
    scales: {
      scaleX: 1,
      scaleY: 1,
    },
    unsavedChangesPresent: false,
  },
  {
    extraReducers: testEvaluationExtraReducer,
    applyPayload: (payload: any) => payload,
  },
);
const teachersPdfSlice = createApiReducer(teachersPdfReducerName, {});
const submitEvaluationSlice = createApiReducer(submitEvaluationReducerName, {});

// Actions created by redux toolkit
export const testListActions = { ...testListSlice.actions };
export const assignedTestCountActions = { ...assignedTestCountSlice.actions };
export const studentListActions = { ...studentListSlice.actions };
export const studentSummaryActions = { ...studentSummarySlice.actions };
export const testEvaluationActions = { ...testEvaluationSlice.actions };
export const teachersPdfActions = { ...teachersPdfSlice.actions };
export const submitEvaluationActions = { ...submitEvaluationSlice.actions };

export default combineReducers({
  testList: testListSlice.reducer,
  assignedTestCount: assignedTestCountSlice.reducer,
  studentList: studentListSlice.reducer,
  studentSummary: studentSummarySlice.reducer,
  testEvaluation: testEvaluationSlice.reducer,
  teachersPdf: teachersPdfSlice.reducer,
  submitEvaluation: submitEvaluationSlice.reducer,
});
