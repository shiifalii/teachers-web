import React, { useState } from 'react';
import { Flex } from 'app/components/atoms';
import { Mark } from '../styles';

interface Props {
  questionTotalMarks: number;
  handleMarksSelection: (val: string | number) => void;
  closeHandler: () => void;
  selectedMarks: string | number;
}

function MarksSelector(props: Props) {
  const [currentStep, setCurrentStep] = useState(1);
  const {
    questionTotalMarks,
    handleMarksSelection,
    closeHandler,
    selectedMarks,
  } = props;
  return (
    <Flex style={{ overflowY: 'auto' }}>
      {currentStep === 1 && (
        <>
          <Mark
            type="Round"
            onClick={() => {
              handleMarksSelection('NA');
              closeHandler();
            }}
            active={selectedMarks === 'NA'}
          >
            NA
          </Mark>
          {Array.apply(null, Array(questionTotalMarks + 1)).map((_, i) => {
            return (
              <Mark
                key={i}
                type="Round"
                active={
                  typeof selectedMarks === 'number' &&
                  Math.floor(selectedMarks) === i
                }
                onClick={() => {
                  handleMarksSelection(i);
                  setCurrentStep(currentStep + 1);
                }}
              >
                {i}
              </Mark>
            );
          })}
        </>
      )}
      {currentStep === 2 && (
        <>
          <Mark type="Round" active={true}>
            {selectedMarks}
            {/* {Math.floor(selectedMarks as number)} */}
          </Mark>
          <Flex align="center" style={{ margin: '0 0.5rem' }}>
            +
          </Flex>
          <Mark type="Round" onClick={closeHandler}>
            0
          </Mark>
          {selectedMarks < questionTotalMarks && (
            <Mark
              type="Round"
              onClick={() => {
                handleMarksSelection(0.5);
                closeHandler();
              }}
            >
              0.5
            </Mark>
          )}
        </>
      )}
    </Flex>
  );
}

export default MarksSelector;
