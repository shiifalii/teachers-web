import { connect } from 'react-redux';

import TestDetailsScreen from './test.details.screen';
import { TEST_DETAILS_ROUTE } from '../../constants/route.constant';
import AuthHoc from '../../components/hoc/auth.hoc';
import { RootState } from 'app/stores/configure.store';
import { testAnalyticsActions } from './test.details.reducer';

const mapState = (state: RootState) => ({
  testDetails: state.testDetails.testDetails,
  testAnalytics: state.testDetails.testAnalytics,
});

const mapDispatch = {
  resetAnalyticsData: testAnalyticsActions['testAnalyticsInit'],
};

const authLayer = AuthHoc({
  type: TEST_DETAILS_ROUTE.type,
  screen: TestDetailsScreen,
});
const conector = connect(mapState, mapDispatch);

export default conector(authLayer);
