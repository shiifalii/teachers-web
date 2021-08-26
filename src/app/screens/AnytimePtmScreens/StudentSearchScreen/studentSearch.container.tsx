import { connect } from 'react-redux';

import { ROUTE_TYPE } from 'app/constants/route.constant';
import { RootState } from 'app/stores/configure.store';
import AuthHoc from 'app/components/hoc/auth.hoc';
import {
  studentSearchListActions,
  studentSearchListReducerName,
} from '../anytimePtm.reducer';
import {
  fetchStudentSearchResults,
  fetchStudentRecentSearchList,
  addStudentSearchEvent,
} from '../anytimePtm.actions';
import StudentSearchScreen from './studentSearch.screen';

const mapState = (state: RootState) => {
  return {
    studentList: state.anytimePtm.studentList,
    recentSearch: state.anytimePtm.studentRecentSearchList,
  };
};

const mapDispatch = {
  fetchStudentRecentSearchList,
  fetchStudentSearchResults,
  addStudentSearchEvent,
  resetStudentSearchResultsApi:
    studentSearchListActions[`${studentSearchListReducerName}Init`],
};

const authLayer = AuthHoc({
  type: ROUTE_TYPE.private,
  screen: StudentSearchScreen,
});

const conector = connect(mapState, mapDispatch);

export default conector(authLayer);
