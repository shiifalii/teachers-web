import React, { useState, Fragment, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Drawer from '@material-ui/core/Drawer';
import { API_STATE } from 'app/stores/api.reducer';
import {
  TestDetailsListItem,
  testAnalyticsDataInterface,
} from 'app/types/testDetails.screen.types';
import { EmptyState } from '../emptyState.component';
import AnalyticsData from './analytics.data.component';
import LoaderWrapper from 'app/components/common/loader.wrapper.component';
import SimpleSnackbar from 'app/components/common/snackbar.component';

import { fetchTestAnalytics } from 'app/screens/TestDetails/test.details.sagas';
import { getTestAnalytics } from 'app/helpers/private.api.helper';
import { sagaMiddleware } from 'app/stores/configure.store';
import AnalyticsFilter from './filter.component';

const FilterIcon = styled.div`
  position: absolute;
  cursor: pointer;
  top: -50px;
  right: 0;
  color: #fff;
  @media (max-width: 768px) {
    top: -8rem;
  }
`;

const NoData = styled.div`
  text-align: center;
  padding: 5em 0;
  img {
    max-width: 120px;
    width: 100%;
  }
  p {
    padding-top: 20px;
  }
`;

interface TestAnalyticsInterface {
  testAnalytics: testAnalyticsDataInterface;
  initialBatchData?: TestDetailsListItem;
  allBatchesData: TestDetailsListItem[];
  isOpen: boolean;
  testName: string;
  chapTestCurrentWindow: any;
}

function TestAnalytics(props: TestAnalyticsInterface) {
  const [showFilters, setShowFilters] = useState(false);
  const history = useHistory();
  const [currentAnalyticBatches, setCurrentAnalyticBatches] = useState<
    TestDetailsListItem[]
  >([]);
  const [batchAdded, setBatchAdded] = useState(false);

  const {
    initialBatchData,
    allBatchesData,
    testAnalytics,
    isOpen,
    testName,
    chapTestCurrentWindow,
  } = props;

  const analyticsData = testAnalytics.data;

  const redirectToStudentAnalytics = () => {
    let assignmentIds;
    if (currentAnalyticBatches && currentAnalyticBatches.length > 0) {
      assignmentIds = currentAnalyticBatches
        .map(({ assignment }) => assignment.id)
        .join(',');
    }
    if (
      !assignmentIds &&
      chapTestCurrentWindow &&
      chapTestCurrentWindow.allData
    ) {
      assignmentIds = [chapTestCurrentWindow.allData._id];
    }
    history.push(`${history.location.pathname}/${assignmentIds}/students`);
  };

  const redirectToQuestionAnalytics = () => {
    let assignmentIds;
    if (currentAnalyticBatches && currentAnalyticBatches.length > 0) {
      assignmentIds = currentAnalyticBatches
        .map(({ assignment }) => assignment.id)
        .join(',');
    }
    if (
      !assignmentIds &&
      chapTestCurrentWindow &&
      chapTestCurrentWindow.allData
    ) {
      assignmentIds = [chapTestCurrentWindow.allData._id];
    }
    history.push(`${history.location.pathname}/${assignmentIds}/questions`);
  };

  useEffect(() => {
    if (initialBatchData) {
      setCurrentAnalyticBatches([initialBatchData]);
    }
  }, [initialBatchData]);

  const updateCurrentAnalyticBatches = (batches: any) => {
    setCurrentAnalyticBatches(batches);
    setBatchAdded(true);
  };

  useEffect(() => {
    if (currentAnalyticBatches.length > 0) {
      sagaMiddleware.run(
        fetchTestAnalytics,
        getTestAnalytics,
        {
          assignmentIds: currentAnalyticBatches.map(
            ({ assignment }: any) => assignment.id,
          ),
        },
        (responseData: any) => responseData.data,
      );
    }
  }, [currentAnalyticBatches]);

  useEffect(() => {
    if (
      chapTestCurrentWindow &&
      chapTestCurrentWindow.allData &&
      chapTestCurrentWindow.allData._id
    ) {
      let idToPass = [chapTestCurrentWindow.allData._id];
      sagaMiddleware.run(
        fetchTestAnalytics,
        getTestAnalytics,
        {
          assignmentIds: idToPass,
        },
        (responseData: any) => responseData.data,
      );
    }
  }, [chapTestCurrentWindow]);

  if (!isOpen) {
    return null;
  }
  const { isAssigned } = analyticsData;

  return (
    <>
      {initialBatchData &&
        !(chapTestCurrentWindow && chapTestCurrentWindow.allData) && (
          <FilterIcon onClick={() => setShowFilters(true)}>
            <img
              src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/filter-icon.svg"
              alt=""
            />
          </FilterIcon>
        )}

      <LoaderWrapper isLoading={testAnalytics.apiState === API_STATE.LOADING}>
        {!isAssigned ||
        !(
          initialBatchData ||
          (chapTestCurrentWindow &&
            chapTestCurrentWindow.allData &&
            chapTestCurrentWindow.allData._id)
        ) ? (
          <NoData>
            <img
              src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/no-analytics-data.svg"
              alt="no-attempt"
            />
            <p>
              No Analytics available as the {testName} has not <br /> been{' '}
              assigned yet.
            </p>
          </NoData>
        ) : (
          <AnalyticsData
            analyticsData={analyticsData}
            redirectToStudentAnalytics={redirectToStudentAnalytics}
            redirectToQuestionAnalytics={redirectToQuestionAnalytics}
          />
        )}
      </LoaderWrapper>
      {/* <Hidden only={['xs', 'sm']}> */}
      <Drawer
        anchor="right"
        open={showFilters}
        onClose={() => setShowFilters(false)}
      >
        <AnalyticsFilter
          setCurrentAnalyticBatches={updateCurrentAnalyticBatches}
          allBatchesData={allBatchesData}
          currentAnalyticBatches={currentAnalyticBatches}
          close={() => setShowFilters(false)}
        />
      </Drawer>
      {/* Will uncomment if requirement */}
      {/* </Hidden> */}
      {/* <Hidden only={['sm', 'lg']}>
      <Drawer
        anchor="bottom"
        open={showFilters}
        onClose={() => setShowFilters(false)}
      >
        <AnalyticsFilter
          setCurrentAnalyticBatches={updateCurrentAnalyticBatches}
          allBatchesData={allBatchesData}
          currentAnalyticBatches={currentAnalyticBatches}
          close={() => setShowFilters(false)}
        />
      </Drawer>
      </Hidden> */}

      <SimpleSnackbar
        mode="success"
        state={batchAdded}
        onClose={() => setBatchAdded(false)}
        autoHideDuration={1800}
        message="Batch updated for analytics successfully!"
      />
    </>
  );
}

export default TestAnalytics;
