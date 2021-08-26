import React, { useState, useEffect } from 'react';
import {
  HiddenDesktop,
  HiddenMobile,
  Flex,
  Button,
} from 'app/components/atoms';

import {
  BoxEdit,
  ButtonEdit,
  MarkContainer,
  MarksAwarded,
  MarksTitle,
  QuestionItem,
  QuestionPanel,
  SelectTitle,
  QuestionControlPanelContainer,
  Mark,
  MainContainer,
} from '../styles';
import { Question } from 'app/types/assessment.screens.types';
import ViewQuestionsPopup from './ViewQuestionsPopup';
import _ from 'lodash';
import EvaluationToolbar from './EvaluationToolbar';

interface UnsavedQuestion {
  qId: string;
  userPositiveMarks: number;
  attempted: boolean;
}
interface QuestionControlPanelProps {
  marksAssignedToQuestion: any;
  teachersPdfData: any;
  questionsToBeEvaluated: any;
  setUserMarks: any;
  currentQuestion: Question | null;
  navigateQuestions: (step: -1 | 1, isQuestionClicked?: boolean) => void;
  unsavedQuestions: UnsavedQuestion[];
}

function QuestionControlPanel(props: QuestionControlPanelProps) {
  const [openQuestionPopup, setOpenQuestionPopup] = useState(false);

  const {
    currentQuestion,
    navigateQuestions,
    questionsToBeEvaluated,
    teachersPdfData,
    marksAssignedToQuestion,
    unsavedQuestions,
    setUserMarks,
  } = props;

  if (!currentQuestion) {
    return null;
  }

  const {
    qId,
    questionNo,
    attemptData: {
      userTotalMarks,
      questionTotalMarks,
      isAttempted,
      status: questionStatus,
    },
  } = currentQuestion;

  const unsavedQuestion = unsavedQuestions.find(ques => ques.qId === qId);
  let selectedMarks: string | number = '';
  if (unsavedQuestion) {
    selectedMarks = unsavedQuestion.attempted
      ? unsavedQuestion.userPositiveMarks
      : 'NA';
  } else if (questionStatus === 'checked' && isAttempted) {
    selectedMarks = userTotalMarks;
  } else if (questionStatus === 'checked') {
    selectedMarks = 'NA';
  }

  const questionPdf = _.get(
    teachersPdfData,
    'data.test.uploadedQuestions.content[0].url',
    '',
  );
  const solutionPdf = _.get(
    teachersPdfData,
    'data.test.uploadedSolutions.content[0].url',
    '',
  );
  function handleMarksSelection(val: string | number) {
    let attempted = true;
    let _userPositiveMarks: any = 0;
    if (typeof val === 'string') {
      // if 'NA'
      attempted = false;
      _userPositiveMarks = 0;
    } else if (val % 1 !== 0) {
      // if pressed 0.5
      if (typeof selectedMarks === 'number' && selectedMarks % 1 === 0) {
        _userPositiveMarks = selectedMarks + val;
      } else if (typeof selectedMarks === 'number') {
        _userPositiveMarks = Math.floor(selectedMarks);
      } else {
        _userPositiveMarks = val;
      }
    } else {
      // if pressed a whole no.
      _userPositiveMarks = val;
      // setSelectedMarks(val);
    }
    marksAssignedToQuestion({
      qId,
      userPositiveMarks: _userPositiveMarks,
      attempted,
    });
    const contributingQuestion =
      unsavedQuestions.find(ques => ques.qId === qId) ||
      questionsToBeEvaluated.find((ques: Question) => ques.qId === qId);
    let deltaMarks = 0;
    if (contributingQuestion) {
      const oldMarks =
        contributingQuestion.userPositiveMarks !== undefined
          ? contributingQuestion.userPositiveMarks
          : contributingQuestion.attemptData.userTotalMarks;
      deltaMarks = _userPositiveMarks - oldMarks;
    } else {
      deltaMarks = _userPositiveMarks;
    }
    setUserMarks((prevMarks: number) => prevMarks + deltaMarks);
  }

  function getActiveStatus(question: any) {
    if (currentQuestion && currentQuestion.qId === question.qId) {
      return 'active';
    } else if (
      question.attemptData.status === 'checked' ||
      unsavedQuestions.find(({ qId }) => qId === question.qId)
    ) {
      return 'active-green';
    } else {
      return '';
    }
  }

  function renderQuestions() {
    return questionsToBeEvaluated.map((quest: Question, i: any) => {
      const unsavedQuestion = unsavedQuestions.find(
        ({ qId }) => qId === quest.qId,
      );
      let marks: string | number = '_';
      if (unsavedQuestion) {
        marks = unsavedQuestion.attempted
          ? unsavedQuestion.userPositiveMarks
          : 'NA';
      } else if (quest.attemptData.status === 'checked') {
        marks = quest.attemptData.isAttempted
          ? quest.attemptData.userTotalMarks
          : 'NA';
      }

      return (
        <QuestionItem onClick={() => navigateQuestions(i, true)} key={i}>
          <div>
            <span className={getActiveStatus(quest)}>Q {quest.questionNo}</span>
            {marks}
            {marks !== 'NA' && `/${quest.attemptData.questionTotalMarks}`}
          </div>
        </QuestionItem>
      );
    });
  }

  return (
    <>
      <HiddenMobile>
        <MainContainer>
          <QuestionControlPanelContainer>
            <MarksTitle>
              <span>Question {questionNo}</span>
              <span onClick={() => setOpenQuestionPopup(true)}>
                View Question
              </span>
            </MarksTitle>
            <SelectTitle>Select Marks</SelectTitle>
            <Flex
              wrap="wrap"
              align="flex-start"
              style={{ flexWrap: 'wrap', margin: '10px 0' }}
            >
              {Array.apply(null, Array(questionTotalMarks + 1)).map((_, i) => {
                return (
                  <Mark
                    key={i}
                    type="Pill"
                    active={
                      typeof selectedMarks === 'number' &&
                      Math.floor(selectedMarks) === i
                    }
                    onClick={() => handleMarksSelection(i)}
                  >
                    {i}
                  </Mark>
                );
              })}
            </Flex>
            <MarkContainer>
              <Mark
                type="Pill"
                active={selectedMarks === 'NA'}
                onClick={() => handleMarksSelection('NA')}
              >
                Not Attempted
              </Mark>
            </MarkContainer>
            {selectedMarks < questionTotalMarks && (
              <MarkContainer>
                <Mark
                  type="Pill"
                  active={
                    typeof selectedMarks === 'number' &&
                    selectedMarks % 1 === 0.5
                  }
                  onClick={() => handleMarksSelection(0.5)}
                >
                  +0.5
                </Mark>
              </MarkContainer>
            )}
          </QuestionControlPanelContainer>
          <MarksAwarded>
            <div>Marks Awarded</div>
            <div>
              <span>{selectedMarks !== '' ? selectedMarks : '_'}</span>
              {selectedMarks !== 'NA' &&
                `/
              ${questionTotalMarks}`}
            </div>
          </MarksAwarded>

          <BoxEdit display="flex" justifyContent="space-around">
            <ButtonEdit onClick={() => navigateQuestions(-1)}>
              Previous
            </ButtonEdit>
            <Button color="primary" onClick={() => navigateQuestions(1)}>
              Next
            </Button>
          </BoxEdit>

          <QuestionPanel>
            <h3>All Questions Panel</h3>
            {renderQuestions()}
          </QuestionPanel>
        </MainContainer>
      </HiddenMobile>

      <HiddenDesktop>
        <EvaluationToolbar
          questionNo={questionNo}
          setOpenQuestionPopup={setOpenQuestionPopup}
          navigateQuestions={navigateQuestions}
          selectedMarks={selectedMarks}
          questionTotalMarks={questionTotalMarks}
          handleMarksSelection={handleMarksSelection}
        >
          <QuestionPanel>
            <h3>All Questions Panel</h3>
            {renderQuestions()}
          </QuestionPanel>
        </EvaluationToolbar>
      </HiddenDesktop>
      <ViewQuestionsPopup
        questionPdf={questionPdf}
        solutionPdf={solutionPdf}
        open={openQuestionPopup}
        onClose={() => setOpenQuestionPopup(false)}
      />
    </>
  );
}

export default QuestionControlPanel;
