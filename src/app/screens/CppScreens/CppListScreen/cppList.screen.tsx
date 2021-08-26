import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import {
  Container,
  HiddenDesktop,
  HiddenMobile,
  InputContainer,
} from 'app/components';
import {
  BackIcon,
  CardHeader,
  CardListingContainer,
  ClassCount,
  CommonScreenBackground,
} from 'app/components/common/common.screen.styles';
import ExpandableSearch from 'app/components/common/expandable.search.component';
import HeaderComponent from 'app/components/common/header.component';
import {
  getUserNameFromStorage,
  getUsersCoursesFromStorage,
  LOGIN_TOKEN_KEY,
} from 'app/helpers/local.storage.helper';
import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import SimpleSnackbar from '../../../components/common/snackbar.component';
import CppList from './components/CppList';
import GoalsList from './components/GoalsList';
import useWindowInfiniteScroll from 'app/hooks/useWindowInfiniteScroll';
import { isLoading } from 'app/helpers/comman.helper';
import {
  CppListContainer,
  GoalHeading,
  Grid1,
  Heading,
  SearchIconEdit,
  useStyles,
} from './styles';
import { TEACHERSV2_URL } from 'app/constants/config.constant';
import debounce from 'app/helpers/debounce.helper';

interface ICppListScreen {
  cppTests: any;
  fetchCppTests: any;
  assignmentHistory: any;
  fetchAssignmentHistory: any;
  fetchBatchStudents: any;
  studentsList: any;
  batchSummary: any;
  fetchBatchSummary: any;
  batchStudentList: any;
  fetchBatchStudentList: any;
  cppAssignTest: any;
  fetchCppTestDeatils: any;
  cppTestDetail: any;
  cppSnackbar: any;
  cppSnackbarEmitter: any;
  resetCppTests: any;
}

function CppListScreen({
  cppTests,
  fetchCppTests,
  fetchAssignmentHistory,
  assignmentHistory,
  fetchBatchStudents,
  studentsList,
  batchSummary,
  fetchBatchSummary,
  batchStudentList,
  fetchBatchStudentList,
  cppAssignTest,
  fetchCppTestDeatils,
  cppTestDetail,
  cppSnackbar,
  cppSnackbarEmitter,
  resetCppTests,
}: ICppListScreen) {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();

  const [showHeading, setShowHeading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  // const [isLoading, setIsLoading] = useState(false);
  const [selectedGoalSubject, setSelectedGoalSubject] = useState<any>({
    goalId: '',
    subjectId: '',
    goal: null,
    subject: null,
  });
  const [selectedTabCard, setSelectedTabCard] = useState(0);
  const [hasReachedBottom, setHasReachedBottom] = useWindowInfiniteScroll(
    false,
  );

  const goals: any[] = getUsersCoursesFromStorage();
  const teacherName = getUserNameFromStorage();

  const isMobileMode = useMediaQuery(theme.breakpoints.down(769));

  useEffect(() => {
    fetchCppTests({
      subject: goals[0].subjects[0]._id,
      targetExam: goals[0]._id,
      offset: currentPage,
    });
    setSelectedGoalSubject({
      goalId: goals[0]._id,
      subjectId: goals[0].subjects[0]._id,
      goal: goals[0],
      subject: goals[0].subjects[0],
    });

    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (
      hasReachedBottom &&
      !isLoading(cppTests.apiState) &&
      cppTests.data?.tests?.length < cppTests.data?.testsCount
    ) {
      fetchCppTests({
        subject: selectedGoalSubject.subjectId,
        targetExam: selectedGoalSubject.goalId,
        offset: currentPage + 1,
      });
      setCurrentPage(currentPage + 1);
    }
  }, [hasReachedBottom]);

  useEffect(() => {
    setHasReachedBottom(false);
  }, [cppTests]);

  const searchExpandCallback = useCallback(
    (expanded: true) => {
      if (expanded === showHeading) {
        setShowHeading(!expanded);
      }
    },
    [showHeading],
  );

  const fetchAssignmentData = (id: string) => {
    fetchAssignmentHistory({ id: id });
  };

  const fetchAllStudentsData = (id: string) => {
    fetchBatchStudents({ id: id });
  };

  const fetchCppTestDetails = (id: string) => {
    fetchCppTestDeatils({ id: id });
  };

  const changeSubjectNew = (dataRecieved: any) => {
    setCurrentPage(1);
    setSelectedTabCard(1);
    // setIsLoading(false);
    const goal = goals.find(
      ({ _id }: any) => _id === dataRecieved.targetExamId,
    );
    const subject = goal.subjects.find(
      ({ _id }: any) => _id === dataRecieved.subjectId,
    );
    setSelectedGoalSubject({
      subjectId: dataRecieved.subjectId,
      goalId: dataRecieved.targetExamId,
      goal,
      subject,
    });
    resetCppTests();
    fetchCppTests({
      subject: dataRecieved.subjectId,
      targetExam: dataRecieved.targetExamId,
      offset: 1,
    });
    setCurrentPage(1);
    setHasReachedBottom(false);
    window.scrollTo(0, 0);

    // fetchBatchSummary({
    //   subject: dataRecieved.subjectId,
    //   targetExam: dataRecieved.targetExamId,
    // });
  };

  const handleFetchBatchStudentList = (payload: any) => {
    fetchBatchStudentList({
      ...payload,
      subject: selectedGoalSubject.subjectId,
      targetExam: selectedGoalSubject.goalId,
    });
  };

  const handleCppAssignTest = (payload: any) => {
    cppAssignTest({
      ...payload,
      courseId: selectedGoalSubject.goalId,
      teacher: { teacherName },
    });
  };

  const handleOnCloseSnackbar = () => {
    cppSnackbarEmitter({ ...cppSnackbarEmitter, show: false });
  };

  const authToken = localStorage.getItem(LOGIN_TOKEN_KEY);
  const handleAddCppEvent = () => {
    window.open(
      `${TEACHERSV2_URL}/public/login?token=${authToken}&redirectUrl=cpp`,
      // `http://localhost:4505/public/login?token=${authToken}&redirectUrl=cpp`,
      '_blank',
    );
  };

  useEffect(() => {
    if (searchText) {
      fetchQuerySearchResultsCallback(searchText);
    }
  }, [searchText]);

  const fetchQuerySearchResultsCallback = useCallback(
    debounce((query: string) => {
      resetCppTests();
      fetchCppTests({
        subject: selectedGoalSubject.subjectId,
        targetExam: selectedGoalSubject.goalId,
        offset: 1,
        query,
      });
      setCurrentPage(1);
    }, 300),
    [cppTests],
  );

  return (
    <>
      <HeaderComponent />
      <CommonScreenBackground>
        <CardHeader>
          <Container>
            <br />
            <Grid1>
              <ClassCount>
                {isMobileMode && selectedTabCard === 1 && (
                  <BackIcon>
                    <img
                      src={
                        'https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/back-icon.svg'
                      }
                      alt="back-icon"
                      onClick={() => setSelectedTabCard(0)}
                    />
                  </BackIcon>
                )}

                <span>
                  {((isMobileMode && selectedTabCard === 0) ||
                    !isMobileMode) && <Heading>CPP</Heading>}

                  {isMobileMode && selectedTabCard === 1 && showHeading && (
                    <Heading>
                      {selectedGoalSubject.subject?.name} <br />
                      <span>{selectedGoalSubject.goal?.name}</span>
                    </Heading>
                  )}
                </span>
              </ClassCount>

              <div>
                <div>
                  <HiddenMobile>
                    <InputContainer>
                      <FormControl>
                        <Input
                          className={classes.searchTestInputStyle}
                          placeholder={'Search for test'}
                          type="text"
                          value={searchText || ''}
                          onChange={(el: any) => setSearchText(el.target.value)}
                          disableUnderline={true}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton aria-label="search icon">
                                <SearchIconEdit />
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </InputContainer>
                  </HiddenMobile>
                </div>
                {showHeading === true && selectedTabCard === 1 && (
                  <HiddenDesktop>
                    <button
                      onClick={handleAddCppEvent}
                      className={classes.addCppBtn}
                    >
                      <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/addIcon.svg" />
                    </button>
                  </HiddenDesktop>
                )}
              </div>
              {selectedTabCard === 1 && (
                <HiddenDesktop>
                  <ExpandableSearch
                    searchText={searchText}
                    onChange={(el: any) => setSearchText(el.target.value)}
                    callback={searchExpandCallback}
                    placeholder={'Search for test'}
                  />
                </HiddenDesktop>
              )}

              <HiddenMobile>
                <div>
                  <button
                    onClick={handleAddCppEvent}
                    className={classes.addCppBtn}
                  >
                    <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/addIcon.svg" />
                    Add CPP
                  </button>
                </div>
              </HiddenMobile>
            </Grid1>
          </Container>
        </CardHeader>
        <Container>
          <CardListingContainer>
            {((isMobileMode && selectedTabCard === 0) || !isMobileMode) && (
              <div>
                <HiddenMobile>
                  <GoalHeading>Goal</GoalHeading>
                </HiddenMobile>
                <GoalsList
                  isMobileMode={isMobileMode}
                  goals={goals}
                  changeSubject={changeSubjectNew}
                />
              </div>
            )}

            {((isMobileMode && selectedTabCard === 1) || !isMobileMode) && (
              <CppListContainer>
                <HiddenMobile>
                  <GoalHeading>Test ({cppTests.data?.testsCount})</GoalHeading>
                </HiddenMobile>
                <CppList
                  selectedGoalSubject={selectedGoalSubject}
                  cppTests={cppTests}
                  fetchAssignmentData={fetchAssignmentData}
                  assignmentHistory={assignmentHistory}
                  fetchStudentsData={fetchAllStudentsData}
                  studentsList={studentsList}
                  fetchBatchSummary={fetchBatchSummary}
                  batchSummary={batchSummary}
                  batchStudentList={batchStudentList}
                  fetchBatchStudentList={handleFetchBatchStudentList}
                  cppAssignTest={handleCppAssignTest}
                  fetchCppTestDetails={fetchCppTestDetails}
                  cppTestDetail={cppTestDetail}
                  fetchCppTests={() =>
                    fetchCppTests({
                      subject: selectedGoalSubject.subjectId,
                      targetExam: selectedGoalSubject.goalId,
                      offset: currentPage,
                    })
                  }
                  cppSnackbarEmitter={cppSnackbarEmitter}
                />
              </CppListContainer>
            )}
          </CardListingContainer>
        </Container>
      </CommonScreenBackground>

      <SimpleSnackbar
        mode={cppSnackbar.type}
        onClose={handleOnCloseSnackbar}
        message={cppSnackbar.message}
        state={cppSnackbar.show}
      />
    </>
  );
}

export default CppListScreen;
