import React, { useState, useEffect } from 'react';
import { Drawer, Divider, Button } from '@material-ui/core';
import { useStyles } from '../styles';
import DateTimePickers from 'app/components/common/date-time-picker';

interface ICppEditDrawer {
  openDrawer: any;
  handleClose: any;
  assignment: any;
  duration: number;
  cppSnackbarEmitter: any;
  handleAssignmentUpdateEvent: any;
}

export default function CppEditDrawer({
  openDrawer,
  handleClose,
  assignment,
  duration,
  cppSnackbarEmitter,
  handleAssignmentUpdateEvent,
}: ICppEditDrawer) {
  const { _id: assignmentId, assignedDate, dueDate, status } = assignment;

  const [assignmentStartDate, setAssignmentStartDate] = useState<any>();
  const [assignmentEndDate, setAssignmentEndDate] = useState<any>();
  const classes = useStyles();

  useEffect(() => {
    if (assignedDate && dueDate) {
      setAssignmentStartDate({ date: assignedDate });
      setAssignmentEndDate({ date: dueDate });
    }
  }, [assignedDate, dueDate]);

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

  const handleAssignmentStartDateSelect = (value: any) => {
    setAssignmentStartDate(value);

    if (!assignmentEndDate?.date) return;
    if (!validateDateRange(value.date, assignmentEndDate.date)) {
      cppSnackbarEmitter({
        type: 'error',
        message: `Test window should be atleast ${duration} mins`,
        show: true,
      });
    }
  };

  const handleAssignmentEndDateSelect = (value: any, ...rest: any[]) => {
    if (!assignmentStartDate?.date) {
      setAssignmentEndDate(value);
      return;
    }
    const endDateWrapper = value;
    const endDate = new Date(endDateWrapper.date).getTime();
    const startDate = new Date(assignmentStartDate.date).getTime();
    const diff = (endDate - startDate) / (1000 * 60);
    if (diff < duration && endDateWrapper.picker === 'date') {
      const finalTime = startDate + duration * 1000 * 60;
      setAssignmentEndDate({ ...endDateWrapper, date: new Date(finalTime) });
    } else if (diff < duration && endDateWrapper.picker === 'time') {
      cppSnackbarEmitter({
        type: 'error',
        message: `Test window should be atleast ${duration} mins`,
        show: true,
      });
      setAssignmentEndDate(value);
    } else {
      setAssignmentEndDate(value);
    }
  };

  const validateDateRange = (start: any, end: any) => {
    if (!(start && end)) return false;
    const startDate = new Date(start).getTime();
    const endDate = new Date(end).getTime();
    const diff = (endDate - startDate) / (1000 * 60);
    if (diff < duration) {
      return false;
    }
    return true;
  };

  const handleClearTimeslotSelection = () => {
    if (getStatus(assignment, 'status') !== 'Live') {
      setAssignmentStartDate(null);
    }
    setAssignmentEndDate(null);
  };

  const handleAssignmentUpdate = () => {
    const payload: any = {
      assignmentId,
      assignedDate: new Date(assignmentStartDate.date).toISOString(),
      dueDate: new Date(assignmentEndDate.date).toISOString(),
    };

    handleAssignmentUpdateEvent(payload);
  };

  return (
    <Drawer anchor="right" open={openDrawer} onClose={handleClose}>
      <div
        className={classes.drawerList}
        role="presentation"
        // onClick={toggleDrawer(anchor, false)}
        // onKeyDown={toggleDrawer(anchor, false)}
      >
        <div className={classes.drawerHeader}>
          Edit
          <button className="closeButton" onClick={handleClose}>
            <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/cross-mark.svg" />
          </button>
        </div>
        <Divider />
        <div className={classes.drawerBody}>
          <p className="testWindow">
            <span>Test Window-1</span>{' '}
            <span className={getStatus(assignment, 'class')}>
              {getStatus(assignment, 'status')}
            </span>
          </p>
          <div className="marginBottom">
            <label>Select Start Date</label>
            <div className="calenderDate">
              <div className="calenderDatetimeContainer">
                <DateTimePickers
                  type="startDate"
                  page="cppAssign"
                  onSelect={handleAssignmentStartDateSelect}
                  minValue={undefined}
                  value={assignmentStartDate ? assignmentStartDate.date : null}
                  enableTimePicker={true}
                  disablePast={true}
                  disableFuture={false}
                  dateFormat="dd MMM yyyy"
                  datePlaceholder="Date"
                  timePlaceholder="Time"
                  disabled={getStatus(assignment, 'status') === 'Live'}
                />
              </div>
            </div>
            <label>Select Due Date</label>
            <div className="calenderDate">
              <div className="calenderDatetimeContainer">
                <DateTimePickers
                  type="endDate"
                  page="cppAssign"
                  onSelect={handleAssignmentEndDateSelect}
                  minValue={
                    assignmentStartDate
                      ? new Date(assignmentStartDate.date)
                      : undefined
                  }
                  value={assignmentEndDate ? assignmentEndDate.date : null}
                  enableTimePicker={true}
                  disablePast={true}
                  disableFuture={false}
                  dateFormat="dd MMM yyyy"
                  datePlaceholder="Date"
                  timePlaceholder="Time"
                />
              </div>
            </div>
          </div>
        </div>
        <div className={classes.drawerfooter}>
          <Button
            variant="outlined"
            color="primary"
            style={{ width: '150px' }}
            onClick={handleClearTimeslotSelection}
          >
            Clear
          </Button>
          <Button
            disabled={
              !validateDateRange(
                assignmentStartDate?.date,
                assignmentEndDate?.date,
              )
            }
            onClick={handleAssignmentUpdate}
            variant="contained"
            color="primary"
            style={{ width: '150px' }}
          >
            Assign
          </Button>
        </div>
      </div>
    </Drawer>
  );
}
