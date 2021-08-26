import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { HiddenDesktop, HiddenMobile, ProgressBar } from 'app/components';
import { isLoading } from 'app/helpers/comman.helper';
import {
  formatDateToTimePassed,
  formatDateWithMonthName,
  getFormattedTime,
} from 'app/helpers/date-time.helper';
import React, { useEffect, useState } from 'react';

import { ToggleButton } from '../../../../components/atoms/toggle-button';
import { useStyles } from '../styles';
import { DropdownMenuList } from './DropdownMenuList';

enum CppItemOptions {
  DETAILS,
  DUPLICATE,
  DELETE,
}

interface ICppListItem {
  test: any;
  fetchAssignment: any;
  assignmentHistory: any;
  fetchStudentList: any;
  handleCppAssignEvent: any;
  handleAssessmentEditEvent: any;
  handleCppDuplicateEvent: any;
  handleCppDeleteEvent: any;
  handleShowCppDetailsEvent: any;
  handleAssignmentStudentListPreviewEvent: any;
  handleAssignmentToggleButtonEvent: any;
}

export default function CppListItem({
  test,
  fetchAssignment,
  assignmentHistory,
  fetchStudentList,

  handleCppAssignEvent,
  handleAssessmentEditEvent,
  handleCppDuplicateEvent,
  handleCppDeleteEvent,
  handleShowCppDetailsEvent,
  handleAssignmentStudentListPreviewEvent,
  handleAssignmentToggleButtonEvent,
}: ICppListItem) {
  const classes = useStyles();
  const {
    name,
    chapters,
    description,
    testType,
    batchesAssigned,
    assignmentAssigned,
    settings,
    contentId,
    draftPercentage,
    status,
    createdAt,
    _id: testId,
  } = test;

  const [optionsDropdownAnchorEl, setOptionsDropdownAnchorEl] = useState(null);
  const [accordionExpandState, setAccordionExpandState] = useState(false);
  const [isExpandable, setIsExpandable] = useState(false);

  const createdByName = localStorage.getItem('name');

  const handleOptionsClick = (event: any) => {
    event.stopPropagation();
    setOptionsDropdownAnchorEl(event.currentTarget);
  };

  const handleOptionsDropdownClose = (option: CppItemOptions) => {
    switch (option) {
      case CppItemOptions.DETAILS:
        handleShowCppDetailsEvent(test._id);
        break;
      case CppItemOptions.DUPLICATE:
        handleCppDuplicateEvent(test._id);
        break;
      case CppItemOptions.DELETE:
        handleCppDeleteEvent(test);
        break;
    }
    setOptionsDropdownAnchorEl(null);
  };

  const getStatus = (dataShow: any, str: string) => {
    const currentDate = new Date();
    const dueDate = new Date(dataShow.dueDate);
    // const createdDate = new Date(dataShow.createdAt);
    const createdDate = new Date(dataShow.assignedDate);
    if (currentDate > dueDate) {
      return str === 'status' ? 'Past' : classes.PastText;
    } else if (currentDate < dueDate && currentDate > createdDate) {
      return str === 'status' ? 'Live' : classes.LiveText;
    } else if (currentDate < createdDate) {
      return str === 'status' ? 'Upcoming' : classes.UpcomingText;
    }
  };

  useEffect(() => {
    if (assignmentAssigned > 0) {
      setIsExpandable(true);
    }
  }, [assignmentAssigned]);

  return (
    <div className={classes.cppList}>
      <div className={classes.cppListHeading}>
        <div>
          <h5>
            <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/test-Icon.svg" />
            {name}
          </h5>
        </div>
        <div className="btnContainer">
          {status === 'PUBLISHED' && assignmentAssigned > 0 && (
            <HiddenMobile>
              <button
                className="assignViewIcon"
                onClick={() => {
                  // setOpenCppAssignDrawer(true);
                  handleCppAssignEvent(test, 're-assign');
                }}
              >
                <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/assignViewIcon.svg" />
              </button>
            </HiddenMobile>
          )}

          {status === 'PUBLISHED' && (
            <div className={classes.switchButton}>
              <ToggleButton
                background="#1D7DEA"
                checked={assignmentAssigned > 0}
                onClick={() => {
                  handleAssignmentToggleButtonEvent(!(assignmentAssigned > 0));
                  if (!(assignmentAssigned > 0)) {
                    handleCppAssignEvent(test, 'new');
                  }
                }}
              />
            </div>
          )}

          <HiddenMobile>
            <button className="menuBtn" onClick={handleOptionsClick}>
              <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/MENU.svg" />
            </button>
            <DropdownMenuList
              id="simple-menu"
              anchorEl={optionsDropdownAnchorEl}
              keepMounted
              open={Boolean(optionsDropdownAnchorEl)}
              onClose={handleOptionsDropdownClose}
              className={classes.menuBtn}
            >
              {status.toLowerCase() !== 'draft' ? (
                <MenuItem
                  onClick={() =>
                    handleOptionsDropdownClose(CppItemOptions.DETAILS)
                  }
                >
                  Details
                </MenuItem>
              ) : null}
              <MenuItem
                onClick={() =>
                  handleOptionsDropdownClose(CppItemOptions.DUPLICATE)
                }
              >
                Duplicate
              </MenuItem>
              <MenuItem
                onClick={() =>
                  handleOptionsDropdownClose(CppItemOptions.DELETE)
                }
              >
                Delete
              </MenuItem>
            </DropdownMenuList>
          </HiddenMobile>
        </div>
      </div>
      <p className={classes.Chtext}>Ch: {chapters ? chapters : '-'}</p>
      <HiddenDesktop>
        <span className="idText">ID : {contentId}</span>
        {status === 'PUBLISHED' && (
          <button
            className="assignViewIcon"
            onClick={() => {
              // setOpenCppAssignDrawer(true);
              handleCppAssignEvent(test, 're-assign');
            }}
          >
            <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/assignViewIcon.svg" />
          </button>
        )}
      </HiddenDesktop>
      <div className={classes.quesDetails}>
        <span>
          <b>Questions</b> :{' '}
          {settings.noOfQuestions ? settings.noOfQuestions : '-'}
        </span>
        <span>
          <b>Marks</b> : {settings.totalMarks ? settings.totalMarks : '-'}
        </span>
        <span>
          <b>Duration</b> :{' '}
          {settings.duration ? `${settings.duration} min` : '-'}
        </span>
        <HiddenDesktop>
          <br />
        </HiddenDesktop>
        <span>
          <b>Created By</b> : {createdByName}
        </span>
      </div>

      <Accordion
        className={classes.assignHistory}
        expanded={accordionExpandState}
      >
        <AccordionSummary
          expandIcon={isExpandable ? <ExpandMoreIcon /> : null}
          // aria-controls="panel1a-content"
          // id="panel1a-header"
          className={classes.assignmentsAccordionHeading}
          onClick={() => {
            if (isExpandable) {
              setAccordionExpandState(!accordionExpandState);
              fetchAssignment();
            }
          }}
          classes={{
            expandIcon: classes.expandIcon,
            expanded: classes.expanded,
          }}
          IconButtonProps={{
            disableRipple: true,
          }}
        >
          <div className={classes.accordionHeading}>
            <div>
              <span className={classes.idText}>ID : {contentId}</span>
              <span
                className={
                  status === 'PUBLISHED'
                    ? classes.publishText
                    : classes.PastText
                }
              >
                {status === 'PUBLISHED' ? 'Published' : 'Draft'}
              </span>
              <span className={classes.daysText}>
                {formatDateToTimePassed(createdAt)}
              </span>
              {status === 'DRAFT' && (
                <span className={classes.progressBarText}>
                  <b>{draftPercentage ? draftPercentage : 0}%</b>
                  <span className="progressBarWidth">
                    <ProgressBar
                      variant="determinate"
                      value={draftPercentage ? draftPercentage : 0}
                      color="#F21D1D"
                    />
                  </span>
                </span>
              )}
            </div>
            {assignmentAssigned && assignmentAssigned > 0 ? (
              <div>
                <button className={classes.historyBtn}>
                  <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/historyIcon.svg" />{' '}
                  Assignment History
                </button>
              </div>
            ) : null}
            <HiddenDesktop>
              <button className="menuBtn" onClick={handleOptionsClick}>
                <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/MENU.svg" />
              </button>
              <DropdownMenuList
                id="simple-menu"
                anchorEl={optionsDropdownAnchorEl}
                keepMounted
                open={Boolean(optionsDropdownAnchorEl)}
                onClose={handleOptionsDropdownClose}
                className={classes.menuBtn}
                onClick={(e: any) => e.stopPropagation()}
              >
                {status.toLowerCase() !== 'draft' ? (
                  <MenuItem
                    onClick={() =>
                      handleOptionsDropdownClose(CppItemOptions.DETAILS)
                    }
                  >
                    Details
                  </MenuItem>
                ) : null}
                <MenuItem
                  onClick={() =>
                    handleOptionsDropdownClose(CppItemOptions.DUPLICATE)
                  }
                >
                  Duplicate
                </MenuItem>
                <MenuItem
                  onClick={() =>
                    handleOptionsDropdownClose(CppItemOptions.DELETE)
                  }
                >
                  Delete
                </MenuItem>
              </DropdownMenuList>
            </HiddenDesktop>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          {isLoading(assignmentHistory.apiState) &&
            !assignmentHistory.data[testId]?.length && (
              <div
                className={classes.circularProgressBarContainer}
                style={{ width: '100%' }}
              >
                <CircularProgress />
              </div>
            )}
          {assignmentHistory &&
            assignmentHistory.data &&
            assignmentHistory.data[testId] &&
            assignmentHistory.data[testId].length > 0 && (
              <ul className={classes.accordionContainer}>
                {assignmentHistory.data[testId].map(
                  (dataShow: any, index: any) => (
                    <li key={index}>
                      <HiddenMobile>
                        <p className={classes.batchName}>
                          {dataShow.batchCount} Batch
                        </p>
                        <p className={classes.batchNumber}>
                          <svg
                            width="9"
                            height="10"
                            viewBox="0 0 9 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.48562 5C6.92971 5 8.91374 7.09375 9 9.71875C9 9.875 8.88498 10 8.74121 10H0.230032C0.115016 10 0 9.875 0 9.71875C0.086262 7.09375 2.07029 5 4.48562 5Z"
                              fill="#666666"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.48467 0C5.69234 0 6.66998 1.0625 6.66998 2.375C6.66998 3.6875 5.69234 4.71875 4.48467 4.71875C3.30576 4.71875 2.32812 3.6875 2.32812 2.375C2.32812 1.0625 3.30576 0 4.48467 0Z"
                              fill="#666666"
                            />
                          </svg>{' '}
                          {dataShow.totalAssignedStudentCount}/
                          {dataShow.totalStudentCount}{' '}
                          <button
                            onClick={() => {
                              handleAssignmentStudentListPreviewEvent(
                                dataShow._id,
                              );
                            }}
                            className="viewListBtn"
                          >
                            View List
                          </button>
                        </p>
                      </HiddenMobile>
                      <HiddenMobile>
                        <p className={classes.testName}>Test Window</p>
                        <p className={classes.dateDetails}>
                          <span>
                            <b>
                              {formatDateWithMonthName(dataShow.assignedDate)}
                            </b>{' '}
                            ({getFormattedTime(dataShow.assignedDate)})
                          </span>
                          <span>-</span>
                          <span>
                            <b>{formatDateWithMonthName(dataShow.dueDate)}</b> (
                            {getFormattedTime(dataShow.dueDate)})
                          </span>
                        </p>
                      </HiddenMobile>
                      <HiddenMobile style={{ textAlign: 'center' }}>
                        <span className={getStatus(dataShow, 'class')}>
                          {getStatus(dataShow, 'status')}
                        </span>
                      </HiddenMobile>
                      {getStatus(dataShow, 'status') !== 'Past' ? (
                        <HiddenMobile>
                          <button
                            onClick={() => {
                              handleAssessmentEditEvent(dataShow);
                              // setOpenCppEditDrawer(true);
                              // setSelectedAssignment(dataShow);
                            }}
                            className="editBtn"
                          >
                            Edit{' '}
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 10 10"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.82125 8C1.84625 8 1.87125 7.9975 1.89625 7.99375L3.99875 7.625C4.02375 7.62 4.0475 7.60875 4.065 7.59L9.36375 2.29125C9.37534 2.27969 9.38453 2.26595 9.3908 2.25083C9.39708 2.23571 9.40031 2.2195 9.40031 2.20312C9.40031 2.18675 9.39708 2.17054 9.3908 2.15542C9.38453 2.1403 9.37534 2.12656 9.36375 2.115L7.28625 0.03625C7.2625 0.0125 7.23125 0 7.1975 0C7.16375 0 7.1325 0.0125 7.10875 0.03625L1.81 5.335C1.79125 5.35375 1.78 5.37625 1.775 5.40125L1.40625 7.50375C1.39409 7.57071 1.39843 7.63963 1.41891 7.70454C1.43938 7.76945 1.47537 7.82838 1.52375 7.87625C1.60625 7.95625 1.71 8 1.82125 8ZM2.66375 5.82L7.1975 1.2875L8.11375 2.20375L3.58 6.73625L2.46875 6.9325L2.66375 5.82ZM9.6 9.05H0.4C0.17875 9.05 0 9.22875 0 9.45V9.9C0 9.955 0.045 10 0.1 10H9.9C9.955 10 10 9.955 10 9.9V9.45C10 9.22875 9.82125 9.05 9.6 9.05Z"
                                fill="#1D7DEA"
                              />
                            </svg>
                          </button>
                        </HiddenMobile>
                      ) : null}

                      <HiddenDesktop>
                        <p className={classes.batchName}>
                          {dataShow.batchCount} Batch
                        </p>
                        <p className={classes.testName}>Test Window</p>
                        <p className={classes.dateDetails}>
                          <span>
                            <b>{formatDateWithMonthName(dataShow.createdAt)}</b>{' '}
                            ({getFormattedTime(dataShow.createdAt)})
                          </span>
                          <span>-</span>
                          <span>
                            <b>{formatDateWithMonthName(dataShow.dueDate)}</b> (
                            {getFormattedTime(dataShow.dueDate)})
                          </span>
                        </p>
                        <p className={classes.batchNumber}>
                          <svg
                            width="9"
                            height="10"
                            viewBox="0 0 9 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.48562 5C6.92971 5 8.91374 7.09375 9 9.71875C9 9.875 8.88498 10 8.74121 10H0.230032C0.115016 10 0 9.875 0 9.71875C0.086262 7.09375 2.07029 5 4.48562 5Z"
                              fill="#666666"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.48467 0C5.69234 0 6.66998 1.0625 6.66998 2.375C6.66998 3.6875 5.69234 4.71875 4.48467 4.71875C3.30576 4.71875 2.32812 3.6875 2.32812 2.375C2.32812 1.0625 3.30576 0 4.48467 0Z"
                              fill="#666666"
                            />
                          </svg>{' '}
                          {dataShow.totalAssignedStudentCount}/
                          {dataShow.totalStudentCount}{' '}
                          <button
                            onClick={() => {
                              handleAssignmentStudentListPreviewEvent(
                                dataShow._id,
                              );
                            }}
                            className="viewListBtn"
                          >
                            View List
                          </button>
                        </p>
                      </HiddenDesktop>
                      <HiddenDesktop>
                        <p>
                          <span className={getStatus(dataShow, 'class')}>
                            {getStatus(dataShow, 'status')}
                          </span>
                        </p>
                        <button
                          onClick={() => {
                            handleAssessmentEditEvent(dataShow);
                            // setOpenCppEditDrawer(true);
                            // setSelectedAssignment(dataShow);
                          }}
                          className="editBtn"
                        >
                          Edit{' '}
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 10 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1.82125 8C1.84625 8 1.87125 7.9975 1.89625 7.99375L3.99875 7.625C4.02375 7.62 4.0475 7.60875 4.065 7.59L9.36375 2.29125C9.37534 2.27969 9.38453 2.26595 9.3908 2.25083C9.39708 2.23571 9.40031 2.2195 9.40031 2.20312C9.40031 2.18675 9.39708 2.17054 9.3908 2.15542C9.38453 2.1403 9.37534 2.12656 9.36375 2.115L7.28625 0.03625C7.2625 0.0125 7.23125 0 7.1975 0C7.16375 0 7.1325 0.0125 7.10875 0.03625L1.81 5.335C1.79125 5.35375 1.78 5.37625 1.775 5.40125L1.40625 7.50375C1.39409 7.57071 1.39843 7.63963 1.41891 7.70454C1.43938 7.76945 1.47537 7.82838 1.52375 7.87625C1.60625 7.95625 1.71 8 1.82125 8ZM2.66375 5.82L7.1975 1.2875L8.11375 2.20375L3.58 6.73625L2.46875 6.9325L2.66375 5.82ZM9.6 9.05H0.4C0.17875 9.05 0 9.22875 0 9.45V9.9C0 9.955 0.045 10 0.1 10H9.9C9.955 10 10 9.955 10 9.9V9.45C10 9.22875 9.82125 9.05 9.6 9.05Z"
                              fill="#1D7DEA"
                            />
                          </svg>
                        </button>
                      </HiddenDesktop>
                    </li>
                  ),
                )}
              </ul>
            )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
