import { connect } from 'react-redux';

import QuestionAnalyticsScreen from './questionAnalytics.screen';
import { QUESTION_ANALYTICS_ROUTE } from '../../constants/route.constant';
import AuthHoc from '../../components/hoc/auth.hoc';
import { RootState } from 'app/stores/configure.store';
import { fetchQuestionAnalytics } from './redux/questionAnalytics.action';

const mapState = (state: RootState) => ({
  questionAnalytics: state.questionAnalytics.questionAnalytics,
});

const mapDispatch = {
  fetchQuestionAnalytics,
};

const authLayer = AuthHoc({
  type: QUESTION_ANALYTICS_ROUTE.type,
  screen: QuestionAnalyticsScreen,
});
const conector = connect(mapState, mapDispatch);

export default conector(authLayer);
