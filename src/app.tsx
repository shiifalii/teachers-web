import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Loading } from './app/components';
import createStore from './app/stores/configure.store';
import { Provider } from 'react-redux';
import './global.css';
import Layout from './layout';
import {
  DASHBOARD_ROUTE,
  LOGIN_ROUTE,
  CHAPTER_ROUTE,
  CONCEPT_ROUTE,
  TEST_ROUTE,
  RESET_PASSWORD_ROUTE,
  TEST_DETAILS_ROUTE,
  STUDENT_ANALYTICS_ROUTE,
  QUESTION_ANALYTICS_ROUTE,
  STUDENT_LIST_ASSESSMENT_ROUTE,
  STUDENT_SUMMARY_ASSESSMENT_ROUTE,
  TEST_LIST_ASSESSMENT_ROUTE,
  TEST_EVALUATION_ASSESSMENT_ROUTE,
  ANYTIME_PTM_STUDENT_SEARCH,
  ANYTIME_PTM_STUDENT_SEARCH_RESULTS,
  ANYTIME_PTM_STUDENT_PROFILE,
  GENARATE_REPORTS_ROUTE,
  REPORTS_HISTORY_ROUTE,
  CPP_COMPLETE_PAPER,
  CPP_LIST_ROUTE,
} from './app/constants/route.constant';
import { initializeAnalytics } from 'app/helpers/analytics.helper';
import { REPORTS_HISTORY } from 'app/screens/ReportScreens/ReportsHistory/reportsHistory.actions';

const store = createStore();

// Initialise analytics
initializeAnalytics();

const LoginScreen = React.lazy(() =>
  import('./app/screens/LoginScreen/login.container'),
);

const ResetPasswordScreen = React.lazy(() =>
  import('./app/screens/ResetPasswordScreen/resetPassword.container'),
);

const DashboardScreen = React.lazy(() =>
  import('./app/screens/DashboardScreen/dashboard.container'),
);

const ChapterScreen = React.lazy(() =>
  import('./app/screens/ChapterScreen/chapter.container'),
);

const ConceptScreen = React.lazy(() =>
  import('./app/screens/ConceptScreen/concept.container'),
);

const TestScreen = React.lazy(() =>
  import('./app/screens/TestScreen/test.container'),
);

const TestDetailsSreen = React.lazy(() =>
  import('./app/screens/TestDetails/test.details.container'),
);

const StudentAnalyticsScreen = React.lazy(() =>
  import('./app/screens/StudentAnalyticsScreen/studentAnalytics.container'),
);

const QuestionAnalyticsScreen = React.lazy(() =>
  import('./app/screens/QuestionAnalyticsScreen/questionAnalytics.container'),
);

const TestListAssessmentScreen = React.lazy(() =>
  import('./app/screens/AssessmentScreens/TestListScreen/testList.container'),
);

const StudentListAssessmentScreen = React.lazy(() =>
  import(
    './app/screens/AssessmentScreens/StudentListScreen/studentList.container'
  ),
);

const StudentSummaryScreen = React.lazy(() =>
  import(
    './app/screens/AssessmentScreens/StudentSummaryScreen/studentSummary.container'
  ),
);

const TestEvaluationScreen = React.lazy(() =>
  import(
    './app/screens/AssessmentScreens/TestEvaluationScreen/testEvaluation.container'
  ),
);

const AnytimePTMStudentSearchScreen = React.lazy(() =>
  import(
    './app/screens/AnytimePtmScreens/StudentSearchScreen/studentSearch.container'
  ),
);

const AnytimePTMStudentSearchResultsScreen = React.lazy(() =>
  import(
    './app/screens/AnytimePtmScreens/StudentSearchResultsScreen/studentSearchResults.container'
  ),
);

const AnytimePTMStudentProfileScreen = React.lazy(() =>
  import(
    './app/screens/AnytimePtmScreens/StudentProfileScreen/studentProfile.container'
  ),
);

const GenarateReportScreen = React.lazy(() =>
  import(
    './app/screens/ReportScreens/GenarateReportScreen/genarateReport.container'
  ),
);

const ReportsHistory = React.lazy(() =>
  import('./app/screens/ReportScreens/ReportsHistory/reportsHistory.container'),
);

const CppListScreen = React.lazy(() =>
  import('./app/screens/CppScreens/CppListScreen/cppList.container'),
);

const CppCompletePaperScreen = React.lazy(() =>
  import(
    './app/screens/CppScreens/CppCompletePaperScreen/cppCompletePaper.container'
  ),
);
const App = () => (
  <Provider store={store}>
    <div className="App">
      <Layout>
        <Router>
          <React.Suspense fallback={<Loading />}>
            <Switch>
              <Route exact path={LOGIN_ROUTE.path}>
                <LoginScreen />
              </Route>
              <Route exact path={RESET_PASSWORD_ROUTE.path}>
                <ResetPasswordScreen />
              </Route>
              <Route exact path={DASHBOARD_ROUTE.path}>
                {<DashboardScreen />}
              </Route>
              <Route exact path={CHAPTER_ROUTE.path}>
                {<ChapterScreen />}
              </Route>
              <Route exact path={CONCEPT_ROUTE.path}>
                {<ConceptScreen />}
              </Route>
              <Route exact path={TEST_ROUTE.path}>
                {<TestScreen />}
              </Route>
              <Route exact path={TEST_DETAILS_ROUTE.path}>
                {<TestDetailsSreen />}
              </Route>
              <Route exact path={STUDENT_ANALYTICS_ROUTE.path}>
                {<StudentAnalyticsScreen />}
              </Route>
              <Route exact path={QUESTION_ANALYTICS_ROUTE.path}>
                {<QuestionAnalyticsScreen />}
              </Route>
              <Route exact path={TEST_LIST_ASSESSMENT_ROUTE.path}>
                {<TestListAssessmentScreen />}
              </Route>
              <Route exact path={STUDENT_LIST_ASSESSMENT_ROUTE.path}>
                {<StudentListAssessmentScreen />}
              </Route>
              <Route exact path={STUDENT_SUMMARY_ASSESSMENT_ROUTE.path}>
                {<StudentSummaryScreen />}
              </Route>
              <Route exact path={TEST_EVALUATION_ASSESSMENT_ROUTE.path}>
                {<TestEvaluationScreen />}
              </Route>

              <Route exact path={ANYTIME_PTM_STUDENT_SEARCH.path}>
                {<AnytimePTMStudentSearchScreen />}
              </Route>

              <Route exact path={ANYTIME_PTM_STUDENT_SEARCH_RESULTS.path}>
                {<AnytimePTMStudentSearchResultsScreen />}
              </Route>

              <Route exact path={ANYTIME_PTM_STUDENT_PROFILE.path}>
                {<AnytimePTMStudentProfileScreen />}
              </Route>

              <Route exact path={GENARATE_REPORTS_ROUTE.path}>
                {<GenarateReportScreen />}
              </Route>
              <Route exact path={REPORTS_HISTORY_ROUTE.path}>
                {<ReportsHistory />}
              </Route>
              <Route exact path={CPP_LIST_ROUTE.path}>
                {<CppListScreen />}
              </Route>
              <Route exact path={CPP_COMPLETE_PAPER.path}>
                {<CppCompletePaperScreen />}
              </Route>
              <Route path={'*'} render={() => <h1> Not found. </h1>}></Route>
            </Switch>
          </React.Suspense>
        </Router>
      </Layout>
    </div>
  </Provider>
);

export default App;
