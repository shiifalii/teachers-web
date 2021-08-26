import { connect } from 'react-redux';

import StudentAnalyticsScreen from './studentAnalytics.screen';
import { STUDENT_ANALYTICS_ROUTE } from '../../constants/route.constant';
import AuthHoc from '../../components/hoc/auth.hoc';
import { RootState } from 'app/stores/configure.store';
import { fetchStudentAnalytics } from './redux/studentAnalytics.action';

const mapState = (state: RootState) => ({
  studentAnalytics: state.studentAnalytics.studentAnalytics,
  testDetails: state.testDetails.testDetails,
});

const mapDispatch = {
  fetchStudentAnalytics,
};

const authLayer = AuthHoc({
  type: STUDENT_ANALYTICS_ROUTE.type,
  screen: StudentAnalyticsScreen,
});
const conector = connect(mapState, mapDispatch);

export default conector(authLayer);
