import React from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import {
  SummaryItem,
  SummaryList,
  SummaryTitle,
  TextMuted,
  TotalMarks,
  useStyles,
} from '../styles';
import FooterBar from './FooterBar';

import { Right, Flex } from 'app/components/atoms';
import { HiddenMobile, HiddenDesktop } from 'app/components';
import { SmallDot } from '../../TestListScreen/styles';
import { Question, AssessmentStatus } from 'app/types/assessment.screens.types';
import { getMarkingScheme } from '../studentSummary.screen';

interface QuestionWiseSummaryProps {
  data: Question[];
  total: string;
  isNotSubmitted: boolean;
}

function QuestionWiseSummary(props: QuestionWiseSummaryProps) {
  const { data, total, isNotSubmitted } = props;
  const classes = useStyles();
  return (
    <React.Fragment>
      <HiddenMobile>
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  Question <br /> Number
                </TableCell>
                <TableCell align="center">
                  Section <br /> Name
                </TableCell>
                <TableCell align="center">
                  Sub Section <br /> Name
                </TableCell>
                <TableCell align="center">
                  Question <br /> Type{' '}
                </TableCell>
                <TableCell align="center">
                  Marking <br /> Scheme
                </TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Marks</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(question => {
                const {
                  questionNo,
                  questionType,
                  questionCode,
                  section: {
                    name: sectionName,
                    subSection: { name: subSectionName },
                  },
                  attemptData: {
                    questionTotalMarks,
                    questionNegativeMarks,
                    status,
                  },
                } = question;
                return (
                  <TableRow key={questionNo}>
                    <TableCell align="center">{questionNo}</TableCell>
                    <TableCell align="center">{sectionName}</TableCell>
                    <TableCell align="center">{subSectionName}</TableCell>
                    <TableCell align="center">
                      {questionCode === 4
                        ? 'SUBJECTIVE'
                        : questionType.toUpperCase()}
                    </TableCell>
                    <TableCell align="center">
                      {getMarkingScheme({
                        questionCode,
                        questionTotalMarks,
                        questionNegativeMarks,
                      })}
                    </TableCell>
                    <TableCell align="center">
                      {renderStatusMark(status, question, isNotSubmitted)}
                    </TableCell>
                    <TableCell align="center">
                      {renderMarksColumn(status, question)}
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell colSpan={6}>
                  <Right>
                    <b>Total</b>
                  </Right>
                </TableCell>
                <TableCell align="center">
                  <b>{total}</b>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </HiddenMobile>

      <HiddenDesktop>
        {data.map(question => {
          const {
            questionNo,
            questionType,
            questionCode,
            section: {
              name: sectionName,
              subSection: { name: subSectionName },
            },
            attemptData: { questionTotalMarks, questionNegativeMarks, status },
          } = question;
          return (
            <SummaryList key={questionNo}>
              <SummaryTitle>
                Q{questionNo} <SmallDot></SmallDot> {sectionName}{' '}
                <SmallDot></SmallDot> <TextMuted>{subSectionName}</TextMuted>
              </SummaryTitle>
              <SummaryItem>
                <div>
                  <TextMuted>Type</TextMuted>{' '}
                  <span>
                    {questionCode === 4
                      ? 'SUBJECTIVE'
                      : questionType.toUpperCase()}
                  </span>
                  <SmallDot></SmallDot>
                </div>

                <div>
                  <TextMuted> Marking Scheme</TextMuted>{' '}
                  <span>
                    {getMarkingScheme({
                      questionCode,
                      questionTotalMarks,
                      questionNegativeMarks,
                    })}
                  </span>
                  <SmallDot></SmallDot>
                </div>

                <Flex align="center">
                  <TextMuted style={{ marginRight: '2px' }}>Status</TextMuted>{' '}
                  {renderStatusMark(status, question, isNotSubmitted)}
                </Flex>

                <div>
                  <TextMuted> Marks</TextMuted>{' '}
                  <span>{renderMarksColumn(status, question)}</span>
                </div>
              </SummaryItem>
            </SummaryList>
          );
        })}

        <TotalMarks>
          <span>Total Marks</span>
          <span>{total}</span>
        </TotalMarks>
      </HiddenDesktop>
      <FooterBar />
    </React.Fragment>
  );
}

function renderStatusMark(
  status: AssessmentStatus,
  question: Question,
  isNotSubmitted: boolean,
) {
  const {
    attemptData: { isCorrect, userTotalMarks, questionTotalMarks },
    questionCode,
  } = question;

  if (isNotSubmitted) {
    return (
      <img
        src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/not-attempted.svg"
        alt=""
      />
    );
  }

  if (status === 'toBeChecked' && questionCode === 4) {
    return (
      <img
        src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/not-checked.svg"
        alt=""
      />
    );
  } else if (isCorrect === 0) {
    return (
      <img
        src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/cancel.svg"
        alt=""
      />
    );
  } else if (isCorrect === 2) {
    return (
      <img
        src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/not-attempted.svg"
        alt=""
      />
    );
  } else if (isCorrect === 1 && userTotalMarks !== questionTotalMarks) {
    return (
      <img
        src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/partially-right.svg"
        alt=""
      />
    );
  } else if (isCorrect === 1) {
    return (
      <img
        src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/check.svg"
        alt=""
      />
    );
  }
  return null;
}

function renderMarksColumn(status: AssessmentStatus, question: Question) {
  const {
    attemptData: { isAttempted, userTotalMarks, questionTotalMarks },
    questionCode,
  } = question;
  if (questionCode === 4 && (!isAttempted || status === 'toBeChecked')) {
    return `_/${questionTotalMarks}`;
  } else {
    return `${userTotalMarks}/${questionTotalMarks}`;
  }
}

export default React.memo(QuestionWiseSummary);
