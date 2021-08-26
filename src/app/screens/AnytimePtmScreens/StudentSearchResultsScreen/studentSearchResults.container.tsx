import React from 'react';
import { RootState } from 'app/stores/configure.store';
import {
  fetchStudentSearchResults,
  addStudentSearchEvent,
} from '../anytimePtm.actions';
import { ROUTE_TYPE } from 'app/constants/route.constant';
import AuthHoc from 'app/components/hoc/auth.hoc';
import StudentSearchResultsScreen from './studentSearchResults.screen';
import { connect } from 'react-redux';

const mapState = (state: RootState) => ({
  studentList: state.anytimePtm.studentList,
});

const mapDispatch = {
  fetchStudentSearchResults,
  addStudentSearchEvent,
};

const authLayer = AuthHoc({
  type: ROUTE_TYPE.private,
  screen: StudentSearchResultsScreen,
});

const connector = connect(mapState, mapDispatch);

export default connector(authLayer);
