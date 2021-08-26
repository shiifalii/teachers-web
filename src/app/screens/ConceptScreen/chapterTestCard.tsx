import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useParams } from 'react-router-dom';
import { handleTestAssign } from '../../helpers/private.api.helper';
import { getUserNameFromStorage } from '../../helpers/local.storage.helper';
import {
  titleCase,
  extractAttemptsAndTotal,
} from '../../helpers/comman.helper';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { conceptScreenUrlParamInterface } from 'app/types/concept.screen.types';
import SimpleSnackbar from '../../components/common/snackbar.component';
import { sagaMiddleware } from '../../stores/configure.store';
import { fetchConcepts } from '../../screens/ConceptScreen/concept.sagas';
import { getConcept, getTests } from '../../helpers/private.api.helper';
import TopicLockModal from 'app/components/common/topicLock.component';
import { TopicUnlockAnalyticEvent } from 'app/helpers/analytics.helper';
import { useStyles } from './style';
import { HiddenMobile, HiddenDesktop } from 'app/components';
const GreenSwitch = withStyles({
  root: {
    width: 52,
    height: 26,
    padding: 1,
    '@media (max-width: 380px)': {
      transform: 'scale(.7)',
    },
  },
  switchBase: {
    color: '#fff',
    padding: 1,
    '&$checked': {
      color: '#fff',
      transform: 'translateX(27px)',
    },
    '&$checked + $track': {
      backgroundColor: '#1D7DEA',
      opacity: 1,
    },
    '& + $track': {
      opacity: 1,
      backgroundColor: '#ececec',
      borderRadius: '20px',
    },
  },

  thumb: {
    width: 24,
    height: 25,
  },

  checked: {},
  track: {},
})(Switch);

export interface CardProps {
  classes: string | JSX.Element;
  conceptData: any;
  index: number;
  handleClick: any;
  chapterName?: string;
  batchName?: string;
  fromScreen: string;
  openAssignDrawer: any;
  lockTest: any;
  viewBatchList: any;
}

const Listing = styled.ul`
  border-bottom: 1px solid #eee;
  &:hover {
    background-color: #f5f5f5;
    transition: all 0.4s ease-in-out;
  }
  &:last-child() {
    border: none;
  }

  .listItem {
    display: grid;
    grid-template-columns: 79% 5% 4% 2%;
    padding: 1em;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 768px) {
      grid-template-columns: 60% 10% 10% 5%;
    }
    div:nth-of-type(1) p:nth-of-type(1) {
      @media (max-width: 320px) {
        font-size: 13px;
      }
    }
  }
`;

const Proficiency = styled.p`
  font-size: 12px;
  color: #666666;
  display: flex;
  line-height: 20px;
  .dot {
    margin: 0 4px;
  }
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ListingIndex = styled.span`
  margin-right: 5px;
`;

const Clickable = styled.div`
  font-size: 22px;
  cursor: pointer;
`;

const Placeholder = styled.div`
  height: 100%;
  width: 100%;
  align-items: center;
  display: flex;
`;

const ChapterTestCard = function(props: CardProps) {
  const {
    classes,
    conceptData,
    index,
    handleClick,
    chapterName,
    batchName,
    fromScreen,
    openAssignDrawer,
    lockTest,
    viewBatchList,
  } = props;
  const { proficiency, duration } = conceptData;
  const params: conceptScreenUrlParamInterface = useParams();
  const { batchId, chapterIds } = params;
  const [isLocked, setIsLocked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const localCourses: string | null = localStorage.getItem('courses');
  const parsedCourses = JSON.parse(localCourses ? localCourses : '');
  let courseName = '';
  for (let i = 0; i < parsedCourses.length; i++) {
    if (parsedCourses[i]._id === props.conceptData.courseId) {
      courseName = parsedCourses[i].name;
    }
  }

  useEffect(() => {
    setIsLocked(conceptData.isLocked);
  }, [conceptData.isLocked]);

  const getTheTestStatus = (assignedDate: string, dueDate: string) => {
    let current = new Date().getTime();
    let assigned = new Date(assignedDate).getTime();
    let due = new Date(dueDate).getTime();
    if (due > current && assigned <= current) {
      return 'Live';
    } else if (due < current) {
      return 'Past';
    } else if (due > current && assigned > current) {
      return 'Upcoming';
    } else {
      return '';
    }
  };

  let testStatus = '';
  let testHistory = JSON.parse(
    JSON.stringify(props.conceptData.assignmentsHistory),
  );
  if (testHistory && testHistory.length > 0) {
    for (let i = 0; i < testHistory.length; i++) {
      testStatus = getTheTestStatus(
        testHistory[i].assignedDate,
        testHistory[i].dueDate,
      );
      if (testStatus === 'Live') break;
    }
  }
  testHistory = testHistory.sort((a: any, b: any) =>
    b.assignedDate > a.assignedDate
      ? 1
      : a.assignedDate > b.assignedDate
      ? -1
      : 0,
  );

  useEffect(() => {
    if (testStatus === 'Past') {
      setIsLocked(true);
    }
  }, [testStatus]);

  const handleOnClose = () => {
    setIsError(false);
    setIsSuccess(false);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleTopicLockModalOpen = async () => {
    try {
      if (!isLocked) {
        if (testStatus === 'Past') {
          setIsLocked(true);
        } else {
          lockTest(testStatus);
        }
      } else {
        openAssignDrawer('assign', testStatus, null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onClickHandler = () => {
    if (conceptData.hasTests) {
      if (testHistory.length > 0) {
        localStorage.setItem(
          'chapterTestAssignmentData',
          JSON.stringify(testHistory),
        );
      } else {
        localStorage.removeItem('chapterTestAssignmentData');
      }
      handleClick();
    } else {
      setIsError(true);
      setErrorMessage('Concept Test for this concept is coming soon');
    }
  };

  const getClassName = (statusPassed: any) => {
    if (statusPassed === 'Live') {
      return classesName.LiveText;
    } else if (statusPassed === 'Past') {
      return classesName.PastText;
    } else {
      return classesName.UpcomingText;
    }
  };

  const monthNames = [
    'Jan',
    'Feb',
    'March',
    'April',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];

  const getDisplayDate = (date: any) => {
    const convertedDate = new Date(date);
    return (
      convertedDate.getDate() +
      ' ' +
      monthNames[convertedDate.getMonth()] +
      ' ' +
      convertedDate.getFullYear()
    );
  };

  const getDisplayTime = (date: any) => {
    const convertedDate = new Date(date);
    return (
      (convertedDate.getHours() % 12) +
      ':' +
      (convertedDate.getMinutes() > 9
        ? convertedDate.getMinutes()
        : '0' + convertedDate.getMinutes()) +
      ' ' +
      (convertedDate.getHours() > 11 ? 'PM' : 'AM')
    );
  };

  const reassignTheTest = () => {
    let batchesToPass = getBatchesData();
    openAssignDrawer('reassign', testStatus, batchesToPass);
  };

  const getBatchesData = () => {
    let batchesToPass = [];
    for (let i = 0; i < testHistory.length; i++) {
      batchesToPass.push(...testHistory[i].batches);
    }
    batchesToPass = batchesToPass.filter(
      (v, i, a) => a.findIndex(t => t._id === v._id) === i,
    );
    return batchesToPass;
  };

  const openBatches = (data: any) => {
    viewBatchList(data);
  };

  const getDuration = () => {
    let time = duration / 60;
    if (time >= 1) {
      return time + ' hr';
    } else {
      return duration + ' min';
    }
  };

  const classesName = useStyles();
  return (
    <div>
      <Listing>
        <li>
          <div className="listItem">
            <div style={{ cursor: 'pointer' }} onClick={onClickHandler}>
              <p style={{ display: 'flex', paddingLeft: '8px' }}>
                <ListingIndex>{index + 1}. </ListingIndex>
                <span>
                  {classes}
                  {testHistory && testHistory.length > 0 ? (
                    <span className={getClassName(testStatus)}>
                      {testStatus}
                    </span>
                  ) : null}
                  {/* <HiddenDesktop> */}
                  <Proficiency>
                    <span>{courseName}</span>
                    <HiddenMobile>
                      <span className="dot">
                        <svg
                          width="5"
                          height="5"
                          viewBox="0 0 5 5"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="2.92188" cy="2.5" r="2" fill="#999999" />
                        </svg>
                      </span>
                    </HiddenMobile>
                    <span>
                      <svg
                        style={{ verticalAlign: 'middle' }}
                        width="12"
                        height="11"
                        viewBox="0 0 12 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.42188 0C3.38918 0 0.921875 2.4673 0.921875 5.5C0.921875 8.5327 3.38918 11 6.42188 11C9.45458 11 11.9219 8.5327 11.9219 5.5C11.9219 2.4673 9.45458 0 6.42188 0ZM6.42188 9.9C3.99583 9.9 2.02188 7.92605 2.02188 5.5C2.02188 3.07395 3.99583 1.1 6.42188 1.1C8.84793 1.1 10.8219 3.07395 10.8219 5.5C10.8219 7.92605 8.84793 9.9 6.42188 9.9Z"
                          fill="#666666"
                        />
                        <path
                          d="M6.97109 2.75H5.87109V6.05H9.17109V4.95H6.97109V2.75Z"
                          fill="#666666"
                        />
                      </svg>{' '}
                      {getDuration()}
                    </span>
                    <HiddenMobile>
                      <span className="dot">
                        <svg
                          width="5"
                          height="5"
                          viewBox="0 0 5 5"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="2.92188" cy="2.5" r="2" fill="#999999" />
                        </svg>
                      </span>
                    </HiddenMobile>
                    Proficiency {proficiency}
                  </Proficiency>
                  {/* </HiddenDesktop> */}
                </span>
              </p>
              {/* <HiddenMobile>
              <Proficiency>Proficiency {proficiency}</Proficiency>
            </HiddenMobile> */}
            </div>
            <div>
              {!isLocked && (
                <button
                  className={classesName.assignViewIcon}
                  onClick={reassignTheTest}
                >
                  <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/assignViewIcon.svg" />
                </button>
              )}
            </div>
            <Placeholder>
              {isLoading ? (
                /*
              TODO - tell ui guy to fix and make it global 
              */
                <div
                  style={{
                    position: 'fixed',
                    padding: '300px 48%',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(50, 75, 99, .4)',
                    zIndex: 100,
                  }}
                >
                  <CircularProgress />
                </div>
              ) : conceptData.hasTests ? (
                <FormControlLabel
                  control={
                    <GreenSwitch
                      checked={!isLocked}
                      value={!isLocked}
                      onChange={handleTopicLockModalOpen}
                    />
                  }
                  label=""
                />
              ) : (
                <Placeholder onClick={onClickHandler}></Placeholder>
              )}
            </Placeholder>

            {conceptData.hasTests ? (
              <Clickable onClick={handleClick}>&gt;</Clickable>
            ) : (
              <Placeholder onClick={onClickHandler}></Placeholder>
            )}
          </div>
          {testHistory && testHistory.length > 0 ? (
            <Accordion className={classesName.assignHistory}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className={classesName.accordionHeading1}
              >
                <div>
                  <button className={classesName.historyBtn}>
                    <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/historyIcon.svg" />{' '}
                    Assignment History
                  </button>
                </div>
              </AccordionSummary>
              {testHistory && testHistory.length > 0 ? (
                <AccordionDetails>
                  <ul style={{ width: '100%' }}>
                    {testHistory.map((hisData: any, index: number) => (
                      <li className={classesName.assignHistoryList} key={index}>
                        <div>
                          <span className={classesName.batchName}>
                            {hisData.batchCount} Batch
                            {hisData.batchCount > 1 ? 'es' : ''}
                          </span>
                          <Button
                            color="primary"
                            onClick={() => openBatches(hisData)}
                          >
                            View
                          </Button>
                        </div>
                        <div className={classesName.testWindow}>
                          <b>Test Window {testHistory.length - index}:</b> From:{' '}
                          {getDisplayDate(hisData.assignedDate)} (
                          {getDisplayTime(hisData.assignedDate)}) To:{' '}
                          {getDisplayDate(hisData.dueDate)}(
                          {getDisplayTime(hisData.dueDate)}){' '}
                        </div>
                        <div>
                          <span
                            className={getClassName(
                              getTheTestStatus(
                                hisData.assignedDate,
                                hisData.dueDate,
                              ),
                            )}
                          >
                            {getTheTestStatus(
                              hisData.assignedDate,
                              hisData.dueDate,
                            )}
                          </span>
                          <HiddenDesktop>
                            {getTheTestStatus(
                              hisData.assignedDate,
                              hisData.dueDate,
                            ) !== 'Past' ? (
                              <Button
                                className={classesName.editbtn}
                                color="primary"
                                onClick={() =>
                                  openAssignDrawer('edit', testStatus, hisData)
                                }
                              >
                                Edit{' '}
                                <svg
                                  width="11"
                                  height="10"
                                  viewBox="0 0 11 10"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M2.74313 8C2.76813 8 2.79313 7.9975 2.81813 7.99375L4.92062 7.625C4.94562 7.62 4.96938 7.60875 4.98688 7.59L10.2856 2.29125C10.2972 2.27969 10.3064 2.26595 10.3127 2.25083C10.319 2.23571 10.3222 2.2195 10.3222 2.20312C10.3222 2.18675 10.319 2.17054 10.3127 2.15542C10.3064 2.1403 10.2972 2.12656 10.2856 2.115L8.20813 0.03625C8.18438 0.0125 8.15312 0 8.11937 0C8.08563 0 8.05438 0.0125 8.03063 0.03625L2.73187 5.335C2.71312 5.35375 2.70187 5.37625 2.69687 5.40125L2.32812 7.50375C2.31596 7.57071 2.32031 7.63963 2.34078 7.70454C2.36126 7.76945 2.39724 7.82838 2.44562 7.87625C2.52812 7.95625 2.63188 8 2.74313 8ZM3.58563 5.82L8.11937 1.2875L9.03562 2.20375L4.50187 6.73625L3.39062 6.9325L3.58563 5.82ZM10.5219 9.05H1.32188C1.10062 9.05 0.921875 9.22875 0.921875 9.45V9.9C0.921875 9.955 0.966875 10 1.02188 10H10.8219C10.8769 10 10.9219 9.955 10.9219 9.9V9.45C10.9219 9.22875 10.7431 9.05 10.5219 9.05Z"
                                    fill="#1D7DEA"
                                  />
                                </svg>
                              </Button>
                            ) : null}
                          </HiddenDesktop>
                        </div>
                        <HiddenMobile>
                          {getTheTestStatus(
                            hisData.assignedDate,
                            hisData.dueDate,
                          ) !== 'Past' ? (
                            <Button
                              className={classesName.editbtn}
                              color="primary"
                              onClick={() =>
                                openAssignDrawer('edit', testStatus, hisData)
                              }
                            >
                              Edit{' '}
                              <svg
                                width="11"
                                height="10"
                                viewBox="0 0 11 10"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M2.74313 8C2.76813 8 2.79313 7.9975 2.81813 7.99375L4.92062 7.625C4.94562 7.62 4.96938 7.60875 4.98688 7.59L10.2856 2.29125C10.2972 2.27969 10.3064 2.26595 10.3127 2.25083C10.319 2.23571 10.3222 2.2195 10.3222 2.20312C10.3222 2.18675 10.319 2.17054 10.3127 2.15542C10.3064 2.1403 10.2972 2.12656 10.2856 2.115L8.20813 0.03625C8.18438 0.0125 8.15312 0 8.11937 0C8.08563 0 8.05438 0.0125 8.03063 0.03625L2.73187 5.335C2.71312 5.35375 2.70187 5.37625 2.69687 5.40125L2.32812 7.50375C2.31596 7.57071 2.32031 7.63963 2.34078 7.70454C2.36126 7.76945 2.39724 7.82838 2.44562 7.87625C2.52812 7.95625 2.63188 8 2.74313 8ZM3.58563 5.82L8.11937 1.2875L9.03562 2.20375L4.50187 6.73625L3.39062 6.9325L3.58563 5.82ZM10.5219 9.05H1.32188C1.10062 9.05 0.921875 9.22875 0.921875 9.45V9.9C0.921875 9.955 0.966875 10 1.02188 10H10.8219C10.8769 10 10.9219 9.955 10.9219 9.9V9.45C10.9219 9.22875 10.7431 9.05 10.5219 9.05Z"
                                  fill="#1D7DEA"
                                />
                              </svg>
                            </Button>
                          ) : null}
                        </HiddenMobile>
                      </li>
                    ))}
                  </ul>
                </AccordionDetails>
              ) : null}
            </Accordion>
          ) : null}
        </li>
      </Listing>
      <SimpleSnackbar
        mode={'error'}
        onClose={handleOnClose}
        message={errorMessage}
        state={isError}
      />
      <SimpleSnackbar
        mode={'success'}
        onClose={handleOnClose}
        message={successMessage}
        state={isSuccess}
      />
    </div>
  );
};

export default ChapterTestCard;
