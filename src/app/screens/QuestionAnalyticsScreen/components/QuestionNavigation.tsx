import React from 'react';
import { QuestionNavigationContainer, Bold } from '../styles';

interface QuestionNavigationProps {
  currentQNo: number;
  totalQNo: number;
  moveTo: (qNo: number) => void;
}

function QuestionNavigation(props: QuestionNavigationProps) {
  const { currentQNo, totalQNo, moveTo } = props;
  const moveBack = () => {
    if (currentQNo > 1) {
      moveTo(currentQNo - 1);
    }
  };
  const moveFront = () => {
    if (currentQNo < totalQNo) {
      moveTo(currentQNo + 1);
    }
  };
  return (
    <QuestionNavigationContainer>
      <div onClick={() => moveTo(1)}>&lt;&lt;</div>
      <div onClick={moveBack}>&lt;</div>
      <div>
        <Bold>{currentQNo}</Bold>
        <span> /{totalQNo}</span>
      </div>
      <div onClick={moveFront}>&gt;</div>
      <div onClick={() => moveTo(totalQNo)}>&gt;&gt;</div>
    </QuestionNavigationContainer>
  );
}

export default QuestionNavigation;
