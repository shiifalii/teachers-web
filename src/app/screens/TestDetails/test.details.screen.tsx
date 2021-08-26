import React, { useEffect, useState, useMemo } from 'react';
import HeaderComponent from '../../components/common/header.component';
import { Container } from '../../components';
import styled from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';
import BreadCrumbStyles from 'app/components/common/breadcrumbs.styles';
import { EmptyState } from '../../components/common/emptyState.component';
import LoaderWrapper from '../../components/common/loader.wrapper.component';
import TestDetails from 'app/components/common/test.details.component';
import TestAnalytics from 'app/components/common/test.analytics/test.analytics.component';
import { NoWrap } from 'app/components/atoms';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Button from '@material-ui/core/Button';
import { sagaMiddleware } from '../../stores/configure.store';
import { fetchTestDetails } from './test.details.sagas';
import {
  getTestDetails,
  sendMailForChapTestReport,
} from 'app/helpers/private.api.helper';
import SimpleSnackbar from 'app/components/common/snackbar.component';
import { API_STATE } from 'app/stores/api.reducer';
import { getNameByOrgType } from 'app/helpers/comman.helper';
import {
  testDetailsDataInterface,
  testAnalyticsDataInterface,
} from 'app/types/testDetails.screen.types';
import { getCourseNameById } from 'app/helpers/local.storage.helper';
import Tooltip from '@material-ui/core/Tooltip';
import SwipeableTemporaryDrawer from './drawer';

const TestDetailsScreenBackground = styled.div`
  background-color: #f4f8f9;
  color: #fff;
  padding-bottom: 2em;
  min-height: calc(100vh - 70px);
`;

const CardHeader = styled.div`
  /* min-height: 200px; */
  padding-bottom: 6em;
  background-color: var(--brand-color);
  @media (max-width: 768px) {
    min-height: initial;
    padding: 1em 0;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 75% 25%;
  justify-content: center;
  align-items: center;
  margin-top: 1.2em;
  @media (max-width: 768px) {
    grid-template-columns: 80% 20%;
    margin: initial;
  }
`;

const ClassCount = styled.div`
  font-size: 1.5em;
  display: flex;

  span:nth-of-type(2) {
    font-size: 20px;
  }

  span:nth-of-type(3) {
    font-size: 16px;
    display: block;
    padding-left: 3em;
    @media (max-width: 768px) {
      padding-left: 2.5em;
      max-width: 240px;
      font-size: 14px;
    }
  }
`;

const BackIcon = styled.span`
  cursor: pointer;
  width: 26px;
  height: 21px;
  margin: 0 1em 0 0;
  @media (max-width: 768px) {
    margin: 0 0.3em 0 0;
    transform: scale(0.8);
  }
`;

const TabHeader = styled.div`
  margin-top: -5em;
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    margin-top: 0;
  }
  .dropdownContainer {
    display: flex;
  }
  .pad-right {
    padding-right: 50px !important;
  }
  .download-btn {
    background: #ffffff;
    border: 1px solid #dbdfe2;
    border-radius: 4px;
    font-size: 14px;
    line-height: 16px;
    color: #1d7dea;
    padding: 13px 14px;
  }
  .filter-btn {
    padding-top: 0;
    padding-bottom: 0;
  }
  .filter-btn img {
    height: 44px;
  }
  .selectList {
    width: 240px;
    border: 1px solid #e6e6e6;
    height: 44px;
    padding: 0 1em;
    font-size: 1em;
    max-width: 94%;
    min-width: 135px;
    border-radius: 4px;
    padding-right: 32px;
    background-color: #fff;
    background-image: url(https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/angle-down-bold.svg);
    background-repeat: no-repeat;
    -webkit-appearance: initial;
    background-position: 94% 18px;
  }
  ul {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    @media (max-width: 768px) {
      color: var(--brand-color);
      display: grid;
      grid-template-columns: 50% 50%;
      text-align: center;
      margin-top: 0.5em;
    }

    li {
      margin-right: 1em;
      opacity: 0.5;
      cursor: pointer;
      font-weight: 500;
    }
  }

  .active {
    border-bottom: 1px solid #fff;
    opacity: 1;
    line-height: 40px;
    pointer-events: none;
    @media (max-width: 768px) {
      border-bottom: 2px solid var(--brand-color);
    }
  }
`;

const Page = styled.div`
  background-color: #fff;
  margin-top: 1em;
  color: var(--text-color);
  border-radius: 4px;
  position: relative;
`;

const Breadcrumb = (
  // TODO add interface later
  params: any,
  history: any,
) => {
  const classes = BreadCrumbStyles();
  const {
    batchId,
    conceptIds,
    conceptName,
    isConceptLocked,
    chapterName,
    batchName,
    parentIds,
    currentTab,
    chapterIds,
  } = params;

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      className={classes.styledBreadcrumbs}
    >
      <Link className={classes.link} onClick={() => history.push('/')}>
        Home
      </Link>
      <Link
        className={classes.link}
        onClick={() =>
          history.push(`/chapters/${batchId}/${parentIds}/${batchName}`)
        }
      >
        {getNameByOrgType()}
      </Link>
      <Link
        className={classes.link}
        onClick={() => {
          history.push(
            `/concepts/${batchId}/${parentIds}/${chapterIds}/${batchName}/${chapterName}`,
          );
        }}
      >
        Chapter
      </Link>
      <Link
        className={classes.link}
        onClick={() =>
          history.push(
            `/tests/${batchId}/${conceptIds}/${conceptName}/${isConceptLocked}/${batchName}/${parentIds}/${chapterIds}/${chapterName}`,
          )
        }
      >
        Topic
      </Link>
      <Link>Test ({currentTab})</Link>
    </Breadcrumbs>
  );
};

interface IProps {
  testDetails: testDetailsDataInterface;
  testAnalytics: testAnalyticsDataInterface;
  resetAnalyticsData: any;
}

enum Tab {
  Details = 'Details',
  Analytics = 'Analytics',
}

const TestScreen = function(props: IProps) {
  const history = useHistory();
  const [currentTab, setCurrentTab] = useState(Tab.Details);
  const [showDrawer, setShowDrawer] = useState(false);
  const [drawerState, setDrawerState] = useState('enterEmail');
  const [drawerMessage, setDrawerMessage] = useState('');

  const routeParams: any = useParams();
  const { batchId, chapterName, testData, conceptIds } = routeParams;
  let windowData: any = [];
  if (localStorage.getItem('chapterTestAssignmentData')) {
    let chapterTestAssignmentData = localStorage.getItem(
      'chapterTestAssignmentData',
    );
    windowData = JSON.parse(
      chapterTestAssignmentData ? chapterTestAssignmentData : '',
    );
  }

  let windowDataToShow: any = [];
  for (let i = 0; i < windowData.length; i++) {
    let obj = {
      name: 'Test Window ' + (windowData.length - i),
      allData: windowData[i],
    };
    windowDataToShow.push(obj);
  }

  const [currentWindow, setCurrentWindow] = useState(windowDataToShow[0]);

  const parsedTestData = JSON.parse(decodeURIComponent(testData));
  const { testId, testName, courseId, name } = parsedTestData;

  const { testDetails, testAnalytics, resetAnalyticsData } = props;

  const currentBatchData = useMemo(() => {
    return testDetails.data.find(({ id }) => id === batchId);
  }, [testDetails.data, batchId]);

  useEffect(() => {
    // check - no api hit for chap test
    if (conceptIds && conceptIds !== 'chapTest') {
      resetAnalyticsData();
      sagaMiddleware.run(fetchTestDetails, getTestDetails, {
        testId,
        conceptIds,
      });
    }
  }, [conceptIds, testId, resetAnalyticsData]);

  const switchTab = (tab: Tab) => {
    if (tab !== Tab.Details && tab !== Tab.Analytics) {
      tab = Tab.Details;
    }
    if (currentTab !== tab) {
      setCurrentTab(tab);
      history.replace(`${history.location.pathname}?tab=${tab}`);
    }
  };
  useEffect(() => {
    const params = new URLSearchParams(history.location.search);
    const tab = (params.get('tab') as Tab) || Tab.Details;
    switchTab(tab);
  }, []);

  const courseName = currentBatchData
    ? getCourseNameById(currentBatchData.assignment.courseId)
    : getCourseNameById(courseId);
  let isFailedOrError =
    testDetails.apiState === API_STATE.FAILED ||
    testDetails.apiState === API_STATE.ERROR ||
    testAnalytics.apiState === API_STATE.FAILED ||
    testAnalytics.apiState === API_STATE.ERROR;
  let errorMsg = '';

  const selectTime = (timeData: any) => {
    for (let i = 0; i < windowDataToShow.length; i++) {
      if (timeData.target.value === windowDataToShow[i].name) {
        setCurrentWindow(windowDataToShow[i]);
        break;
      }
    }
  };

  const sendMail = (e: any) => {
    const centreData: string | null = localStorage.getItem('centreData');
    let dataToSend = {
      centreId: centreData ? JSON.parse(centreData)[0]._id : '',
      assignmentId:
        currentWindow && currentWindow.allData ? currentWindow.allData._id : '',
      email: e.toString(),
      centreName: centreData ? JSON.parse(centreData)[0].name : '',
    };
    sendMailForChapTestReport(dataToSend).then((res: any) => {
      if (res && res.data.code === 200) {
        setDrawerState('emailSent');
        setDrawerMessage(res.data.message);
      } else {
        isFailedOrError = true;
      }
    });
  };

  const openMailDrawer = () => {
    setShowDrawer(false);
    setTimeout(() => {
      setShowDrawer(true);
    }, 500);
  };

  const getClassName = () => {
    return (
      'dropdownContainer ' +
      (conceptIds && conceptIds !== 'chapTest' && currentBatchData
        ? 'pad-right'
        : '')
    );
  };

  return (
    <>
      <HeaderComponent />
      <TestDetailsScreenBackground>
        <CardHeader>
          <Container>
            <br />
            {conceptIds && conceptIds !== 'chapTest' ? (
              <>{Breadcrumb({ ...routeParams, currentTab }, history)}</>
            ) : null}
            <Grid>
              <ClassCount>
                <BackIcon>
                  <img
                    src={
                      'https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/back-icon.svg'
                    }
                    alt="back-icon"
                    onClick={() => history.goBack()}
                  />
                </BackIcon>
                <Tooltip
                  title={decodeURIComponent(testName || name)}
                  enterTouchDelay={50}
                  arrow
                >
                  <NoWrap> {decodeURIComponent(testName || name)}</NoWrap>
                </Tooltip>
                {/* <Tooltip
                  title={`(${chapterName}, ${courseName})`}
                  enterTouchDelay={50}
                  arrow
                >
                  <span>
                    ({chapterName}, {courseName})
                  </span>
                </Tooltip> */}
              </ClassCount>
            </Grid>
          </Container>
        </CardHeader>
        <Container>
          <TabHeader>
            <ul>
              <li className={currentTab === Tab.Details ? 'active' : ''}>
                <span onClick={() => switchTab(Tab.Details)}>Details</span>
              </li>
              <li className={currentTab === Tab.Analytics ? 'active' : ''}>
                <span onClick={() => switchTab(Tab.Analytics)}>Analytics</span>
              </li>
            </ul>
            <div className={getClassName()}>
              {conceptIds && conceptIds === 'chapTest' && (
                <span className="marginBottom">
                  <select
                    className="selectList"
                    onChange={e => selectTime(e)}
                    value={currentWindow && currentWindow.name}
                  >
                    <option value="">Select Test Window</option>
                    {windowDataToShow.length > 0 &&
                      windowDataToShow.map((typeVal: any, index: any) => {
                        return (
                          <option key={index} value={typeVal._id}>
                            {typeVal.name}
                          </option>
                        );
                      })}
                  </select>
                </span>
              )}
              {currentTab === Tab.Analytics &&
                conceptIds &&
                conceptIds === 'chapTest' &&
                testAnalytics &&
                testAnalytics.data &&
                testAnalytics.data.students &&
                testAnalytics.data.students.attempted >= 5 && (
                  <span>
                    <Button className="download-btn" onClick={openMailDrawer}>
                      Download Test Report
                    </Button>
                  </span>
                )}
            </div>
          </TabHeader>
          <Page>
            <Container>
              {isFailedOrError && <EmptyState />}

              {!isFailedOrError && currentTab === Tab.Details && (
                <LoaderWrapper
                  isLoading={testDetails.apiState === API_STATE.LOADING}
                >
                  <TestDetails
                    data={testDetails.data}
                    courseName={courseName}
                    currentBatchData={currentBatchData}
                    testData={parsedTestData}
                    currentWindowData={currentWindow}
                  />
                </LoaderWrapper>
              )}

              {(!isFailedOrError ||
                (conceptIds && conceptIds === 'chapTest')) && (
                <TestAnalytics
                  isOpen={currentTab === Tab.Analytics}
                  testAnalytics={testAnalytics}
                  initialBatchData={currentBatchData}
                  allBatchesData={testDetails.data}
                  testName={decodeURIComponent(testName || name)}
                  chapTestCurrentWindow={
                    conceptIds && conceptIds === 'chapTest' ? currentWindow : {}
                  }
                />
              )}
            </Container>
          </Page>
          <SimpleSnackbar
            mode="error"
            state={isFailedOrError ? true : false}
            onClose={() => {}}
            message={testDetails.error || testAnalytics.error}
          />
        </Container>
      </TestDetailsScreenBackground>
      <SwipeableTemporaryDrawer
        showDrawer={showDrawer}
        state={drawerState}
        sendFinalDataToApi={sendMail}
        successMessage={drawerMessage}
      ></SwipeableTemporaryDrawer>
    </>
  );
};

export default TestScreen;
