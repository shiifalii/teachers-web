import React, { useMemo, useEffect, useState, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { EmptyState } from 'app/components/common/emptyState.component';
import LoaderWrapper from 'app/components/common/loader.wrapper.component';
import SimpleSnackbar from 'app/components/common/snackbar.component';
import HeaderComponent from 'app/components/common/header.component';

import { Container } from 'app/components';
import { Flex, HiddenDesktop, HiddenMobile } from 'app/components/atoms';
import BreadCrumbStyles from 'app/components/common/breadcrumbs.styles';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {
  CommonScreenBackground,
  BackIcon,
  CardHeader,
  TabHeader,
} from 'app/components/common/common.screen.styles';
import { Grid } from '@material-ui/core';
import {
  Title,
  CardListingEdit,
  HeaderContainer,
  TotalMarksPill,
  TabsEdit,
  StudentHeading,
} from './styles';
import { TabTypes } from './components/Tabs';
import { isApiFailed, isLoading } from 'app/helpers/comman.helper';
import Tabs from './components/Tabs';
import SectionWiseSummary from './components/SectionWiseSummary';
import QuestionWiseSummary from './components/QuestionWiseSummary';
import Warning from './components/Warning';
import {
  StudentSummaryState,
  StudentSummaryData,
  Question,
} from 'app/types/assessment.screens.types';
import { SectionWiseData } from './components/SectionWiseSummary';
import ForceSubmitToast from './components/ForceSubmitToast';

interface StudentSummaryProps {
  studentSummary: StudentSummaryState;
  studentSummaryData: StudentSummaryData | any;
  fetchStudentSummary: any;
  resetStudentSummaryApi: any;
}

function StudentSummaryScreen(props: StudentSummaryProps) {
  const [activeTab, setActiveTab] = useState<TabTypes>(TabTypes.Section_Wise);
  const [warning, setWarning] = useState('');
  const history = useHistory();
  const routeParams: any = useParams();

  const {
    studentSummary,
    fetchStudentSummary,
    resetStudentSummaryApi,
    studentSummaryData,
  } = props;

  const query = new URLSearchParams(history.location.search);
  const testData = query.get('testData') as any;
  const studentData = query.get('studentData') as any;
  const assignmentId = query.get('assignmentId');
  // const parsedTestData = testData && JSON.parse(decodeURIComponent(testData));
  const parsedStudentData =
    studentData && JSON.parse(decodeURIComponent(studentData));

  const allSubjectiveQIds = useMemo(() => {
    if (studentSummaryData.questions) {
      return studentSummaryData.questions.reduce(
        (acc: string[], { qId, questionCode }: Question) => {
          if (questionCode === 4) {
            acc.push(qId);
          }
          return acc;
        },
        [],
      );
    }
    return [];
  }, [studentSummaryData]);

  function navigateToTestEvaluation(metaData: SectionWiseData) {
    const {
      qIds,
      sectionName,
      subSectionName,
      marksScored,
      totalPossibleMarks,
    } = metaData;
    const sectionData = {
      qIds: allSubjectiveQIds.join(','),
      sectionName,
      subSectionName,
      marksScored,
      totalPossibleMarks,
    };
    const testId = studentSummaryData && studentSummaryData.testId;
    history.push(
      `/assessments/testEvaluation?assignmentId=${assignmentId}&testId=${testId}&testData=${testData}&studentData=${studentData}&sectionData=${encodeURIComponent(
        JSON.stringify(sectionData),
      )}`,
    );
  }

  useEffect(() => {
    if (parsedStudentData && parsedStudentData.attemptId) {
      fetchStudentSummary({ attemptId: parsedStudentData.attemptId });
    }
  }, []);

  useEffect(() => {
    if (
      studentSummaryData.status &&
      studentSummaryData.totalSubjectiveQuestions
    ) {
      const {
        status,
        totalSubjectiveQuestions,
        checkedSubjectiveQuestions,
        subjectiveAnswers,
      } = studentSummaryData;

      let isNotSubmitted = false;
      if (subjectiveAnswers && !subjectiveAnswers.student.files.length) {
        isNotSubmitted = true;
      }
      // Dont set warning if not submitted
      if (isNotSubmitted) {
        return;
      }
      if (
        status === 'checking' &&
        totalSubjectiveQuestions - checkedSubjectiveQuestions === 0
      ) {
        setWarning('All checked. Kindly submit your evaluations.');
      } else if (totalSubjectiveQuestions - checkedSubjectiveQuestions > 0) {
        setWarning(
          `Evaluation pending for ${totalSubjectiveQuestions -
            checkedSubjectiveQuestions} subjective questions`,
        );
      }
    }

    return () => {
      // resetting warning
      setWarning('');
    };
  }, [studentSummaryData]);

  const sectionWiseData = useMemo(() => {
    if (studentSummaryData.questions) {
      return getSectionWiseData(studentSummaryData.questions) as {
        [key: string]: { [key: string]: SectionWiseData };
      };
    }
    return null;
  }, [studentSummaryData]);

  const userMarks = useMemo(() => {
    if (studentSummaryData.questions) {
      return studentSummaryData.questions.reduce(
        (acc: number, ques: Question) => {
          const {
            attemptData: { userTotalMarks },
          } = ques;
          return acc + userTotalMarks;
        },
        0,
      );
    }
    return 0;
  }, [studentSummaryData]);

  const {
    maxTotalScore,
    subjectiveAnswers,
    status: testStatus,
  } = studentSummaryData;
  let isNotSubmitted = false;
  if (subjectiveAnswers && !subjectiveAnswers.student.files.length) {
    isNotSubmitted = true;
  }
  return (
    <>
      <HeaderComponent />
      <CommonScreenBackground>
        <CardHeader>
          <Container>
            {Breadcrumb(routeParams, history, { testData, assignmentId })}
            <Grid>
              <HeaderContainer>
                <BackIcon>
                  <img
                    src={
                      'https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/back-icon.svg'
                    }
                    alt="back-icon"
                    onClick={() => history.goBack()}
                  />
                </BackIcon>
                <span style={{ flex: 1 }}>
                  <StudentHeading>
                    {parsedStudentData && parsedStudentData.studentName}
                  </StudentHeading>
                  {!isLoading(studentSummary.apiState) &&
                    !isApiFailed(studentSummary.apiState) && (
                      <HiddenDesktop style={{ fontSize: '14px' }}>
                        Total Marks: {userMarks}/{maxTotalScore}
                      </HiddenDesktop>
                    )}
                </span>
                {!isLoading(studentSummary.apiState) &&
                  !isApiFailed(studentSummary.apiState) && (
                    <HiddenMobile>
                      <TotalMarksPill>
                        <TotalMarksPillIcon />
                        <span>
                          Total Marks: {userMarks}/{maxTotalScore}
                        </span>
                      </TotalMarksPill>
                    </HiddenMobile>
                  )}
              </HeaderContainer>
            </Grid>
          </Container>
        </CardHeader>
        <Container>
          <HiddenDesktop>
            <TabHeader>
              <ul>
                <li
                  className={
                    activeTab === TabTypes.Section_Wise ? 'active' : ''
                  }
                >
                  <span
                    onClick={() =>
                      activeTab !== TabTypes.Section_Wise &&
                      setActiveTab(TabTypes.Section_Wise)
                    }
                  >
                    Section Wise
                  </span>
                </li>
                <li
                  className={
                    activeTab === TabTypes.Question_Wise ? 'active' : ''
                  }
                >
                  <span
                    onClick={() =>
                      activeTab !== TabTypes.Question_Wise &&
                      setActiveTab(TabTypes.Question_Wise)
                    }
                  >
                    Question Wise
                  </span>
                </li>
              </ul>
            </TabHeader>
          </HiddenDesktop>
          <CardListingEdit>
            <LoaderWrapper isLoading={isLoading(studentSummary.apiState)}>
              {!studentSummaryData.questions && <EmptyState />}
              {studentSummaryData.questions && (
                <>
                  <Warning open={!!warning}>{warning}</Warning>
                  <Flex justify="space-between" align="flex-start">
                    <Title>Summary</Title>
                    <HiddenMobile>
                      <TabsEdit>
                        <Tabs
                          activeTab={activeTab}
                          setActiveTab={setActiveTab}
                        />
                      </TabsEdit>
                    </HiddenMobile>
                  </Flex>
                  {activeTab === TabTypes.Section_Wise && (
                    <SectionWiseSummary
                      data={sectionWiseData}
                      total={`${userMarks}/${maxTotalScore}`}
                      navigateToTestEvaluation={navigateToTestEvaluation}
                      isNotSubmitted={isNotSubmitted}
                      testStatus={testStatus}
                    />
                  )}
                  {activeTab === TabTypes.Question_Wise && (
                    <QuestionWiseSummary
                      data={studentSummaryData.questions}
                      total={`${userMarks}/${maxTotalScore}`}
                      isNotSubmitted={isNotSubmitted}
                    />
                  )}
                  {isNotSubmitted &&
                    testStatus !== 'published' &&
                    testStatus !== 'checked' && (
                      <ForceSubmitToast
                        allSubjectiveQIds={allSubjectiveQIds}
                        attemptId={
                          parsedStudentData && parsedStudentData.attemptId
                        }
                      />
                    )}
                </>
              )}
            </LoaderWrapper>
          </CardListingEdit>
        </Container>
      </CommonScreenBackground>
      <SimpleSnackbar
        mode="error"
        state={isApiFailed(studentSummary.apiState)}
        onClose={resetStudentSummaryApi}
        message={'Unable to fetch student result for the test.'}
      />
    </>
  );
}

function getSectionWiseData(questions: Question[]) {
  return questions.reduce((acc: { [key: string]: any }, question) => {
    const {
      section: {
        name: sectionName,
        id: sectionId,
        subSection: { name: subSectionName, id: subSectionId },
      },
      attemptData: {
        questionNegativeMarks,
        questionTotalMarks,
        isAttempted,
        userTotalMarks,
        status,
      },
      questionType,
      questionCode,
      qId,
    } = question;
    if (
      acc.hasOwnProperty(sectionName) &&
      acc[sectionName].hasOwnProperty(subSectionName)
    ) {
      acc[sectionName][subSectionName].totalQuestions += 1;
      acc[sectionName][subSectionName].totalPossibleMarks += questionTotalMarks;

      if (isAttempted) {
        acc[sectionName][subSectionName].attempted += 1;
        acc[sectionName][subSectionName].marksScored += userTotalMarks;
      }
      if (questionCode === 4 && status === 'toBeChecked') {
        acc[sectionName][subSectionName].noOfQuestionsToBeChecked += 1;
      }
      if (questionCode === 4) {
        acc[sectionName][subSectionName].qIds.push(qId);
      }
      return acc;
    } else if (!acc.hasOwnProperty(sectionName)) {
      acc[sectionName] = {};
    }

    acc[sectionName][subSectionName] = {
      questionType,
      questionCode,
      markingScheme: getMarkingScheme({
        questionTotalMarks,
        questionCode,
        questionNegativeMarks,
      }),
      sectionId,
      subSectionId,
      qIds: questionCode === 4 ? [qId] : [],
      attempted: isAttempted ? 1 : 0,
      totalQuestions: 1,
      sectionName,
      subSectionName,
      marksScored: userTotalMarks,
      totalPossibleMarks: questionTotalMarks,
      noOfQuestionsToBeChecked:
        questionCode === 4 && status === 'toBeChecked' ? 1 : 0,
    };
    return acc;
  }, {});
}

export function getMarkingScheme({
  questionTotalMarks,
  questionCode,
  questionNegativeMarks,
}: any) {
  let markingScheme = `+${questionTotalMarks}`;
  if (questionCode !== 4 && questionNegativeMarks === 0) {
    // Not subjective question
    markingScheme += `/${questionNegativeMarks}`;
  } else if (questionCode !== 4 && questionNegativeMarks) {
    markingScheme += `/-${questionNegativeMarks}`;
  }
  return markingScheme;
}

const TotalMarksPillIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0)">
      <path
        d="M8.07864 15.5582C3.95438 15.5582 0.599609 12.2034 0.599609 8.07913C0.599609 3.95486 3.95438 0.600098 8.07864 0.600098C12.2029 0.600098 15.5583 3.95486 15.5583 8.07913C15.5583 12.2034 12.2023 15.5582 8.07864 15.5582Z"
        fill="white"
      />
      <path
        d="M8.89762 3.78052H7.26172V9.51155H8.89762V3.78052Z"
        fill="#FFCC00"
      />
      <path
        d="M8.07934 12.3774C8.65333 12.3774 9.11864 11.9121 9.11864 11.3381C9.11864 10.7641 8.65333 10.2988 8.07934 10.2988C7.50535 10.2988 7.04004 10.7641 7.04004 11.3381C7.04004 11.9121 7.50535 12.3774 8.07934 12.3774Z"
        fill="#FFCC00"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const Breadcrumb = (params: any, history: any, data: any) => {
  const classes = BreadCrumbStyles();
  const { assignmentId, testData } = data;
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      className={classes.styledBreadcrumbs}
    >
      <Link className={classes.link} onClick={() => history.push('/')}>
        Home
      </Link>
      <Link
        className={classes.link}
        onClick={() => history.push('/assessments/testList')}
      >
        Subjective Tests&nbsp;
      </Link>
      <Link
        className={classes.link}
        onClick={() =>
          history.push(
            `/assessments/studentList?assignmentId=${assignmentId}&testData=${testData}`,
          )
        }
      >
        Students
      </Link>
      <Link className={classes.link}>Student</Link>
    </Breadcrumbs>
  );
};

export default StudentSummaryScreen;
