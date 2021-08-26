import React from 'react';
import Avatar from '@material-ui/core/Avatar/Avatar';
import { Box } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import Meter from 'app/screens/StudentAnalyticsScreen/components/Meter';
import {
  StudentListItemContainer,
  EnrollmentNo,
  StudentNameContainer,
  StudentScore,
  CheckIcon,
  NotCheckedIcon,
  LinkMobEdit,
  BoxMobile,
  FlexMobile,
} from '../styles';
import { Button, Flex } from 'app/components/atoms';
import Hidden from '@material-ui/core/Hidden';
import {
  StudentListItem as StudentListItemInterface,
  AssessmentStatus,
} from 'app/types/assessment.screens.types';
import { NoSubmissionTxt } from '../../TestListScreen/styles';

interface Props {
  data: StudentListItemInterface;
  navigateToStudentSummary: any;
}

function StudentListItem(props: Props) {
  const { data, navigateToStudentSummary } = props;
  const {
    studentName,
    studentEnrollmentNo,
    attempted,
    attemptData: { userTotalMarks, maxTotalScore, status },
  } = data;
  return (
    <StudentListItemContainer>
      <Hidden smDown>
        <Box display="flex" alignItems="center">
          <Avatar
            alt="Remy Sharp"
            src="https://material-ui.com/static/images/avatar/2.jpg"
          />
          <StudentNameContainer>
            <span>{studentName}</span>
            <EnrollmentNo>ID - {studentEnrollmentNo}</EnrollmentNo>
          </StudentNameContainer>
        </Box>
        <Box justifyContent="center" display="flex" alignItems="center">
          {status !== 'toBeChecked' && attempted
            ? `${userTotalMarks}/${maxTotalScore}`
            : 'NA'}
        </Box>

        {renderStatusColumn(status, data)}

        <Box justifyContent="center" display="flex" alignItems="center">
          {renderCTABasedOnStatus(status, { navigateToStudentSummary, data })}
        </Box>
      </Hidden>
      <Hidden smUp>
        <Box display="flex" alignItems="center">
          <Avatar
            alt="Remy Sharp"
            src="https://material-ui.com/static/images/avatar/2.jpg"
          />
          <StudentNameContainer>
            <span>{studentName}</span>
            <EnrollmentNo>ID - {studentEnrollmentNo}</EnrollmentNo>
          </StudentNameContainer>
        </Box>

        {status !== 'checking' ? (
          renderStatusColumn(status, data)
        ) : (
          <Box justifyContent="flex-start" display="flex" alignItems="center" />
        )}

        <Box justifyContent="flex-start" display="flex" alignItems="center">
          {status !== 'checking' ? (
            <StudentScore>
              <b>Score</b>{' '}
              {status !== 'toBeChecked' && attempted ? (
                <span>
                  <b>{userTotalMarks}</b>
                  <span>/{maxTotalScore}</span>
                </span>
              ) : (
                'NA'
              )}
            </StudentScore>
          ) : (
            renderStatusColumn(status, data)
          )}
        </Box>

        <Box justifyContent="flex-end" display="flex" alignItems="center">
          {renderCTABasedOnStatus(status, { navigateToStudentSummary, data })}
        </Box>
      </Hidden>
    </StudentListItemContainer>
  );
}

function renderStatusColumn(
  status: AssessmentStatus,
  data: StudentListItemInterface,
) {
  const {
    attemptData: { totalSubjectiveQuestions, checkedSubjectiveQuestions },
    attempted,
  } = data;
  if (!attempted) {
    return (
      <Box justifyContent="center" display="flex" alignItems="center">
        <Hidden smDown>NA</Hidden>
      </Box>
    );
  }
  switch (status) {
    case 'checking':
      return (
        <>
          <Hidden smDown>
            <Box
              justifyContent="center"
              display="flex"
              alignItems="center"
              flexDirection="column"
            >
              <div style={{ marginBottom: '5px' }}>
                Progress Q. ({checkedSubjectiveQuestions}/
                {totalSubjectiveQuestions})
              </div>
              <Meter
                score={checkedSubjectiveQuestions}
                total={totalSubjectiveQuestions}
              />
            </Box>
          </Hidden>
          <Hidden smUp>
            <Box
              justifyContent="center"
              display="flex"
              alignItems="flex-end"
              flexDirection="row"
            >
              <div
                style={{ marginRight: '5px', fontSize: '12px', color: '#666' }}
              >
                Progress
              </div>
              <Flex align="center" justify="center" direction="column">
                <span style={{ fontSize: '10px' }}>
                  Q. ({checkedSubjectiveQuestions}/{totalSubjectiveQuestions})
                </span>
                <Meter
                  score={checkedSubjectiveQuestions}
                  total={totalSubjectiveQuestions}
                />
              </Flex>
            </Box>
          </Hidden>
        </>
      );

    case 'toBeChecked':
      return (
        <FlexMobile align="center" justify="center">
          <NotCheckedIcon />
          Not Checked
        </FlexMobile>
      );
    default:
      return (
        <BoxMobile justifyContent="center" display="flex" alignItems="center">
          <CheckIcon style={{ color: '#77BD30' }} />
          Checked
        </BoxMobile>
      );
  }
}

function renderCTABasedOnStatus(
  status: AssessmentStatus,
  { navigateToStudentSummary, data }: any,
) {
  const { attempted } = data;
  if (!attempted) {
    return <NoSubmissionTxt>No submission</NoSubmissionTxt>;
  }
  switch (status) {
    case 'checking':
      return (
        <Button
          style={{ backgroundColor: '#FFA20C' }}
          onClick={() => navigateToStudentSummary(data)}
        >
          Resume
        </Button>
      );

    case 'toBeChecked':
      return (
        <Button onClick={() => navigateToStudentSummary(data)}>Check</Button>
      );

    default:
      return (
        <LinkMobEdit onClick={() => navigateToStudentSummary(data)}>
          View Result
        </LinkMobEdit>
      );
  }
}

export default React.memo(StudentListItem);
