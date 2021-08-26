import { connect } from 'react-redux';

import TestEvaluationScreen from './testEvaluation.screen';
import { ROUTE_TYPE } from 'app/constants/route.constant';
import { RootState } from 'app/stores/configure.store';
import AuthHoc from 'app/components/hoc/auth.hoc';
import {
  studentSummaryActions,
  testEvaluationActions,
  studentSummaryReducerName,
  testEvaluationReducerName,
  submitEvaluationActions,
  submitEvaluationReducerName,
} from '../assessments.reducer';
import {
  fetchStudentSummary,
  resetUnsavedChanges,
  marksAssigned,
  pdfModified,
  syncEvaluation,
  submitEvaluation,
  fetchTeachersPDF,
  toggleSubmitSummary,
} from '../assessments.actions';

const mapState = (state: RootState) => {
  return {
    studentSummary: state.subjectiveAssessment.studentSummary,
    studentSummaryData: state.subjectiveAssessment.studentSummary.data,
    testEvaluation: state.subjectiveAssessment.testEvaluation, // contains apiState info for sync and marks award api
    testEvaluationData: state.subjectiveAssessment.testEvaluation.data,
    teachersPdf: state.subjectiveAssessment.teachersPdf,
    submitEvaluationState: state.subjectiveAssessment.submitEvaluation,
    teachersPdfData: state.subjectiveAssessment.teachersPdf.data,
  };
};

const mapDispatch = {
  fetchStudentSummary,
  resetStudentSummaryApi:
    studentSummaryActions[`${studentSummaryReducerName}Init`],
  resetTestEvaluationApi:
    testEvaluationActions[`${testEvaluationReducerName}Init`],
  resetSubmitEvaluationState:
    submitEvaluationActions[`${submitEvaluationReducerName}Init`],
  fetchTeachersPDF,
  resetUnsavedChanges,
  marksAssigned,
  pdfModified,
  syncEvaluation,
  submitEvaluation,
  toggleSubmitSummary,
};

const authLayer = AuthHoc({
  type: ROUTE_TYPE.private,
  screen: TestEvaluationScreen,
});

const conector = connect(mapState, mapDispatch);

export default conector(authLayer);
