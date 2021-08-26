import React, { useState } from 'react';
import { Flex } from 'app/components/atoms';
import { connect } from 'react-redux';
import {
  MobileToolbar,
  MobileToolbarBody,
  MobileToolbarHeader,
  InputMarks,
  SlideUpToggle,
} from '../styles';
import { INITIAL_SKETCH_TOOL } from '../../assessments.reducer';
import { setSketchTool } from '../../assessments.actions';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MarksSelector from './MarksSelector';
import Toolbar from './Toolbar';

interface Props {
  questionNo: number;
  setOpenQuestionPopup: (open: boolean) => void;
  navigateQuestions: any;
  children: any;
  selectedMarks: string | number;
  handleMarksSelection: (val: string | number) => void;
  questionTotalMarks: number;
  setSketchTool: any;
  selectedSketchTool: any;
  isFullScreen: boolean;
}

function EvaluationToolbar(props: Props) {
  const [expanded, setExpanded] = useState(false);
  const [showMarksSelector, setShowMarksSelector] = useState(false);

  const {
    setOpenQuestionPopup,
    navigateQuestions,
    questionNo,
    selectedMarks,
    handleMarksSelection,
    questionTotalMarks,
    setSketchTool,
    selectedSketchTool,
    isFullScreen,
  } = props;

  function renderNavigation() {
    if (selectedSketchTool.tool !== INITIAL_SKETCH_TOOL.tool) {
      return (
        <Link onClick={() => setSketchTool(INITIAL_SKETCH_TOOL)}>Done</Link>
      );
    } else if (!showMarksSelector) {
      return (
        <Link onClick={() => navigateQuestions(1)}>
          Next Question &nbsp;
          <span>
            <svg
              width="16"
              height="14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 1l6 6-6 6M0 7h14" stroke="#1D7DEA" strokeWidth="2" />
            </svg>
          </span>
        </Link>
      );
    }
    return (
      <Link onClick={() => setShowMarksSelector(false)}>
        <span>
          <svg
            width="16"
            height="14"
            viewBox="0 0 16 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 13L2 7L8 1" stroke="#1D7DEA" strokeWidth="2" />
            <line
              x1="16"
              y1="7"
              x2="2"
              y2="7"
              stroke="#1D7DEA"
              stroke-width="2"
            />
          </svg>
        </span>
        &nbsp; Back
      </Link>
    );
  }

  return (
    <MobileToolbar expanded={expanded} isFullScreen={isFullScreen}>
      <MobileToolbarHeader expanded={expanded}>
        <div>
          <span>Q{questionNo}.</span>{' '}
          {showMarksSelector ? (
            <span>
              <span className="muted">Select marks</span>
              &nbsp;
              <span className="bold">
                {selectedMarks !== '' ? selectedMarks : '_'}
              </span>{' '}
              {selectedMarks !== 'NA' &&
                `/
              ${questionTotalMarks}`}
            </span>
          ) : (
            <Link
              onClick={() => {
                setOpenQuestionPopup(true);
                setExpanded(false);
              }}
            >
              View Question
            </Link>
          )}
        </div>
        <div className="navigation">{renderNavigation()}</div>
        {expanded && (
          <IconButton aria-label="close" onClick={() => setExpanded(false)}>
            <CloseIcon />
          </IconButton>
        )}
      </MobileToolbarHeader>
      <MobileToolbarBody>
        <SlideUpToggle onClick={() => setExpanded(true)}>
          <img
            src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/angle-up.svg"
            alt=""
          />
        </SlideUpToggle>
        {!showMarksSelector ? (
          <Flex align="center">
            <div style={{ flex: 3 }}>
              <InputMarks>
                {selectedMarks === '' ? (
                  <input
                    type="text"
                    placeholder="Enter Marks"
                    onFocus={() => setShowMarksSelector(true)}
                  />
                ) : (
                  <span>{selectedMarks}</span>
                )}
                {selectedMarks !== 'NA' &&
                  `/
              ${questionTotalMarks}`}
              </InputMarks>
              {selectedMarks !== '' && (
                <Button
                  onClick={() => setShowMarksSelector(true)}
                  color="primary"
                >
                  Edit
                </Button>
              )}
            </div>
            <div style={{ flex: 4 }}>
              <Toolbar />
            </div>
          </Flex>
        ) : (
          <MarksSelector
            selectedMarks={selectedMarks}
            questionTotalMarks={questionTotalMarks}
            handleMarksSelection={handleMarksSelection}
            closeHandler={() => setShowMarksSelector(false)}
          />
        )}
      </MobileToolbarBody>
      {props.children}
    </MobileToolbar>
  );
}

const mapStateToProps = (state: any) => {
  return {
    selectedSketchTool:
      state.subjectiveAssessment.testEvaluation.data.selectedSketchTool,
    isFullScreen: state.subjectiveAssessment.testEvaluation.data.isFullScreen,
  };
};

const mapDispatchToProps = {
  setSketchTool,
};

export default connect(mapStateToProps, mapDispatchToProps)(EvaluationToolbar);
