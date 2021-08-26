import React, { useMemo } from 'react';
import { TestAnalyticsData } from 'app/types/testDetails.screen.types';
import Chart from 'app/components/common/chart.component';
import styled from 'styled-components';
import ArrowForward from '@material-ui/icons/ArrowForward';
import { Flex } from 'app/components/atoms';
import { roundOffPercentages } from 'app/helpers/comman.helper';
import StudentAnalyticsChart from './StudentAnalyticsChart';

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
  // analyticsData: TestAnalyticsData;
  // redirectToStudentAnalytics: () => void;
  // redirectToQuestionAnalytics: () => void;
}

const graphMetaData: { [key: string]: { color: string; label: string } } = {
  studentPerformance: {
    color: '#FFB86E',
    label: '(0-25)%',
  },
  batchPerformance: {
    color: '#9DD9EC',
    label: '(25-50)%',
  },
  topperPerformance: {
    color: '#70CE95',
    label: '(50-75)%',
  },
  // '100': {
  //   color: '#70CE95',
  //   label: '(75-100)%',
  // },
};

function StudentAnalyticsData(props: any) {
  const { analyticsData = {}, studentName = '' } = props;

  const { courseName = '' } = analyticsData;

  const chartData = useMemo(() => {
    const {
      studentPerformance,
      batchPerformance,
      topperPerformance,
    } = analyticsData;

    let graphData = {
      studentPerformance: {
        percentage: studentPerformance,
        label: `${studentName.split(' ').slice(0, 1)}'s`,
      },
      batchPerformance: {
        percentage: batchPerformance,
        label: `Class`,
      },
      topperPerformance: {
        percentage: topperPerformance,
        label: `Topper's`,
      },
    };

    const percentages = Object.values(graphData).map(
      ({ percentage }: any) => percentage,
    );
    const roundedOffPercentage = roundOffPercentages(percentages);
    return Object.entries(graphData).map(([key, val], index) => {
      const { label } = val;
      return {
        value: roundedOffPercentage[index],
        backgroundColor: graphMetaData[key] && graphMetaData[key].color,
        label,
      };
    });
  }, [analyticsData]);

  return (
    <AnalyticsContainer>
      <div className="analytics-container">
        {
          <>
            <StudentAnalyticsChart
              data={chartData}
              axisLabels={{
                xaxis: (
                  <Flex align="center" justify="center">
                    {courseName}
                    {/* <ArrowForward fontSize="small" /> */}
                  </Flex>
                ),
                yaxis: (
                  <Flex align="center" justify="center">
                    Marks
                    <ArrowForward fontSize="small" />
                  </Flex>
                ),
              }}
            />
          </>
        }
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

export default StudentAnalyticsData;
