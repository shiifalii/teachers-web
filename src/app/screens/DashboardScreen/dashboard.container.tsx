import { connect } from 'react-redux';

import DashboardScreen from './dashboard.screen';
import { ROUTE_TYPE } from '../../constants/route.constant';
import AuthHoc from '../../components/hoc/auth.hoc';
import { dashboardActions } from './dashboard.reducer';
import { RootState } from 'app/stores/configure.store';
import { notificationActions } from 'app/components/common/notifications/reducer';
import { fetchAssignedCPPTestCount } from 'app/screens/AssessmentScreens/assessments.actions';
import {
  assignedTestCountActions,
  assignedTestCountReducerName,
} from 'app/screens/AssessmentScreens/assessments.reducer';

const mapState = (state: RootState) => {
  return {
    classes: state.dashboard.classes,
    notifications: state.notifications.notifications,
    assignedCPPTestCount: state.subjectiveAssessment.assignedTestCount,
  };
};

const mapDispatch = {
  resetClassesApi: dashboardActions['classesInit'],
  resetNotificationsApi: notificationActions.notificationsInit,
  resetAssignedCPPTestCountApi:
    assignedTestCountActions[`${assignedTestCountReducerName}Init`],
  fetchAssignedCPPTestCount,
};
const authLayer = AuthHoc({
  type: ROUTE_TYPE.private,
  screen: DashboardScreen,
});
const conector = connect(mapState, mapDispatch);

export default conector(authLayer);
