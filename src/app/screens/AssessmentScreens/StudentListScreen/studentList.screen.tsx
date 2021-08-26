import React, { useEffect, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { EmptyState } from 'app/components/common/emptyState.component';
import LoaderWrapper from 'app/components/common/loader.wrapper.component';
import HeaderComponent from 'app/components/common/header.component';
import SimpleSnackbar from 'app/components/common/snackbar.component';
import { Container } from 'app/components';
import { HiddenDesktop, HiddenMobile, Center } from 'app/components/atoms';
import BreadCrumbStyles from 'app/components/common/breadcrumbs.styles';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {
  CardListing,
  CommonScreenBackground,
  Grid,
  ClassCount,
  BackIcon,
  CardHeader,
} from 'app/components/common/common.screen.styles';
import { useStyles, Listing, StudentHeader, StudentHeading } from './styles';
import {
  StudentListState,
  StudentListItem as StudentListItemInterface,
} from 'app/types/assessment.screens.types';
import { isApiFailed, isLoading } from 'app/helpers/comman.helper';
import StudentListItem from './components/StudentListItem';
import orderBy from 'lodash/orderBy';

interface StudentListProps {
  studentListData: StudentListState;
  fetchStudentList: any;
  resetStudentListApi: any;
}

function StudentListScreen(props: StudentListProps) {
  const history = useHistory();
  const routeParams: any = useParams();
  const { studentListData, fetchStudentList, resetStudentListApi } = props;

  const query = new URLSearchParams(history.location.search);
  let assignmentId = query.get('assignmentId');
  const testData = query.get('testData') as any;

  function navigateToStudentSummary(data: StudentListItemInterface) {
    const studentData = encodeURIComponent(
      JSON.stringify({
        attemptId: data.attemptData.paperAttemptId,
        studentName: data.studentName,
      }),
    );

    history.push(
      `/assessments/studentSummary?assignmentId=${assignmentId}&testData=${testData}&studentData=${studentData}`,
    );
  }

  const parsedTestData = testData && JSON.parse(decodeURIComponent(testData));

  useEffect(() => {
    if (assignmentId) {
      fetchStudentList({ assignmentId });
    }
  }, [fetchStudentList, assignmentId]);

  let {
    data: { studentList = [] },
  } = studentListData;

  const noOfStudentsChecked = useMemo(() => {
    return studentList.reduce(
      (acc: number, student: StudentListItemInterface) => {
        const {
          attemptData: { status },
        } = student;
        if (status === 'checked' || status === 'published') {
          acc += 1;
        }
        return acc;
      },
      0,
    );
  }, [studentList]);

  const sortedStudentList = useMemo(() => {
    return orderBy(studentList, ['studentName'], ['asc']);
  }, [studentList]);

  return (
    <>
      <HeaderComponent />
      <CommonScreenBackground>
        <CardHeader>
          <Container>
            {Breadcrumb(routeParams, history)}
            <Grid>
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
                  <StudentHeading>
                    {parsedTestData &&
                      `${parsedTestData.testName} ${
                        parsedTestData.submissions === undefined
                          ? ''
                          : `(${noOfStudentsChecked}/${parsedTestData.submissions})`
                      }`}
                  </StudentHeading>
                </span>
              </ClassCount>
            </Grid>
          </Container>
        </CardHeader>
        <Container>
          <CardListing cols="82% 13% 5%" responsiveCols="68% 24% 8%">
            <HiddenMobile className="desktop">
              <Listing>
                <LoaderWrapper isLoading={isLoading(studentListData.apiState)}>
                  <StudentHeader>
                    <div>Students List</div>
                    <Center>Score</Center>
                    <Center>Status</Center>
                  </StudentHeader>
                  {sortedStudentList.map((data: StudentListItemInterface) => (
                    <StudentListItem
                      key={data.mypatStudentId}
                      data={data}
                      navigateToStudentSummary={navigateToStudentSummary}
                    />
                  ))}
                  {sortedStudentList.length === 0 && <EmptyState />}
                </LoaderWrapper>
              </Listing>
            </HiddenMobile>
            <HiddenDesktop>
              <Listing>
                <LoaderWrapper isLoading={isLoading(studentListData.apiState)}>
                  {sortedStudentList.map((data: StudentListItemInterface) => (
                    <StudentListItem
                      key={data.mypatStudentId}
                      data={data}
                      navigateToStudentSummary={navigateToStudentSummary}
                    />
                  ))}
                  {sortedStudentList.length === 0 && <EmptyState />}
                </LoaderWrapper>
              </Listing>
            </HiddenDesktop>
          </CardListing>
        </Container>
      </CommonScreenBackground>
      <SimpleSnackbar
        mode="error"
        state={isApiFailed(studentListData.apiState)}
        onClose={resetStudentListApi}
        message={'Unable to fetch student list for the test.'}
      />
    </>
  );
}

const Breadcrumb = (
  // TODO add interface later
  params: any,
  history: any,
) => {
  const classes = BreadCrumbStyles();

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
      <Link className={classes.link}>Students</Link>
    </Breadcrumbs>
  );
};

export default StudentListScreen;
