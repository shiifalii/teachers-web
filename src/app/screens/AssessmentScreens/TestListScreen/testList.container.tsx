import { connect } from 'react-redux';

import TestListScreen from './testList.screen';
import { ROUTE_TYPE } from 'app/constants/route.constant';
import { RootState } from 'app/stores/configure.store';
import AuthHoc from 'app/components/hoc/auth.hoc';
import { testListActions, testListReducerName } from '../assessments.reducer';
import { fetchAssignedCPPTestList } from '../assessments.actions';

const mapState = (state: RootState) => {
  return {
    testList: state.subjectiveAssessment.testList,
  };
};

const mapDispatch = {
  fetchAssignedCPPTestList,
  resetTestListApi: testListActions[`${testListReducerName}Init`],
};

const authLayer = AuthHoc({
  type: ROUTE_TYPE.private,
  screen: TestListScreen,
});

const conector = connect(mapState, mapDispatch);

export default conector(authLayer);
