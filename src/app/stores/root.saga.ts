import { all } from 'redux-saga/effects';
import studentAnalyticsSaga from 'app/screens/StudentAnalyticsScreen/redux/studentAnalytics.saga';
import questionAnalyticsSaga from 'app/screens/QuestionAnalyticsScreen/redux/questionAnalytics.saga';
import assessmentsSaga from 'app/screens/AssessmentScreens/assessments.saga';
import anytimePtmSaga from 'app/screens/AnytimePtmScreens/anytimePtm.saga';
import genarateReportsSaga from 'app/screens/ReportScreens/GenarateReportScreen/redux/genarateReport.saga';
import fetchHistorySaga from 'app/screens/ReportScreens/ReportsHistory/reportsHistory.saga';
import cppSaga from 'app/screens/CppScreens/cpp.saga';

function* rootSaga() {
  yield all([
    ...studentAnalyticsSaga,
    ...questionAnalyticsSaga,
    ...assessmentsSaga,
    ...anytimePtmSaga,
    ...genarateReportsSaga,
    ...fetchHistorySaga,
    ...cppSaga,
  ]);
}

export default rootSaga;
