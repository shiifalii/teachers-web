import { Container } from 'app/components';
import {
  BackIcon,
  CardHeader,
  CardListing,
  ClassCount,
  CommonScreenBackground,
} from 'app/components/common/common.screen.styles';
import HeaderComponent from 'app/components/common/header.component';
import LoaderWrapper from 'app/components/common/loader.wrapper.component';
import { isLoading } from 'app/helpers/comman.helper';
import { getUsersCoursesFromStorage } from 'app/helpers/local.storage.helper';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { HiddenDesktop, HiddenMobile } from 'app/components';
import StudentAnalyticsData from './components/StudentAnalyticsData';
import StudentAssignmentList from './components/StudentAssignmentList';
import StudentProfileSummary from './components/StudentProfileSummary';
import {
  Grid1,
  Heading,
  NoData,
  TabHeaderContainer,
  useStyles,
} from './styles';
import StudentConceptList from './components/StudentConceptList';
import { Drawer, CircularProgress } from '@material-ui/core';
import StudentFilterList from './components/StudentFilterList';
import useWindowInfiniteScroll from 'app/hooks/useWindowInfiniteScroll';

interface IStudentProfileScreen {
  studentProfile: any;
  studentAssignments: any;
  studentConcepts: any;
  fetchStudentProfileSummary: any;
  fetchStudentProfileAssignments: any;
  fetchStudentProfileConcepts: any;
  resetStudentAssignments: any;
  resetStudentConcepts: any;
}

enum Tab {
  Assignments = 'Assignments',
  Concepts = 'Concepts',
}

const marksCriteriaOptions = [
  {
    name: 'Average Score',
    id: 'Avg. Score',
  },
  {
    name: 'Average Accuracy Rate',
    id: 'Avg. Accuracy Rate',
  },
  {
    name: 'Submission Rate',
    id: 'Submission Rate',
  },
];

function StudentProfileScreen({
  studentProfile,
  studentAssignments,
  studentConcepts,
  fetchStudentProfileSummary,
  fetchStudentProfileAssignments,
  fetchStudentProfileConcepts,
  resetStudentAssignments,
  resetStudentConcepts,
}: IStudentProfileScreen) {
  const history = useHistory();
  const classes = useStyles();
  const routeParams: any = useParams();
  const { studentId } = routeParams;

  const courses: any[] = getUsersCoursesFromStorage();
  const [subjects, setSubjects] = useState(
    courses.length ? courses[0].subjects : [],
  );
  const [selectedGoal, setSelectedGoal] = useState(
    courses.length ? courses[0]._id : '',
  );
  const [selectedSubject, setSelectedSubject] = useState(
    courses.length && courses[0].subjects.length && courses[0].subjects[0]._id,
  );
  const [currentTab, setCurrentTab] = useState(Tab.Assignments);
  const [analyticsTypes, setAnalyticsTypes] = useState(marksCriteriaOptions);
  const [selectedAnalyticsType, setSelectedAnalyticsType] = useState(
    marksCriteriaOptions[0].id,
  );
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);
  const [hasReachedBottom, setHasReachedBottom] = useWindowInfiniteScroll(
    false,
  );

  const [assignmentDataCursor, setAssignmentDataCursor] = useState(1);
  const [assignmentsCount, setAssignmentsCount] = useState(0);
  const [assignmentHasLimitReached, setAssignmentHasLimitReached] = useState(
    false,
  );

  const [conceptsDataCursor, setConceptsDataCursor] = useState(1);
  const [conceptsCount, setConceptsCount] = useState(0);
  const [conceptsHasLimitReached, setConceptsHasLimitReached] = useState(false);

  const {
    data: { marks, summary },
  } = studentProfile;

  const switchTab = (tab: Tab) => {
    if (tab !== Tab.Assignments && tab !== Tab.Concepts) {
      tab = Tab.Assignments;
    }
    if (currentTab !== tab) {
      setCurrentTab(tab);
      history.replace(`${history.location.pathname}?tab=${tab}`);
    }
  };

  useEffect(() => {
    const payload = {
      studentId,
      subject:
        selectedSubject === 'all'
          ? subjects.map(({ _id }: any) => _id).join(',')
          : selectedSubject,
      targetExam: selectedGoal === 'all' ? '' : selectedGoal,
      criteria: selectedAnalyticsType,
    };
    resetTabPaginationSessings();

    fetchStudentProfileSummary(payload);
    fetchStudentProfileAssignments({
      ...payload,
      offset: assignmentDataCursor,
    });
    fetchStudentProfileConcepts({ ...payload, offset: conceptsDataCursor });
  }, [studentId, selectedSubject, selectedGoal]);

  const resetTabPaginationSessings = () => {
    resetStudentAssignments();
    resetStudentConcepts();

    setAssignmentDataCursor(1);
    setAssignmentsCount(0);
    setAssignmentHasLimitReached(false);

    setConceptsDataCursor(1);
    setConceptsCount(0);
    setConceptsHasLimitReached(false);
  };

  const handleAnalyticsTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedAnalyticsType(e.target.value);
  };

  const applyStudentDetailsFilter = ({ targetExam, subject }: any) => {
    setSelectedSubject(subject);
    setSelectedGoal(targetExam);
    setOpenFilterDrawer(false);
  };

  useEffect(() => {
    if (hasReachedBottom) {
      const payload = {
        studentId,
        subject:
          selectedSubject === 'all'
            ? subjects.map(({ _id }: any) => _id).join(',')
            : selectedSubject,
        targetExam: selectedGoal === 'all' ? '' : selectedGoal,
        criteria: selectedAnalyticsType,
      };

      if (currentTab === Tab.Assignments) {
        if (assignmentHasLimitReached) {
          setHasReachedBottom(false);
          return;
        }
        fetchStudentProfileAssignments({
          ...payload,
          offset: assignmentDataCursor + 1,
        });
        setAssignmentDataCursor(assignmentDataCursor + 1);
      }

      if (currentTab === Tab.Concepts) {
        if (conceptsHasLimitReached) {
          setHasReachedBottom(false);
          return;
        }
        fetchStudentProfileConcepts({
          ...payload,
          offset: conceptsDataCursor + 1,
        });
        setConceptsDataCursor(conceptsDataCursor + 1);
      }
    }
  }, [hasReachedBottom]);

  useEffect(() => {
    if (assignmentsCount === studentAssignments.data.length) {
      setAssignmentHasLimitReached(true);
    } else {
      setAssignmentHasLimitReached(false);
    }
    setAssignmentsCount(studentAssignments.data.length);
    setHasReachedBottom(false);
  }, [studentAssignments]);

  useEffect(() => {
    if (conceptsCount === studentConcepts.data.length) {
      setConceptsHasLimitReached(true);
    } else {
      setConceptsHasLimitReached(false);
    }
    setConceptsCount(studentConcepts.data.length);
    setHasReachedBottom(false);
  }, [studentConcepts]);

  const handleGoalSelect = (e: any) => {
    const {
      target: { value: targetExamId },
    } = e;
    setSelectedGoal(targetExamId);
    const goal = courses.find(({ _id }: any) => _id === targetExamId);
    setSubjects(goal.subjects);
    setSelectedSubject(goal.subjects.length && goal.subjects[0]._id);
  };

  return (
    <>
      <HeaderComponent />
      <CommonScreenBackground>
        <CardHeader>
          <Container>
            <br />
            <Grid1>
              <ClassCount>
                <BackIcon>
                  <img
                    src={
                      'https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/back-icon.svg'
                    }
                    alt="back-icon"
                    onClick={() => history.goBack()}
                  />
                </BackIcon>
                <span>
                  <Heading>
                    {summary?.name}
                    <b
                      style={{
                        paddingLeft: '4px',
                        fontSize: '14px',
                        fontWeight: 400,
                      }}
                    >
                      {summary ? `(${summary.batchCode})` : ''}
                    </b>
                  </Heading>
                </span>
              </ClassCount>
              <HiddenMobile>
                <div>
                  <select
                    className={classes.selectList}
                    value={selectedSubject}
                    onChange={e => setSelectedSubject(e.target.value)}
                  >
                    {/* <option value="all">All Subjects</option> */}
                    {subjects.map((subject: any) => (
                      <option key={subject._id} value={subject._id}>
                        {subject.name}
                      </option>
                    ))}
                  </select>
                </div>
              </HiddenMobile>
              <HiddenMobile>
                <div>
                  <select
                    className={classes.selectList}
                    value={selectedGoal}
                    onChange={handleGoalSelect}
                  >
                    {courses.map((course: any) => (
                      <option key={course._id} value={course._id}>
                        {course.name}
                      </option>
                    ))}
                  </select>
                </div>
              </HiddenMobile>
              <HiddenDesktop>
                <button
                  onClick={() => setOpenFilterDrawer(true)}
                  className="filterIcon"
                >
                  <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/filter-white-icon.svg" />
                </button>
              </HiddenDesktop>
            </Grid1>
          </Container>
        </CardHeader>
        <Container>
          <CardListing style={{ padding: '15px' }}>
            <LoaderWrapper isLoading={isLoading(studentProfile.apiState)}>
              <>
                <StudentProfileSummary summary={summary ? summary : {}} />

                {!summary ? (
                  <NoData>
                    <img
                      src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/no-analytics-data.svg"
                      alt="no-attempt"
                    />
                    <p>No Analytics available</p>
                  </NoData>
                ) : (
                  <>
                    <div className={classes.graphContainer}>
                      <div className={classes.graphHeading}>
                        <h4>Marks Analytics</h4>
                        <select
                          value={selectedAnalyticsType}
                          onChange={handleAnalyticsTypeChange}
                        >
                          {analyticsTypes.map(({ id, name }: any) => (
                            <option key={id} value={id}>
                              {name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <StudentAnalyticsData
                      analyticsData={
                        marks
                          ? marks.find(
                              ({ displayableCriteria }: any) =>
                                displayableCriteria === selectedAnalyticsType,
                            )
                          : {}
                      }
                      studentName={summary?.name}
                    />
                  </>
                )}
              </>
            </LoaderWrapper>

            <div>
              <TabHeaderContainer>
                <ul>
                  <li
                    key="tab-1"
                    className={currentTab === Tab.Assignments ? 'active' : ''}
                  >
                    <span onClick={() => switchTab(Tab.Assignments)}>
                      Assignments
                      {/* ({studentAssignments.data.length}) */}
                    </span>
                  </li>
                  <li
                    key="tab-2"
                    className={currentTab === Tab.Concepts ? 'active' : ''}
                  >
                    <span onClick={() => switchTab(Tab.Concepts)}>
                      Concepts
                      {/* ({studentConcepts.data.length}) */}
                    </span>
                  </li>
                </ul>
              </TabHeaderContainer>

              <div>
                {currentTab === Tab.Assignments && (
                  <StudentAssignmentList
                    assignments={studentAssignments.data}
                  />
                )}

                {currentTab === Tab.Concepts && (
                  <StudentConceptList concepts={studentConcepts.data} />
                )}
              </div>

              {(isLoading(studentAssignments.apiState) ||
                isLoading(studentConcepts.apiState)) && (
                <div className={classes.circularProgressBarContainer}>
                  <CircularProgress />
                </div>
              )}
            </div>
          </CardListing>
        </Container>
      </CommonScreenBackground>
      <Drawer anchor="right" open={openFilterDrawer}>
        <StudentFilterList
          courses={courses}
          handleClose={() => setOpenFilterDrawer(false)}
          handleApply={applyStudentDetailsFilter}
        />
      </Drawer>
    </>
  );
}

export default StudentProfileScreen;
