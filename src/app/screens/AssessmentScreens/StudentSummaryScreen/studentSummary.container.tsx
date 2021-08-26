import { connect } from 'react-redux';

import StudentSummaryScreen from './studentSummary.screen';
import { ROUTE_TYPE } from 'app/constants/route.constant';
import { RootState } from 'app/stores/configure.store';
import AuthHoc from 'app/components/hoc/auth.hoc';
import {
  studentSummaryActions,
  studentSummaryReducerName,
} from '../assessments.reducer';
import { fetchStudentSummary } from '../assessments.actions';

const mapState = (state: RootState) => {
  return {
    studentSummary: state.subjectiveAssessment.studentSummary,
    studentSummaryData: state.subjectiveAssessment.studentSummary.data,
  };
};

const mapDispatch = {
  fetchStudentSummary,
  resetStudentSummaryApi:
    studentSummaryActions[`${studentSummaryReducerName}Init`],
};

const authLayer = AuthHoc({
  type: ROUTE_TYPE.private,
  screen: StudentSummaryScreen,
});

const conector = connect(mapState, mapDispatch);

export default conector(authLayer);
