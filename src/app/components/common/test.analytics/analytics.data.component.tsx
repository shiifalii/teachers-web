import React, { useMemo } from 'react';
import { TestAnalyticsData } from 'app/types/testDetails.screen.types';
import Chart from '../chart.component';
import styled from 'styled-components';
import ArrowForward from '@material-ui/icons/ArrowForward';
import { Flex } from 'app/components/atoms';
import { roundOffPercentages } from 'app/helpers/comman.helper';

const AvgScoreContainer = styled.div`
  text-align: center;
  .avgMarks,
  .percent {
    display: inline-block;
    color: #666666;
    font-weight: 500;
  }
`;
const AnalyticsContainer = styled.div`
  .analytics-container {
    padding: 2.5rem;
    @media (max-width: 768px) {
      padding: 2.5rem 0;
    }
  }
`;
const NoData = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  img {
    width: 100%;
    max-width: 120px;
  }
  @media (max-width: 768px) {
    font-size: 0.8rem;
    margin-bottom: 2rem;
  }
`;
const Container = styled.div`
  margin-top: 1em;
  padding: 1rem;
  display: flex;
  border: 1px solid #ececec;
  border-radius: 4px;
  cursor: pointer;
`;

const InnerContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;

  h2 {
    font-weight: normal;
    color: #333333;
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }
`;

const ImgContainer = styled.div`
  background-color: #ecf5ff;
  width: 120px;
  height: 88px;
  text-align: center;
  padding-top: 10px;
  border-radius: 8px;
  @media (max-width: 768px) {
    background-color: transparent;
    width: auto;
    height: auto;
  }
  img {
    @media (max-width: 768px) {
      width: 26px;
    }
  }
`;

interface IProps {
  analyticsData: TestAnalyticsData;
  redirectToStudentAnalytics: () => void;
  redirectToQuestionAnalytics: () => void;
}

const graphMetaData: { [key: string]: { color: string; label: string } } = {
  '25': {
    color: '#FC9695',
    label: '(0-25)%',
  },
  '50': {
    color: '#FFB86E',
    label: '(25-50)%',
  },
  '75': {
    color: '#9DD9EC',
    label: '(50-75)%',
  },
  '100': {
    color: '#70CE95',
    label: '(75-100)%',
  },
};

function AnalyticsData(props: IProps) {
  const {
    analyticsData,
    redirectToStudentAnalytics,
    redirectToQuestionAnalytics,
  } = props;

  const {
    students,
    questions,
    avgMarksPercentage,
    isAttempted,
  } = analyticsData;

  const totalQuestions = questions.total;
  const noOfStudentAttemps = students.attempted;
  const totalStudents = students.total;

  const chartData = useMemo(() => {
    const graphData = analyticsData.graphData;
    const percentages = Object.values(graphData).map(
      ({ percentage }: any) => percentage,
    );
    const roundedOffPercentage = roundOffPercentages(percentages);
    return Object.entries(graphData).map(([key, val], index) => {
      const { count } = val as any;
      return {
        value: roundedOffPercentage[index],
        count,
        backgroundColor: graphMetaData[key] && graphMetaData[key].color,
        label: graphMetaData[key] && graphMetaData[key].label,
      };
    });
  }, [analyticsData]);

  return (
    <AnalyticsContainer>
      <div className="analytics-container">
        {isAttempted && (
          <>
            <AvgScoreContainer>
              <h1 className="avgMarks">{Math.round(avgMarksPercentage)}</h1>
              <h3 className="percent">%</h3>
              <div>Avg. Score</div>
            </AvgScoreContainer>
            <Chart
              data={chartData}
              axisLabels={{
                xaxis: (
                  <Flex align="center" justify="center">
                    Score (%) <ArrowForward fontSize="small" />
                  </Flex>
                ),
                yaxis: (
                  <Flex align="center" justify="center">
                    Students (%) <ArrowForward fontSize="small" />
                  </Flex>
                ),
              }}
            />
          </>
        )}
        {!isAttempted && <NotAttemptedState />}
        <Container>
          <ImgContainer>
            <img
              src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/student-icon.svg"
              alt="Questions Icon"
            />
          </ImgContainer>
          <InnerContainer onClick={redirectToStudentAnalytics}>
            <h2>
              STUDENTS ({noOfStudentAttemps}/{totalStudents})
            </h2>
            <div>&gt;</div>
          </InnerContainer>
        </Container>
        <Container>
          <ImgContainer>
            <img
              src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/question-icon.svg"
              alt="Questions Icon"
            />
          </ImgContainer>
          <InnerContainer onClick={redirectToQuestionAnalytics}>
            <h2>QUESTIONS ({totalQuestions})</h2>
            <div>&gt;</div>
          </InnerContainer>
        </Container>
      </div>
    </AnalyticsContainer>
  );
}

function NotAttemptedState() {
  return (
    <NoData>
      <img
        src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/no-analytics-data.svg"
        alt="no-attempt"
      />
      <p>No data available, test hasn't been attemped yet.</p>
    </NoData>
  );
}

export default AnalyticsData;
