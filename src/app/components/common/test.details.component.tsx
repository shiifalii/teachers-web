import React, { useMemo, Fragment, useState } from 'react';
import styled from 'styled-components';
import { TestDetailsListItem } from 'app/types/testDetails.screen.types';

interface TestDetailsProps {
  data: TestDetailsListItem[];
  courseName: string;
  currentBatchData?: TestDetailsListItem;
  testData: {
    testName: string;
    testId: string;
    duration: string;
    syllabus: string;
    courseId: string;
  };
  currentWindowData: any;
}

const TestContainer = styled.div`
  padding: 2em;
  @media (max-width: 768px) {
    padding: 1em 0;
  }
`;

const Detailsblock = styled.div`
  margin: 2rem 0;
  .bold {
    color: #333333;
    font-weight: 500;
  }
`;

const Title = styled.h4`
  font-size: 1.1rem;
  color: #333;
  font-weight: normal;
  margin: 1em 0 0 0;
`;

const DetailsContainer = styled.div`
  color: #666;
  font-size: 14px;
  span {
    color: #666;
    font-size: 14px;
    @media (max-width: 768px) {
      color: #000;
    }
  }
`;

const BatchList = styled.ul`
  margin: 0.5rem 0;
  width: 60%;
  padding-left: 34px;
  @media (max-width: 768px) {
    width: 100%;
  }
  li {
    margin: 0.5rem 0;
    padding: 0.5rem;
  }
  li.active {
    color: #1d7dea;
  }
`;
const BatchAssign = styled.div`
  display: flex;
  img {
    display: inline-block;
    margin-right: 12px;
  }
  div {
    display: inline-block;
    span {
      display: block;
      line-height: 18px;
    }
  }
`;

const CourseName = styled.p`
  color: #666;
`;
function TestDetails(props: TestDetailsProps) {
  let { data, courseName = '', currentBatchData, testData } = props;
  let noOfBatchesAssigned = 'NA';

  let assignedOn = 'NA';
  let parsedDuration = parseInt(testData.duration);
  let duration =
    parsedDuration < 60
      ? `${parsedDuration} mins`
      : `${parsedDuration / 60} hrs`;

  let topicSyllabus = testData.syllabus;

  let batches: any = [];
  if (props.currentWindowData && props.currentWindowData.name) {
    batches = props.currentWindowData.allData.batches;
    noOfBatchesAssigned = batches.length;
    assignedOn = `${new Date(
      props.currentWindowData.allData.assignedDate,
    ).toDateString()} at ${new Date(
      props.currentWindowData.allData.assignedDate,
    ).toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true,
      minute: 'numeric',
    })}`;
  }

  if (data && data.length && currentBatchData) {
    let {
      assignment: { assignedDate, duration_minutes, syllabus },
    } = currentBatchData;

    topicSyllabus = syllabus;
    if (localStorage.getItem('chapterTestAssignedOn')) {
      assignedDate = localStorage.getItem('chapterTestAssignedOn') || '';
    }
    assignedOn = `${new Date(assignedDate).toDateString()} at ${new Date(
      assignedDate,
    ).toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true,
      minute: 'numeric',
    })}`;

    duration =
      duration_minutes < 60
        ? `${duration_minutes} mins`
        : `${duration_minutes / 60} hrs`;

    noOfBatchesAssigned = data.length.toString();
  }

  return (
    <TestContainer>
      <Title>Assignment Information</Title>
      <Fragment>
        <DetailsContainer>
          <Title>{testData.testName}</Title>
          <div>
            <CourseName>
              <span>{duration}, </span> {courseName}
            </CourseName>
          </div>
        </DetailsContainer>

        <Detailsblock>
          <span className="bold">Assigned On</span> - {assignedOn}
        </Detailsblock>

        <Detailsblock>
          <span className="bold">Topics Covered</span> - {topicSyllabus}
        </Detailsblock>

        <Detailsblock>
          <BatchAssign>
            <img
              src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/batch-assigned-icon.svg"
              alt="Batch"
            />
            <div>
              <span>{noOfBatchesAssigned} Batch(es) assigned</span>
              {/* <span style={{ fontSize: '0.8rem' }}>Batches Assigned</span> */}
            </div>
          </BatchAssign>
          <BatchList>
            {props.currentWindowData && props.currentWindowData.name ? (
              batches.map((data: any, index: any) => (
                <li key={data.id}>{data.name}</li>
              ))
            ) : (
              <>
                {data &&
                  currentBatchData &&
                  data.map(({ id, name }) => (
                    <li
                      key={id}
                      className={currentBatchData?.id === id ? 'active' : ''}
                    >
                      {name}
                    </li>
                  ))}
              </>
            )}
          </BatchList>
        </Detailsblock>
      </Fragment>
    </TestContainer>
  );
}

export default React.memo(TestDetails);
