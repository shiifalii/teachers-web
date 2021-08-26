import React from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
// import Link from '@material-ui/core/Link';
import { Right, Container } from 'app/components/atoms';
import Button from '@material-ui/core/Button/Button';
// import Hidden from '@material-ui/core/Hidden';
import { useStyles, Checked, StickyFooterBar } from '../styles';
import { Question } from 'app/types/assessment.screens.types';
import SaveAndSubmitPopup from './SaveAndSubmitPopup';
import { isLoading } from 'app/helpers/comman.helper';

export interface TestEvaluationData {
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

interface TestEvaluationSummaryProps {
  questions: Question[];
  unsavedQuestions: any[];
  onSubmitAndConfirm?: (payload: any) => void;
  submitEvaluationState: { apiState: number };
}

function TestEvaluationSummary(props: TestEvaluationSummaryProps) {
  // const { data, total, navigateToTestEvaluation } = props;
  const {
    onSubmitAndConfirm,
    questions,
    unsavedQuestions,
    submitEvaluationState,
  } = props;
  const classes = useStyles();
  let userTotalMarks = 0;
  let questionTotalMarks = 0;
  function renderRows() {
    return questions.map((ques: Question) => {
      const foundUnsavedQuestion = unsavedQuestions.find(
        ({ qId }: any) => qId === ques.qId,
      );
      if (foundUnsavedQuestion) {
        userTotalMarks += foundUnsavedQuestion.userPositiveMarks;
      } else {
        userTotalMarks += ques.attemptData.userTotalMarks;
      }
      questionTotalMarks += ques.attemptData.questionTotalMarks;
      let status;
      if (foundUnsavedQuestion || ques.attemptData.status === 'checked') {
        status = 'Checked';
      } else {
        status = 'Not checked';
      }
      const marksAwarded = foundUnsavedQuestion
        ? foundUnsavedQuestion.userPositiveMarks
        : ques.attemptData.userTotalMarks;
      return (
        <TableRow key={ques.qId}>
          <TableCell align="center">{ques.questionNo}</TableCell>
          <TableCell align="center">
            <Checked>{status}</Checked>
          </TableCell>
          <TableCell align="center">
            {marksAwarded}/{ques.attemptData.questionTotalMarks}
          </TableCell>
        </TableRow>
      );
    });
  }
  return (
    <React.Fragment>
      {/* <HiddenMobile> */}
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Q.No</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Marks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {renderRows()}
            <TableRow>
              <TableCell colSpan={2}>
                <Right>
                  <b>Total</b>
                </Right>
              </TableCell>
              <TableCell align="center">
                <b>
                  {userTotalMarks}/{questionTotalMarks}
                </b>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {/* </HiddenMobile> */}

      <StickyFooterBar>
        <Container>
          <Right>
            <Button
              variant="contained"
              color="primary"
              onClick={onSubmitAndConfirm}
            >
              Submit
            </Button>
          </Right>
        </Container>
      </StickyFooterBar>
      <SaveAndSubmitPopup open={isLoading(submitEvaluationState.apiState)} />
    </React.Fragment>
  );
}
export default React.memo(TestEvaluationSummary);
