import React from 'react';
import AuthHoc from 'app/components/hoc/auth.hoc';
import { RootState } from '../../../stores/configure.store';
import { connect } from 'react-redux';
import { ROUTE_TYPE } from 'app/constants/route.constant';
import StudentProfileScreen from './studentProfile.screen';
import {
  fetchStudentProfileSummary,
  fetchStudentProfileAssignments,
  fetchStudentProfileConcepts,
} from '../anytimePtm.actions';

import {
  studentProfileAssignmentsActions,
  studentProfileAssignmentsReducerName,
  studentProfileConceptsActions,
  studentProfileConceptsReducerName,
} from '../anytimePtm.reducer';

const mapState = (state: RootState) => ({
  studentProfile: state.anytimePtm.studentProfile,
  studentAssignments: state.anytimePtm.studentProfileAssignments,
  studentConcepts: state.anytimePtm.studentProfileConcepts,
});

const mapDispatch = {
  fetchStudentProfileSummary,
  fetchStudentProfileAssignments,
  fetchStudentProfileConcepts,
  resetStudentAssignments:
    studentProfileAssignmentsActions[
      `${studentProfileAssignmentsReducerName}Init`
    ],
  resetStudentConcepts:
    studentProfileConceptsActions[`${studentProfileConceptsReducerName}Init`],
};

const authLayer = AuthHoc({
  type: ROUTE_TYPE.private,
  screen: StudentProfileScreen,
});

const connector = connect(mapState, mapDispatch);

export default connector(authLayer);
