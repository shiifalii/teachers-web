import { configureStore, combineReducers } from '@reduxjs/toolkit';
import loginReducer from '../screens/LoginScreen/login.reducer';
import dashboardReducer from '../screens/DashboardScreen/dashboard.reducer';
import chapterReducer from '../screens/ChapterScreen/chapter.reducer';
import conceptReducer from '../screens/ConceptScreen/concept.reducer';
import testReducer from '../screens/TestScreen/test.reducer';
import testDetailsReducer from '../screens/TestDetails/test.details.reducer';
import notificationsReducer from '../components/common/notifications/reducer';
import createSagaMiddleware from 'redux-saga';
import resetPasswordReducer from '../screens/ResetPasswordScreen/resetPassword.reducer';
import studentAnalyticsReducer from '../screens/StudentAnalyticsScreen/redux/studentAnalytics.reducer';
import questionAnalyticsReducer from '../screens/QuestionAnalyticsScreen/redux/questionAnalytics.reducer';
import assessmentsReducer from '../screens/AssessmentScreens/assessments.reducer';
import anytimePtmReducer from 'app/screens/AnytimePtmScreens/anytimePtm.reducer';
import genarateReportsReducer from '../screens/ReportScreens/GenarateReportScreen/redux/genarateReport.reducer';
import fetchHistoryReducer from '../screens/ReportScreens/ReportsHistory/reportsHistory.reducer';
import cppReducer from 'app/screens/CppScreens/cpp.reducer';
import rootSaga from './root.saga';

// static reducer
const staticReducer = combineReducers({
  login: loginReducer,
  resetPassword: resetPasswordReducer,
  dashboard: dashboardReducer,
  notifications: notificationsReducer,
  chapter: chapterReducer,
  concept: conceptReducer,
  test: testReducer,
  testDetails: testDetailsReducer,
  studentAnalytics: studentAnalyticsReducer,
  questionAnalytics: questionAnalyticsReducer,
  subjectiveAssessment: assessmentsReducer,
  anytimePtm: anytimePtmReducer,
  reports: genarateReportsReducer,
  reportsHistory: fetchHistoryReducer,
  cpp: cppReducer,
});

// type of state
export type RootState = ReturnType<typeof staticReducer>;

// create the saga middleware
export const sagaMiddleware = createSagaMiddleware();

const createStore = function() {
  const store = configureStore({
    reducer: staticReducer,
    middleware: [sagaMiddleware],
  });
  sagaMiddleware.run(rootSaga);
  return store;
};

export default createStore;
