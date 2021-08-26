import { connect } from 'react-redux';

import { ROUTE_TYPE } from 'app/constants/route.constant';
import { RootState } from 'app/stores/configure.store';
import AuthHoc from 'app/components/hoc/auth.hoc';
import CppListScreen from './cppList.screen';
import {
  fetchCppTests,
  fetchAssignmentHistory,
  fetchBatchStudents,
  fetchBatchSummary,
  fetchBatchStudentList,
  cppAssignTest,
  fetchCppTestDeatils,
} from '../cpp.actions';
import {
  cppSnackbarReducerName,
  cppSnackbarActions,
  cppTestsActions,
  cppTestsReducerName,
} from '../cpp.reducer';

const mapState = (state: RootState) => ({
  cppTests: state.cpp.cppTests,
  assignmentHistory: state.cpp.assignmentHistory,
  studentsList: state.cpp.studentsList,
  batchSummary: state.cpp.batchSummary,
  batchStudentList: state.cpp.batchStudentList,
  cppTestDetail: state.cpp.cppTestDetail,
  cppSnackbar: state.cpp.cppSnackbar,
});

const mapDispatch = {
  // State methods
  fetchCppTests,
  resetCppTests: cppTestsActions[`${cppTestsReducerName}Init`],
  fetchAssignmentHistory,
  fetchBatchStudents,
  fetchBatchSummary,
  fetchBatchStudentList,
  cppAssignTest,
  fetchCppTestDeatils,
  cppSnackbarEmitter: cppSnackbarActions[`${cppSnackbarReducerName}Update`],
};

const authLayer = AuthHoc({
  type: ROUTE_TYPE.private,
  screen: CppListScreen,
});

const conector = connect(mapState, mapDispatch);

export default conector(authLayer);
