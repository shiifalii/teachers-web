import React, { useMemo, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { EmptyState } from 'app/components/common/emptyState.component';
import LoaderWrapper from 'app/components/common/loader.wrapper.component';
import SimpleSnackbar from 'app/components/common/snackbar.component';
import HeaderComponent from 'app/components/common/header.component';

import { Container } from 'app/components';

import BreadCrumbStyles from 'app/components/common/breadcrumbs.styles';
import { HiddenMobile, Right } from 'app/components/atoms';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import QuestionControlPanel from './components/QuestionControlPanel';
import {
  CommonScreenBackground,
  ClassCount,
  BackIcon,
  CardHeader,
} from 'app/components/common/common.screen.styles';
import {
  ButtonEdit,
  GridEdit,
  PdfContainer,
  SaveIcon,
  TotalMarksPdf,
  Title,
  StickyFooterBar,
  ButtonCapitalize,
  FullScreenContainer,
} from './styles';
import {
  CardListingEdit,
  TotalMarksPill,
} from '../StudentSummaryScreen/styles';
import {
  StudentSummaryData,
  TestEvaluationState,
  StudentSummaryState,
  Question,
} from 'app/types/assessment.screens.types';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import { isApiFailed, isLoading } from 'app/helpers/comman.helper';
import TestEvaluationSummary from './components/TestEvaluationSummary';
import Button from '@material-ui/core/Button/Button';
import _ from 'lodash';

import SaveChangesPopup from './components/SaveChangesPopup';
import AttentionPopup from './components/AttentionPopup';
import PDFSketch from './components/PDFSketch';

interface TestEvaluationProps {
  studentSummary: StudentSummaryState;
  studentSummaryData: StudentSummaryData;
  testEvaluation: TestEvaluationState;
  fetchStudentSummary: any;
  fetchTeachersPDF: any;
  resetStudentSummaryApi: any;
  resetUnsavedChanges: any;
  marksAssigned: any;
  pdfModified: any;
  syncEvaluation: any;
  teachersPdfData: any;
  submitEvaluation: any;
  testEvaluationData: any;
  resetTestEvaluationApi: any;
  submitEvaluationState: any;
  resetSubmitEvaluationState: any;
  toggleSubmitSummary: any;
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

function TestEvaluationScreen(props: TestEvaluationProps) {
  // const [open, setOpenSaveChangesPopup] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [sshowAttentionPopup, setShowAttentionPopup] = useState(false);
  const [progress, setProgress] = useState(40);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [userMarks, setUserMarks] = useState(0);
  const history = useHistory();
  const routeParams: any = useParams();
  const query = new URLSearchParams(history.location.search);
  const testData = query.get('testData') as any;
  const studentData = query.get('studentData') as any;
  const assignmentId = query.get('assignmentId');
  const sectionData = query.get('sectionData');
  const testId = query.get('testId');
  const parsedStudentData =
    studentData && JSON.parse(decodeURIComponent(studentData));
  const parsedSectionData = useMemo(() => {
    return sectionData && JSON.parse(decodeURIComponent(sectionData));
  }, [sectionData]);

  const {
    studentSummary,
    studentSummaryData,
    fetchStudentSummary,
    fetchTeachersPDF,
    resetStudentSummaryApi,
    teachersPdfData,
    testEvaluation,
    marksAssigned,
    syncEvaluation,
    testEvaluationData,
    submitEvaluation,
    resetTestEvaluationApi,
    submitEvaluationState,
    resetSubmitEvaluationState,
    toggleSubmitSummary,
    pdfModified,
  } = props;

  useEffect(() => {
    if (!studentSummaryData || Object.keys(studentSummaryData).length === 0) {
      if (parsedStudentData && parsedStudentData.attemptId) {
        fetchStudentSummary({ attemptId: parsedStudentData.attemptId });
      }
    }
    fetchTeachersPDF({ testId });
    resetTestEvaluationApi();
  }, []);

  useEffect(() => {
    return () => {
      resetTestEvaluationApi();
    };
  }, []);

  const navigateQuestions = (
    step: -1 | 1,
    isQuestionClicked: boolean = false,
  ) => {
    const nextStep = isQuestionClicked ? step : currentQuestionIndex + step;
    if (nextStep > -1 && nextStep < questionsToBeEvaluated.length) {
      setCurrentQuestionIndex(nextStep);
    }
  };

  function getSnackbarData() {
    const data = { state: false, message: '', onClose: () => {} };

    if (isApiFailed(studentSummary.apiState)) {
      data.state = true;
      data.message = 'Unable to fetch student summary for the test.';
      data.onClose = resetStudentSummaryApi;
    }
    if (isApiFailed(testEvaluation.apiState)) {
      data.state = true;
      data.message = 'Unable to update.';
      data.onClose = resetTestEvaluationApi;
    }
    if (isApiFailed(submitEvaluationState.apiState)) {
      data.state = true;
      data.message =
        'All questions are not checked/synced, can not submit sheet';
      data.onClose = resetSubmitEvaluationState;
    }
    return data;
  }

  const questionsToBeEvaluated: Question[] = useMemo(() => {
    if (
      !parsedSectionData ||
      !parsedSectionData.qIds ||
      !studentSummaryData ||
      Object.keys(studentSummaryData).length === 0
    ) {
      return [];
    }
    const qIdsArr = parsedSectionData.qIds.split(',');
    return studentSummaryData.questions.filter(({ qId }) =>
      qIdsArr.includes(qId),
    );
  }, [parsedSectionData, studentSummaryData]);

  useEffect(() => {
    if (questionsToBeEvaluated.length > 0 && parsedSectionData) {
      const index = questionsToBeEvaluated.findIndex(
        ({
          section: {
            name: sectionName,
            subSection: { name: subSectionName },
          },
        }) =>
          sectionName === parsedSectionData.sectionName &&
          subSectionName === parsedSectionData.subSectionName,
      );
      setCurrentQuestionIndex(index > -1 ? index : 0);
    }
  }, [questionsToBeEvaluated, parsedSectionData]);

  useEffect(() => {
    const { messages } = testEvaluationData;

    if (
      messages.includes('Marks awarded successfully') &&
      messages.includes('Teachers evaluation sheet synced successfully')
    ) {
      setProgress(60);
      setTimeout(() => setProgress(100), 500);
    } else if (
      messages.includes('Marks awarded successfully') ||
      messages.includes('Teachers evaluation sheet synced successfully')
    ) {
      setProgress(100);
    }

    if (messages.includes('Teachers evaluation sheet submitted successfully')) {
      //@ts-ignore
      window.location.replace(
        `/assessments/studentSummary?assignmentId=${assignmentId}&testData=${testData}&studentData=${studentData}`,
      );
      // history.push(
      //   `/assessments/studentSummary?assignmentId=${assignmentId}&testData=${testData}&studentData=${studentData}`,
      // );
    }
  }, [testEvaluationData]);

  const onSubmit = () => {
    toggleSubmitSummary(true);
  };

  const onSubmitAndConfirm = () => {
    const attemptId = parsedStudentData && parsedStudentData.attemptId;
    if (unsavedChangesPresent) {
      syncEvaluation({
        data: {
          attemptId: parsedStudentData.attemptId,
        },
        toSubmit: true,
      });
    } else {
      submitEvaluation({
        data: { attemptId },
      });
    }
  };

  const onSave = () => {
    const { unsavedChangesPresent } = testEvaluationData;
    if (!unsavedChangesPresent) {
      return;
    }
    setShowPopup(true);
    if (parsedStudentData && parsedStudentData.attemptId) {
      syncEvaluation({
        data: {
          attemptId: parsedStudentData.attemptId,
        },
      });
    }
  };

  const onBack = () => {
    const { unsavedChangesPresent, showSubmitSummary } = testEvaluationData;
    if (unsavedChangesPresent && !showSubmitSummary) {
      setShowAttentionPopup(true);
    } else if (!showSubmitSummary) {
      history.goBack();
    } else toggleSubmitSummary(false);
  };

  const onConfirm = () => {
    history.goBack();
  };

  let { userTotalMarks, questionTotalMarks } = useMemo(() => {
    const data = { userTotalMarks: 0, questionTotalMarks: 0 };
    questionsToBeEvaluated.forEach((q: any) => {
      data.userTotalMarks += q.attemptData.userTotalMarks;
      data.questionTotalMarks += q.attemptData.questionTotalMarks;
    });
    return data;
  }, [questionsToBeEvaluated]);

  useEffect(() => {
    setUserMarks(userTotalMarks);
  }, [userTotalMarks]);

  useEffect(() => {
    if (studentSummaryData.subjectiveAnswers) {
      const teacherPDF = _.get(
        studentSummaryData,
        'subjectiveAnswers.teacher.content[0].url',
      );
      if (!teacherPDF) {
        pdfModified();
      }
    }
  }, [studentSummaryData.subjectiveAnswers]);

  const loadingStatus = testEvaluation.apiState !== 2;
  let pdfURL;
  if (studentSummaryData.subjectiveAnswers) {
    const studentPDF = _.get(
      studentSummaryData,
      'subjectiveAnswers.student.content[0].url',
    );
    const teacherPDF = _.get(
      studentSummaryData,
      'subjectiveAnswers.teacher.content[0].url',
    );
    pdfURL = studentPDF;

    if (studentSummaryData.status !== 'toBeChecked' && teacherPDF) {
      pdfURL = teacherPDF;
    }
  }

  const { currentSectionName, currentSubSectionName } = useMemo(() => {
    const data = { currentSectionName: '', currentSubSectionName: '' };
    if (
      parsedSectionData &&
      questionsToBeEvaluated.length > 0 &&
      currentQuestionIndex > -1
    ) {
      const currentQuestion = questionsToBeEvaluated[currentQuestionIndex];
      data.currentSectionName = currentQuestion.section.name;
      data.currentSubSectionName = currentQuestion.section.subSection.name;
    } else {
      data.currentSectionName = parsedSectionData.sectionName;
      data.currentSubSectionName = parsedSectionData.subSectionName;
    }
    return data;
  }, [parsedSectionData, questionsToBeEvaluated, currentQuestionIndex]);

  const snackbarData = getSnackbarData();
  const {
    unsavedChangesPresent,
    unsavedQuestions,
    showSubmitSummary,
    isFullScreen,
  } = testEvaluationData;

  return (
    <>
      <HeaderComponent />
      <CommonScreenBackground>
        <CardHeader>
          <Container>
            {Breadcrumb(routeParams, history, {
              testData,
              studentData,
              assignmentId,
            })}
            <GridEdit>
              <ClassCount>
                <BackIcon>
                  <img
                    src={
                      'https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/back-icon.svg'
                    }
                    alt="back-icon"
                    onClick={onBack}
                  />
                </BackIcon>
                <span>
                  <span className="studentHeading">
                    {parsedStudentData && parsedStudentData.studentName}
                  </span>
                  {parsedSectionData && (
                    <div style={{ fontSize: '0.8rem', marginTop: '10px' }}>
                      {currentSectionName} / {currentSubSectionName} (Subjective
                      Type)
                    </div>
                  )}
                </span>
              </ClassCount>
              {showSubmitSummary ? (
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <HiddenMobile>
                    <TotalMarksPill>
                      <TotalMarksPillIcon />
                      &nbsp; Total Marks: {userMarks}/{questionTotalMarks}
                    </TotalMarksPill>
                  </HiddenMobile>
                </Box>
              ) : (
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <TotalMarksPdf>
                    Total Marks: {userMarks}/{questionTotalMarks}
                  </TotalMarksPdf>
                  <SaveIcon onClick={onSave} disabled={!unsavedChangesPresent}>
                    <img
                      src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/save-icon.svg"
                      alt="save"
                    />
                  </SaveIcon>

                  <ButtonEdit
                    color="primary"
                    variant="contained"
                    onClick={onSubmit}
                  >
                    Submit
                  </ButtonEdit>
                </Box>
              )}
            </GridEdit>
          </Container>
        </CardHeader>
        <Backdrop
          style={{ zIndex: 1, backgroundColor: 'rgba(0,0,0,0.8)' }}
          open={isFullScreen}
        />
        <FullScreenContainer isFullScreen={isFullScreen}>
          <CardListingEdit>
            <LoaderWrapper
              isLoading={
                isLoading(studentSummary.apiState) ||
                isLoading(testEvaluation.apiState)
              }
            >
              {questionsToBeEvaluated.length > 0 && !showSubmitSummary && (
                <PdfContainer>
                  {/* <img
                    width="100%"
                    src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/pdf-placeholder.png"
                    alt=""
                  /> */}
                  <PDFSketch url={pdfURL} />

                  <div>
                    <QuestionControlPanel
                      teachersPdfData={teachersPdfData}
                      questionsToBeEvaluated={questionsToBeEvaluated}
                      navigateQuestions={navigateQuestions}
                      setUserMarks={setUserMarks}
                      marksAssignedToQuestion={marksAssigned}
                      unsavedQuestions={unsavedQuestions}
                      currentQuestion={
                        currentQuestionIndex > -1
                          ? questionsToBeEvaluated[currentQuestionIndex]
                          : null
                      }
                    />
                  </div>
                </PdfContainer>
              )}
              {questionsToBeEvaluated.length === 0 && !showSubmitSummary && (
                <EmptyState />
              )}
              {showSubmitSummary && (
                <>
                  {/* <Flex justify="space-between" align="flex-start"> */}
                  <Title>Summary</Title>

                  <p>
                    Are you sure want to submit the following evaluation for
                    subjective questions?
                  </p>
                  <br />

                  <StickyFooterBar>
                    <Container>
                      <Right>
                        <ButtonCapitalize variant="contained" color="primary">
                          Submit
                        </ButtonCapitalize>
                      </Right>
                    </Container>
                  </StickyFooterBar>
                  {/* </Flex> */}
                  <TestEvaluationSummary
                    questions={questionsToBeEvaluated}
                    unsavedQuestions={unsavedQuestions}
                    onSubmitAndConfirm={onSubmitAndConfirm}
                    submitEvaluationState={submitEvaluationState}
                  />
                </>
              )}
            </LoaderWrapper>
          </CardListingEdit>
        </FullScreenContainer>
      </CommonScreenBackground>
      <SimpleSnackbar
        mode="error"
        state={snackbarData.state}
        onClose={snackbarData.onClose}
        message={snackbarData.message}
      />
      <SaveChangesPopup
        progress={progress}
        open={showPopup}
        onClose={() => {
          setShowPopup(false);
          setProgress(40);
        }}
      />
      <AttentionPopup
        onConfirm={onConfirm}
        open={sshowAttentionPopup}
        onClose={() => {
          setShowAttentionPopup(false);
        }}
        title="Attention"
        body="Are you sure you wish to go back without saving? All unsaved changes
        will be lost if you do so."
        positiveCTAText="Yes, Go Back"
      />

      {/* <span onClick={() => setOpenQuestionPopup(true)}>View Question</span>
      <ViewQuestionsPopup
        open={openQuestionPopup}
        onClose={() => setOpenQuestionPopup(false)}
      /> */}
    </>
  );
}

const Breadcrumb = (params: any, history: any, data: any) => {
  const classes = BreadCrumbStyles();
  const { assignmentId, testData, studentData } = data;
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
      <Link
        className={classes.link}
        onClick={() =>
          history.push(
            `/assessments/studentSummary?assignmentId=${assignmentId}&testData=${testData}&studentData=${studentData}`,
          )
        }
      >
        Student
      </Link>
      <Link className={classes.link}>Evaluation</Link>
    </Breadcrumbs>
  );
};

export default TestEvaluationScreen;
