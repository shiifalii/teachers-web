import React, { useState, useEffect } from 'react';
import { Button, Divider, Drawer } from '@material-ui/core';
import DateTimePickers from '../../components/common/date-time-picker';
import { useStyles } from './style';
import Checkbox from '@material-ui/core/Checkbox';
import SimpleSnackbar from 'app/components/common/snackbar.component';
import {
  fetchChapTestBatches,
  assignChapTest,
  updateAssignment,
} from 'app/helpers/private.api.helper';
interface ICppAssignDrawer {
  openDrawer: any;
  handleClose: any;
  targetExam: string;
  assignedCount: number;
  testInfo: any;
  assignedSuccess: any;
  drawerType: string;
  testStatus: string;
  editDataForDrawer: any;
}

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

export default function ChapTestDrawer({
  openDrawer,
  handleClose,
  targetExam,
  assignedCount,
  testInfo,
  assignedSuccess,
  drawerType,
  testStatus,
  editDataForDrawer,
}: ICppAssignDrawer) {
  console.log(testInfo);
  const [currenTabIndex, setCurrentTabIndex] = useState(0);
  const [assignmentStartDate, setAssignmentStartDate] = useState<any>();
  const [assignmentEndDate, setAssignmentEndDate] = useState<any>();
  const [fillAllDataError, setFillAllDataError] = useState('');
  const [batchesList, setBatchesListForAssign] = useState<any[]>([]);
  const [selectAllBatches, setSelectAllBatches] = useState(false);
  const [selectedBatchesList, setSelectedBatchesList] = useState('');
  //   const classes = useStyles();
  const handleCloseEvent = () => {
    setCurrentTabIndex(0);
    handleClose();
  };

  const handleOnClose = () => {
    setFillAllDataError('');
  };

  if (
    !assignmentStartDate &&
    !assignmentEndDate &&
    drawerType === 'edit' &&
    editDataForDrawer
  ) {
    setAssignmentEndDate({
      date: editDataForDrawer.dueDate,
      type: 'endDate',
      picker: 'date',
    });
    setAssignmentStartDate({
      date: editDataForDrawer.assignedDate,
      type: 'startDate',
      picker: 'date',
    });
  }

  const localCourses: string | null = localStorage.getItem('courses');
  let dataToIterate = JSON.parse(localCourses ? localCourses : '');
  let subjectIdsArray = [];
  let subjectIds = '';
  for (let i = 0; i < dataToIterate.length; i++) {
    if (dataToIterate[i]._id === targetExam.toString()) {
      for (let j = 0; j < dataToIterate[i].subjects.length; j++) {
        subjectIdsArray.push(dataToIterate[i].subjects[j]._id);
      }
    }
  }
  subjectIds = subjectIdsArray.join(',');

  if (subjectIds && targetExam) {
    let dataToPass = {
      offset: 1,
      limit: 500,
      type: 'mine',
      targetExam: targetExam,
      subject: subjectIds,
    };
    if (batchesList.length === 0) {
      fetchChapTestBatches(dataToPass).then((res: any) => {
        if (res && res.data && res.data.code === 200) {
          if (res.data.data.batches && res.data.data.batches.length) {
            let batchesRecieved = res.data.data.batches;
            batchesRecieved = batchesRecieved.map((item: any) => ({
              ...item,
              checked: false,
            }));

            if (
              drawerType === 'reassign' &&
              editDataForDrawer &&
              editDataForDrawer.length > 0
            ) {
              let assignedBatches = editDataForDrawer;
              for (let i = 0; i < assignedBatches.length; i++) {
                for (let j = 0; j < batchesRecieved.length; j++) {
                  if (assignedBatches[i]._id === batchesRecieved[j].id) {
                    batchesRecieved[j]['alreadyAssigned'] = true;
                    batchesRecieved[j]['checked'] = true;
                  }
                }
              }
              selectAllBatchFunction(batchesRecieved);
              let allBatches = '';
              for (let i = 0; i < assignedBatches.length; i++) {
                allBatches = allBatches +=
                  assignedBatches[i]._id || assignedBatches[i].id;
              }
              setSelectedBatchesList(allBatches);
            }
            setBatchesListForAssign(batchesRecieved);
          }
        }
      });
    }
  }

  const handleAssignmentStartDateSelect = (value: any) => {
    setAssignmentStartDate(value);
  };

  const handleAssignmentEndDateSelect = (value: any) => {
    setAssignmentEndDate(value);
  };

  const handleClearTimeslotSelection = () => {
    handleCloseEvent();
  };

  const getBatchesToPass = () => {
    let result = [];
    for (let i = 0; i < batchesList.length; i++) {
      if (batchesList[i].checked && !batchesList[i].alreadyAssigned) {
        result.push(batchesList[i].id || batchesList[i]._id);
      }
    }
    return result;
  };

  const handleTestAssignReviewEvent = () => {
    if (assignmentStartDate && assignmentEndDate) {
      let nowDate = new Date();
      if (
        (new Date(assignmentStartDate.date) < nowDate ||
          new Date(assignmentEndDate.date) < nowDate) &&
        testStatus !== 'Live'
      ) {
        setFillAllDataError(
          'Start/ End Date should be greater than the current date',
        );
        return;
      }
      if (
        (new Date(assignmentEndDate.date).getTime() -
          new Date(assignmentStartDate.date).getTime()) /
          60000 <
        testInfo.duration
      ) {
        setFillAllDataError(
          'Time window should be greater or equal to test duration',
        );
        return;
      }
      if (drawerType === 'edit') {
        let dataToSend = {
          assignedDate: new Date(assignmentStartDate.date).toISOString(),
          dueDate: new Date(assignmentEndDate.date).toISOString(),
          assignmentId: editDataForDrawer._id,
        };
        updateAssignment(dataToSend).then(res => {
          if (res && res.data && res.data.code === 200) {
            assignedSuccess('editsuccess');
            handleCloseEvent();
          } else {
            setFillAllDataError(res.data.message);
          }
        });
      } else {
        let dataToSend = {
          teacher: {
            teacherName: localStorage.getItem('name'),
          },
          assignedDate: new Date(assignmentStartDate.date).toISOString(),
          dueDate: new Date(assignmentEndDate.date).toISOString(),
          test: {
            testId: testInfo.testId,
            testName: testInfo.testName,
            type: 'chap',
          },
          courseId: targetExam,
          windowTest: true,
          batches: getBatchesToPass(),
          students: [],
        };
        if (dataToSend.batches && dataToSend.batches.length > 0) {
          assignChapTest(dataToSend).then((res: any) => {
            if (res && res.data && res.data.code === 200) {
              assignedSuccess('assignedsuccess');
              handleCloseEvent();
            } else {
              setFillAllDataError(res.data.message);
            }
          });
        } else {
          setFillAllDataError('Select batches');
        }
      }
    } else {
      setFillAllDataError('Select start/ end date');
    }
  };

  const validateDateRange = (start: any, end: any) => {
    let startDate = new Date(start);
    let endDate = new Date(end);
    if (start && end) {
      if (startDate > endDate) {
        return true;
      }
    }
    return false;
  };

  const handleBatchClick = (index: number) => {
    if (batchesList.length > 0 && !batchesList[index].alreadyAssigned) {
      if (batchesList[index].checked) {
        if (
          selectedBatchesList &&
          selectedBatchesList.includes(batchesList[index].id)
        ) {
          setSelectedBatchesList(
            selectedBatchesList.replace(batchesList[index].id, ''),
          );
        }
      } else {
        setSelectedBatchesList(selectedBatchesList + batchesList[index].id);
      }
      batchesList[index].checked = !batchesList[index].checked;

      selectAllBatchFunction(batchesList);
    }
  };

  const selectAllBatchFunction = (batchesListing: any) => {
    let batchFlag = false;
    for (let i = 0; i < batchesListing.length; i++) {
      if (!batchesListing[i].checked) {
        batchFlag = true;
        break;
      }
    }
    setSelectAllBatches(!batchFlag);
  };

  const handleSelectAllClick = () => {
    let batchesFlag = false;
    for (let i = 0; i < batchesList.length; i++) {
      if (!batchesList[i].alreadyAssigned) {
        batchesFlag = true;
        break;
      }
    }
    if (drawerType === 'reassign' && !batchesFlag) {
    } else {
      let allBatches = '';
      if (!selectAllBatches) {
        for (let i = 0; i < batchesList.length; i++) {
          allBatches = allBatches += batchesList[i].id;
          batchesList[i].checked = true;
        }
      }
      setSelectedBatchesList(allBatches);
      setSelectAllBatches(!selectAllBatches);
    }
  };

  const getClassName = () => {
    if (testStatus === 'Live') {
      return classesName.LiveText;
    } else if (testStatus === 'Past') {
      return classesName.PastText;
    } else {
      return classesName.UpcomingText;
    }
  };

  const getClassNameStart = (str: string) => {
    let classReturn = str === 'div' ? 'calenderDate ' : '';
    if (testStatus === 'Live' && drawerType === 'edit') {
      classReturn += 'disabled';
    }
    return classReturn;
  };

  const getClassNameBatch = (data: any) => {
    return 'batchList ' + (data.alreadyAssigned ? 'disabled' : '');
  };

  const getClassNameSelAll = () => {
    return (
      'batchList ' +
      (selectAllBatches && drawerType === 'reassign' ? 'disabled' : '')
    );
  };

  const classesName = useStyles();
  return (
    <Drawer anchor="right" open={openDrawer} onClose={handleCloseEvent}>
      <TabPanel>
        <div className={classesName.drawerList} role="presentation">
          <div className={classesName.drawerHeader}>
            Select Dates
            <button className="closeButton" onClick={handleCloseEvent}>
              <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/cross-mark.svg" />
            </button>
          </div>
          <Divider />
          <div className={classesName.drawerBody}>
            <div className="marginBottom">
              <p className="testWindow">
                <span>
                  Test Window-
                  {drawerType === 'edit' ? assignedCount : assignedCount + 1}
                </span>
                <span className={getClassName()}>{testStatus}</span>
              </p>
              <label className={getClassNameStart('label')}>
                Select Start Date
              </label>
              <div className={getClassNameStart('div')}>
                <div className="calenderDatetimeContainer">
                  <DateTimePickers
                    type="startDate"
                    page="cppAssign"
                    onSelect={handleAssignmentStartDateSelect}
                    minValue={undefined}
                    value={
                      assignmentStartDate ? assignmentStartDate.date : null
                    }
                    enableTimePicker={true}
                    disablePast={drawerType !== 'edit' ? true : false}
                    disableFuture={false}
                    dateFormat="dd MMM yyyy"
                    datePlaceholder="Date"
                    timePlaceholder="Time"
                    disabled={
                      testStatus === 'Live' && drawerType === 'edit'
                        ? true
                        : false
                    }
                  ></DateTimePickers>
                </div>
              </div>
              <label className="">Select Due Date</label>
              <div className="calendarDate">
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
                  ></DateTimePickers>
                </div>
              </div>
            </div>
            {drawerType !== 'edit' ? (
              <ul>
                <li className={getClassNameSelAll()}>
                  <h3>Batches</h3>
                  <span>
                    Select All
                    <Checkbox
                      checked={selectAllBatches}
                      color="primary"
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                      onClick={() => handleSelectAllClick()}
                    />
                  </span>
                </li>
                {batchesList && batchesList.length > 0
                  ? batchesList.map((data: any, index: number) => (
                      <li className={getClassNameBatch(data)} key={index}>
                        {data.name}
                        <span>
                          {data.alreadyAssigned ? (
                            <i>Already assigned</i>
                          ) : null}
                          <Checkbox
                            checked={selectedBatchesList.includes(data.id)}
                            color="primary"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                            onClick={() => handleBatchClick(index)}
                          />
                        </span>
                      </li>
                    ))
                  : null}
              </ul>
            ) : null}
          </div>
          <div className={classesName.drawerfooter}>
            <Button
              variant="outlined"
              color="primary"
              style={{ width: '150px' }}
              onClick={handleClearTimeslotSelection}
            >
              Cancel
            </Button>
            <Button
              disabled={validateDateRange(
                assignmentStartDate?.date,
                assignmentEndDate?.date,
              )}
              onClick={handleTestAssignReviewEvent}
              variant="contained"
              color="primary"
              style={{ width: '150px' }}
            >
              {drawerType === 'edit' ? 'Update' : 'Submit'}
            </Button>
          </div>
        </div>
      </TabPanel>
      <SimpleSnackbar
        mode="error"
        onClose={handleOnClose}
        state={fillAllDataError ? true : false}
        message={fillAllDataError}
        autoHideDuration={3000}
      />
    </Drawer>
  );
}
