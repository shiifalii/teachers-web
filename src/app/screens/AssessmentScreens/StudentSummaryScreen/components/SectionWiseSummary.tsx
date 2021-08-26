import React from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { HiddenDesktop, HiddenMobile, Right, Flex } from 'app/components/atoms';
import Hidden from '@material-ui/core/Hidden';
import {
  ButtonNoShadow,
  SummaryItem,
  SummaryList,
  SummaryTitle,
  TextMuted,
  TotalMarks,
  useStyles,
} from '../styles';
import { ButtonEdit, SmallDot } from '../../TestListScreen/styles';
import { AssessmentStatus } from 'app/types/assessment.screens.types';

export interface SectionWiseData {
  questionType: string;
  questionCode: number;
  markingScheme: string;
  attempted: number;
  totalQuestions: number;
  marksScored: number;
  totalPossibleMarks: number;
  noOfQuestionsToBeChecked: number;
  sectionId: string;
  subSectionId: string;
  qIds: string[];
  sectionName: string;
  subSectionName: string;
}

interface SectionWiseSummaryProps {
  data: { [key: string]: { [key: string]: SectionWiseData } } | null;
  isNotSubmitted: boolean;
  total: string;
  navigateToTestEvaluation: (metaData: SectionWiseData) => void;
  testStatus: AssessmentStatus;
}

function SectionWiseSummary(props: SectionWiseSummaryProps) {
  const {
    data,
    total,
    navigateToTestEvaluation,
    isNotSubmitted,
    testStatus,
  } = props;
  const classes = useStyles();
  if (!data) {
    return null;
  }

  return (
    <React.Fragment>
      <HiddenMobile>
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
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
                <TableCell align="center">Attempted</TableCell>
                <TableCell align="center">Marks</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(data).map(([sectionName, subSectionObject]) => {
                return Object.entries(subSectionObject).map(
                  ([subSectionName, metaData], i) => {
                    const {
                      sectionId,
                      subSectionId,
                      questionType,
                      markingScheme,
                      attempted,
                      totalQuestions,
                      questionCode,
                      noOfQuestionsToBeChecked,
                    } = metaData;
                    return (
                      <TableRow key={`${sectionId}-${subSectionId}`}>
                        <TableCell align="center">{sectionName}</TableCell>
                        <TableCell align="center">{subSectionName}</TableCell>
                        <TableCell align="center">
                          {questionCode === 4
                            ? 'SUBJECTIVE'
                            : questionType.toUpperCase()}
                        </TableCell>
                        <TableCell align="center">{markingScheme}</TableCell>
                        <TableCell align="center">
                          {noOfQuestionsToBeChecked === 0
                            ? `${attempted}/${totalQuestions}`
                            : 'NA'}
                        </TableCell>
                        {isNotSubmitted && questionCode === 4
                          ? renderNotSubmitted()
                          : renderLastColumn(metaData, {
                              navigateToTestEvaluation,
                              testStatus,
                            })}
                      </TableRow>
                    );
                  },
                );
              })}
              <TableRow>
                <TableCell colSpan={5}>
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
        {Object.entries(data).map(([sectionName, subSectionObject]) => {
          return Object.entries(subSectionObject).map(
            ([subSectionName, metaData], i) => {
              const {
                sectionId,
                subSectionId,
                questionType,
                markingScheme,
                attempted,
                totalQuestions,
                questionCode,
                noOfQuestionsToBeChecked,
              } = metaData;
              return (
                <SummaryList key={`${sectionId}-${subSectionId}`}>
                  <SummaryTitle>
                    {sectionName} <SmallDot></SmallDot>{' '}
                    <TextMuted>{subSectionName}</TextMuted>
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
                      <span>{markingScheme}</span>
                      <SmallDot></SmallDot>
                    </div>

                    <div>
                      <TextMuted>Attempted</TextMuted>{' '}
                      <span>
                        {noOfQuestionsToBeChecked === 0
                          ? `${attempted}/${totalQuestions}`
                          : 'NA'}
                      </span>
                    </div>

                    <div style={{ gridColumn: '1/5', marginTop: '10px' }}>
                      {isNotSubmitted && questionCode === 4
                        ? renderNotSubmitted()
                        : renderLastColumn(metaData, {
                            navigateToTestEvaluation,
                            testStatus,
                          })}
                    </div>
                  </SummaryItem>
                </SummaryList>
              );
            },
          );
        })}

        <TotalMarks>
          <span>Total Marks</span>
          <span>{total}</span>
        </TotalMarks>
      </HiddenDesktop>
    </React.Fragment>
  );
}

function renderLastColumn(
  metaData: SectionWiseData,
  props: { navigateToTestEvaluation: any; testStatus: AssessmentStatus },
) {
  const {
    questionCode,
    marksScored,
    totalPossibleMarks,
    noOfQuestionsToBeChecked,
    totalQuestions,
  } = metaData;
  const { navigateToTestEvaluation, testStatus } = props;

  if (
    questionCode !== 4 ||
    testStatus === 'checked' ||
    testStatus === 'published'
  ) {
    return (
      <>
        <Hidden smDown>
          <TableCell align="center">
            {marksScored}/{totalPossibleMarks}
          </TableCell>
        </Hidden>
        <Hidden smUp>
          <TextMuted> Marks</TextMuted> {marksScored}/{totalPossibleMarks}
        </Hidden>
      </>
    );
  } else if (testStatus === 'toBeChecked') {
    return (
      <>
        <Hidden smDown>
          <TableCell align="center">
            <ButtonEdit
              variant="contained"
              color="primary"
              onClick={() => navigateToTestEvaluation(metaData)}
            >
              Check
            </ButtonEdit>
          </TableCell>
        </Hidden>
        <Hidden smUp>
          <ButtonNoShadow onClick={() => navigateToTestEvaluation(metaData)}>
            Check
          </ButtonNoShadow>
        </Hidden>
      </>
    );
  } else {
    return (
      <>
        <Hidden smDown>
          <TableCell align="center">
            <Link
              onClick={() => navigateToTestEvaluation(metaData)}
              style={{ cursor: 'pointer' }}
            >
              Resume
            </Link>{' '}
            <br /> {totalQuestions - noOfQuestionsToBeChecked}/{totalQuestions}{' '}
            Checked{' '}
          </TableCell>
        </Hidden>
        <Hidden smUp>
          <Flex justify="space-between">
            <div>
              Checked{' '}
              <span>
                {totalQuestions - noOfQuestionsToBeChecked}/{totalQuestions}
              </span>
            </div>
            <Button
              style={{ backgroundColor: '#FFA20C', color: '#fff' }}
              onClick={() => navigateToTestEvaluation(metaData)}
            >
              Resume
            </Button>
          </Flex>
        </Hidden>
      </>
    );
  }
}

function renderNotSubmitted() {
  return (
    <>
      <Hidden smDown>
        <TableCell align="center">Not submitted</TableCell>
      </Hidden>
      <Hidden smUp>Not submitted</Hidden>
    </>
  );
}

export default React.memo(SectionWiseSummary);
