import React from 'react';
import { Center, Flex, Grid, Right, Truncate } from 'app/components/atoms';
import Meter from 'app/screens/StudentAnalyticsScreen/components/Meter';
import {
  TestListItemContainer,
  TestName,
  TestType,
  TestListMobile,
  TestSchedule,
  SmallDot,
  LinkGreen,
  ButtonGreen,
  ButtonEdit,
  GridEdit,
  NoSubmissionTxt,
  DueDate,
  LinkMobEdit,
} from '../styles';

import Link from '@material-ui/core/Link';
import Hidden from '@material-ui/core/Hidden';
import {
  AssignedCPPTest,
  AssessmentStatus,
} from 'app/types/assessment.screens.types';
import {
  secondsToHms,
  getFormattedDate,
  getFormattedTime,
  addMinutes,
} from 'app/helpers/comman.helper';
import { getCourseNameById } from 'app/helpers/local.storage.helper';
import { TestStatus } from '../testList.screen';
import InfoToolTip from 'app/components/common/info.tooltip';

interface TestListItemprops {
  data: AssignedCPPTest;
  setOpenPublishPopup: any;
  navigateToStudentList: any;
  highlightedName: any;
}

function TestListItem(props: TestListItemprops) {
  const {
    data,
    setOpenPublishPopup,
    navigateToStudentList,
    highlightedName,
  } = props;
  const {
    courseId,
    assignmentInfo: {
      createDate,
      endDate,
      totalStudentsAssigned,
      testDuration,
    },
    subjectiveAssignmentStatsId: {
      status = undefined,
      submissions = undefined,
      avgScore = undefined,
      checked = undefined,
    } = {},
    isSubjective = false,
  } = data;
  const startDate = new Date(createDate);
  const dueDate = new Date(endDate);
  const testStatus = getStatus(startDate, dueDate);

  // status = "toBeChecked"
  // status = "checking"
  // status = 'published';
  // status = "checked"

  return (
    <TestListItemContainer>
      <Hidden smDown>
        <div>
          <TestName>{highlightedName}</TestName>
          <TestType>
            <Truncate maxWidth="50px">{getCourseNameById(courseId)}</Truncate>
            &nbsp;
            <InfoToolTip title={<p>{getCourseNameById(courseId, true)}</p>} />
            <SmallDot></SmallDot> {testDuration && secondsToHms(testDuration)}{' '}
            <SmallDot></SmallDot> {getFormattedDate(startDate)}
            <SmallDot></SmallDot>{' '}
            <TestSchedule status={testStatus}>{testStatus}</TestSchedule>{' '}
          </TestType>
        </div>
        <Center>
          {submissions === undefined
            ? 'NA'
            : `${submissions}/${totalStudentsAssigned}`}
        </Center>

        <Flex justify="center" align="center" direction="column">
          {renderCheckedColumnBasedOnStatus(status, {
            checked,
            submissions,
            isSubjective,
          })}
        </Flex>

        <Center>
          {!checked ? 'NA' : `${avgScore && Math.round(avgScore * 100) / 100}%`}
        </Center>

        <DueDate>
          <div>{getFormattedDate(dueDate)},</div>
          <div>{getFormattedTime(dueDate)}</div>
        </DueDate>

        <Center>
          {renderCTABasedOnStatus(status, {
            setOpenPublishPopup,
            navigateToStudentList,
            testStatus,
            data,
            dueDate,
          })}
        </Center>
      </Hidden>
      <Hidden smUp>
        <div>
          <TestName>{highlightedName}</TestName>
          <TestListMobile>
            <Flex align="center">
              <Truncate responsiveMaxWidth="50px">
                {getCourseNameById(courseId)}
              </Truncate>
              &nbsp;
              <InfoToolTip
                title={<p>{getCourseNameById(courseId, true)}</p>}
              />{' '}
              <SmallDot></SmallDot> {testDuration && secondsToHms(testDuration)}{' '}
              <SmallDot></SmallDot> {getFormattedDate(startDate)}{' '}
              <SmallDot></SmallDot>
              <TestSchedule status={testStatus}>{testStatus}</TestSchedule>{' '}
            </Flex>
          </TestListMobile>
          <div>
            <TestListMobile>
              <span>
                Submissions{' '}
                <span>
                  {submissions === undefined
                    ? 'NA'
                    : `${submissions}/${totalStudentsAssigned}`}
                </span>
              </span>
              <SmallDot></SmallDot>
              {isSubjective && (
                <span>
                  Checked{' '}
                  <span>
                    {checked}/{submissions}{' '}
                  </span>{' '}
                  <SmallDot></SmallDot>
                </span>
              )}

              <span>
                Avg. Score{' '}
                <span>
                  {!checked
                    ? 'NA'
                    : `${avgScore && Math.round(avgScore * 100) / 100}%`}{' '}
                </span>{' '}
              </span>
            </TestListMobile>
            <TestListMobile>
              Due Date {getFormattedDate(dueDate)},{getFormattedTime(dueDate)}
            </TestListMobile>
          </div>
        </div>
        <GridEdit>
          <div>
            {renderCheckedColumnBasedOnStatus(status, {
              checked,
              submissions,
              isSubjective,
            })}
          </div>
          <Right>
            {renderCTABasedOnStatus(status, {
              setOpenPublishPopup,
              navigateToStudentList,
              testStatus,
              data,
              dueDate,
            })}
          </Right>
        </GridEdit>
      </Hidden>
    </TestListItemContainer>
  );
}

function renderCheckedColumnBasedOnStatus(
  status: AssessmentStatus | undefined,
  props: any,
) {
  const { checked, submissions, isSubjective } = props;
  if (!isSubjective) {
    return (
      <Hidden smDown>
        <div>NA</div>
      </Hidden>
    );
  }
  switch (status) {
    case 'checked': {
      return (
        <Hidden smDown>
          <img
            src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/check.svg"
            alt=""
          />
        </Hidden>
      );
    }
    case 'checking': {
      return (
        <>
          <Meter score={checked} total={submissions} />
          <div>
            {checked}/{submissions}
          </div>
        </>
      );
    }
    case 'toBeChecked': {
      return (
        <Hidden smDown>
          <div>
            {checked}/{submissions}
          </div>
        </Hidden>
      );
    }

    case 'published': {
      return (
        <Hidden smDown>
          <div>
            {checked}/{submissions}
          </div>
        </Hidden>
      );
    }
    default: {
      return (
        <div>
          {checked}/{submissions}
        </div>
      );
    }
  }
}

function renderCTABasedOnStatus(
  status: AssessmentStatus | undefined,
  props: any,
) {
  const {
    setOpenPublishPopup,
    navigateToStudentList,
    testStatus,
    data,
    dueDate,
  } = props;
  const {
    isSubjective,
    subjectiveAssignmentStatsId: { submissions = undefined } = {},
  } = data;
  if (!isSubjective) {
    return (
      <div>
        <LinkMobEdit onClick={() => navigateToStudentList(data)}>
          View Result
        </LinkMobEdit>
      </div>
    );
  }
  if (!submissions) {
    return <NoSubmissionTxt>No submissions yet</NoSubmissionTxt>;
  }
  switch (status) {
    case 'checked': {
      return (
        <GridEdit>
          <ButtonGreen
            onClick={
              () =>
                navigateToStudentList(
                  data,
                  true,
                ) /* setOpenPublishPopup(true) */
            }
          >
            Publish Result
          </ButtonGreen>
          <div>
            <Link
              style={{ cursor: 'pointer', fontSize: '14px', display: 'block' }}
              onClick={() => navigateToStudentList(data)}
            >
              View Details
            </Link>
          </div>
        </GridEdit>
      );
    }
    case 'checking': {
      return (
        <Link
          style={{ cursor: 'pointer', fontSize: '14px' }}
          onClick={() => navigateToStudentList(data)}
        >
          Resume Checking
        </Link>
      );
    }
    case 'published': {
      return (
        <GridEdit>
          <LinkGreen>
            <img
              src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/check.svg"
              alt=""
            />{' '}
            &nbsp; Published{' '}
          </LinkGreen>
          <Link
            style={{ cursor: 'pointer' }}
            onClick={() => navigateToStudentList(data)}
          >
            View Details
          </Link>
        </GridEdit>
      );
    }
    case 'toBeChecked': {
      const paddedDueDate = addMinutes(dueDate, 15);
      const currentDate = new Date();
      const isCheckedBtnDisabled =
        testStatus !== 'Past' || currentDate < paddedDueDate;
      return (
        <ButtonEdit
          onClick={() => navigateToStudentList(data)}
          disabled={isCheckedBtnDisabled}
        >
          Check
        </ButtonEdit>
      );
    }
  }
}

function getStatus(startDate: Date, endDate: Date): TestStatus {
  const currentDate = new Date();
  if (startDate > currentDate) {
    return 'Upcoming';
  } else if (startDate < currentDate && currentDate < endDate) {
    return 'Live';
  }
  return 'Past';
}

export default React.memo(TestListItem);
