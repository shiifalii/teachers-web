import React, { useState, useEffect } from 'react';
import MathJax from 'react-mathjax3';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import MuiAccordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { QuestionAnalyticsListItem } from 'app/types/questionAnalytics.screen.types';
import {
  QuestionContainer,
  QuestionHeader,
  MobileListing,
  DesktopListing,
  TextMuted,
} from '../styles';
import { Center, Flex } from 'app/components/atoms';
import InfoToolTip from 'app/components/common/info.tooltip';
import { secondsToHms } from 'app/helpers/comman.helper';
import Question from './Question';
import {
  FilterState,
  SortType,
  SortableFields,
} from '../questionAnalytics.screen';
import { withStyles } from '@material-ui/core';
import { useStyles } from 'app/screens/StudentAnalyticsScreen/styles';

const Accordion = withStyles({
  root: {
    border: '1px solid #E2E2E2',
    borderRadius: '4px',
    boxShadow: 'none',
    margin: '10px 0',
    '&:before': {
      backgroundColor: 'initial',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: '#fff',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: '0 !important',
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
    '& .MuiAccordionSummary-expandIcon ': {
      position: 'absolute',
      top: 0,
      right: '10px',
    },

    '& .MuiAccordionSummary-expandIcon.Mui-expanded': {
      transform: 'rotate(180deg)',
    },
  },
  content: {
    display: 'block',
    '&$expanded': {
      margin: '12px 0',
    },
    '@media (max-width: 768px)': {
      display: 'block',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const QuestionHeadingContainer = styled.div`
  img {
    vertical-align: text-top;

    @media (max-width: 768px) {
      display: none;
      max-width: 100%;
    }
  }
`;
const CursorPointer = styled.span`
  cursor: pointer;
`;
interface QuestionsInterface {
  data: QuestionAnalyticsListItem[];
  filters: FilterState;
  applyFilters: any;
}

const toggleSortType = (sortType: SortType) => {
  if (sortType === SortType.ASCENDING) {
    return SortType.DESCENDING;
  } else {
    return SortType.ASCENDING;
  }
};

function QuestionListing(props: QuestionsInterface) {
  const [currentExpanded, setCurrentExpanded] = useState<number>(0);
  const { data, filters, applyFilters } = props;
  const classes = useStyles();

  useEffect(() => {
    setCurrentExpanded(0);
  }, [filters]);

  const toggleSortBy = (newSortField: SortableFields) => {
    const {
      sortBy: { field, type },
    } = filters;
    if (newSortField === field) {
      applyFilters({
        ...filters,
        sortBy: { field: newSortField, type: toggleSortType(type) },
      });
    } else {
      applyFilters({
        ...filters,
        sortBy: { field: newSortField, type: SortType.ASCENDING },
      });
    }
  };

  const handleClick = (serialNo: number) => {
    setCurrentExpanded(prevState => {
      if (prevState === serialNo) {
        return 0;
      }
      return serialNo;
    });
  };
  return (
    <div>
      <QuestionHeader>
        <div>Question</div>
        <Center onClick={() => toggleSortBy('attemptCount')}>
          <span>{renderArrowBasedOnSortType(filters, 'attemptCount')}</span>
          <CursorPointer>
            Students <br /> Attempted
          </CursorPointer>
        </Center>
        <Center onClick={() => toggleSortBy('avgTimeTaken')}>
          <span>{renderArrowBasedOnSortType(filters, 'avgTimeTaken')}</span>
          <CursorPointer>
            Average <br />
            Time Taken
          </CursorPointer>
        </Center>
        <Center onClick={() => toggleSortBy('avgAccuracy')}>
          <span>{renderArrowBasedOnSortType(filters, 'avgAccuracy')}</span>
          <CursorPointer>
            <Flex align="center">
              Average <br /> Accuracy
              <InfoToolTip
                style={{ padding: '0' }}
                title={
                  <p>
                    Total correct attempts per total number of attempts for the
                    respective question.
                  </p>
                }
              />
            </Flex>
          </CursorPointer>
        </Center>
        <Center>
          Correct <br /> Attempts
        </Center>
      </QuestionHeader>
      <QuestionContainer>
        {data.map(questionData => {
          const { serialNo, question, summary } = questionData;
          return (
            <Accordion
              key={serialNo}
              expanded={currentExpanded === serialNo}
              onChange={() => handleClick(serialNo)}
              TransitionProps={{ unmountOnExit: true }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`question${serialNo}-content`}
                id={`question${serialNo}-header`}
              >
                <DesktopListing>
                  <div className="question-heading">
                    <div className="question-preview">
                      <span className="qNo">{serialNo}. </span>
                      <QuestionHeadingContainer>
                        <MathJax.Context options={{ messageStyle: 'none' }}>
                          <MathJax.Html html={question} />
                        </MathJax.Context>
                      </QuestionHeadingContainer>
                    </div>

                    <Center className="students-attempted">
                      <span>
                        {summary.attemptCount}/{summary.totalStudentsCount}
                      </span>
                      <span> ({summary.studentAttemptedPercentage}%)</span>
                    </Center>

                    <Center className="avgTime">
                      {secondsToHms(summary.avgTimeTaken)}
                    </Center>

                    <Center className="avgAccuracy">
                      {summary.avgAccuracy}%
                    </Center>

                    <Center className="correctAttempts">
                      {summary.correctAttemptCount}/{summary.attemptCount}
                    </Center>
                  </div>
                </DesktopListing>

                <MobileListing>
                  <div>
                    <div className="question-preview">
                      <span className="qNo">{serialNo}. </span>

                      <MathJax.Context options={{ messageStyle: 'none' }}>
                        <MathJax.Html html={question} />
                      </MathJax.Context>
                    </div>
                  </div>

                  <div>
                    <div className="students-attempted">
                      <span>
                        {summary.attemptCount}/{summary.totalStudentsCount}
                      </span>
                      <span> ({summary.studentAttemptedPercentage}%)</span>
                      <TextMuted>Students Attempted</TextMuted>
                    </div>

                    <div className="avgTime">
                      {secondsToHms(summary.avgTimeTaken)}
                      <TextMuted>Avg. Time Taken</TextMuted>
                    </div>

                    <div className="avgAccuracy">
                      {summary.avgAccuracy}%<TextMuted>Avg. Accuracy</TextMuted>
                    </div>

                    <div className="correctAttempts">
                      {summary.correctAttemptCount}/{summary.attemptCount}
                      <TextMuted>Correct Attempts</TextMuted>
                    </div>
                  </div>
                </MobileListing>
              </AccordionSummary>

              <AccordionDetails
                style={{
                  padding: '0',
                  borderTop: '4px solid #1d7dea',
                  borderTopLeftRadius: '4px',
                  borderTopRightRadius: '4px',
                }}
              >
                <Question currentQuestion={questionData} />
              </AccordionDetails>
            </Accordion>
          );
        })}
      </QuestionContainer>
    </div>
  );
}

function renderArrowBasedOnSortType(
  filters: FilterState,
  field: SortableFields,
) {
  const {
    sortBy: { field: sortByField, type: sortByType },
  } = filters;
  return (
    <IconButton style={{ padding: '0' }}>
      {sortByField === field && sortByType === SortType.DESCENDING ? (
        <ArrowUpwardIcon
          fontSize="small"
          color={sortByField === field ? 'primary' : 'inherit'}
        />
      ) : (
        <ArrowDownwardIcon
          fontSize="small"
          color={sortByField === field ? 'primary' : 'inherit'}
        />
      )}
    </IconButton>
  );
}

export default QuestionListing;
