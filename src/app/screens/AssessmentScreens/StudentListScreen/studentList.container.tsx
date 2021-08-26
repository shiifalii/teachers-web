import { connect } from 'react-redux';

import StudentListScreen from './studentList.screen';
import { ROUTE_TYPE } from 'app/constants/route.constant';
import { RootState } from 'app/stores/configure.store';
import AuthHoc from 'app/components/hoc/auth.hoc';
import {
  studentListActions,
  studentListReducerName,
} from '../assessments.reducer';
import { fetchStudentList } from '../assessments.actions';

const mapState = (state: RootState) => {
  return {
    studentListData: state.subjectiveAssessment.studentList,
  };
};

const mapDispatch = {
  fetchStudentList,
  resetStudentListApi: studentListActions[`${studentListReducerName}Init`],
};

const authLayer = AuthHoc({
  type: ROUTE_TYPE.private,
  screen: StudentListScreen,
});

const conector = connect(mapState, mapDispatch);

export default conector(authLayer);
