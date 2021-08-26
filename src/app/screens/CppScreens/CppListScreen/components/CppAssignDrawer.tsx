import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Button,
  Checkbox,
  Divider,
  Drawer,
  CircularProgress,
} from '@material-ui/core';
import DateTimePickers from '../../../../components/common/date-time-picker';
import { useStyles } from '../styles';
import SimpleSnackbar from 'app/components/common/snackbar.component';
import { result } from 'lodash';
import { assignAssignment } from 'app/helpers/private.api.helper';
import { isLoading, getColorCode } from 'app/helpers/comman.helper';
import LoaderWrapper from 'app/components/common/loader.wrapper.component';

interface ICppAssignDrawer {
  openDrawer: any;
  handleClose: any;
  batchSummary: any;
  batchStudentList: any;
  fetchBatchStudentList: any;
  test: any;
  // cppAssignTest: any;
  cppSnackbarEmitter: any;
  handleTestAssignReview: any;
  assignmentHistory: any[];
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

export default function CppAssignDrawer({
  openDrawer,
  batchSummary,
  batchStudentList,
  fetchBatchStudentList,
  test,
  // cppAssignTest,
  cppSnackbarEmitter,
  handleClose,
  handleTestAssignReview,
  assignmentHistory,
}: ICppAssignDrawer) {
  // const [openDrawer, setOpenDrawer] = useState(false);

  const [lastTabIndex, setLastTabIndex] = useState(0);
  const [currenTabIndex, setCurrentTabIndex] = useState(0);
  const [selectedBatch, setSelectedBatch] = useState<any>({});
  const [selectedBatchList, setSelectedBatchList] = useState<string[]>([]);
  // const [selectedStudentList, setSelectedStudentList] = useState<any[]>([]);
  const [
    selectedBatchWiseStudentList,
    setSelectedBatchWiseStudentList,
  ] = useState<any>({});
  const [assignmentStartDate, setAssignmentStartDate] = useState<any>();
  const [assignmentEndDate, setAssignmentEndDate] = useState<any>();

  const classes = useStyles();
  const { settings: { duration = 0 } = {}, _id: testId } = test;
  let assignmentHistoryArray = assignmentHistory[testId]
    ? assignmentHistory[testId]
    : [];

  const handleStudentListView = (batchId: string) => {
    const batch = batchSummary.data.batches.find(
      ({ id }: any) => id === batchId,
    );

    setSelectedBatch(batch);
    fetchBatchStudentList({ batchId, testId: test._id });
    setCurrentTabIndex(1);

    const students = selectedBatchWiseStudentList[batchId] || [];
    setSelectedBatchWiseStudentList({
      ...selectedBatchWiseStudentList,
      [batchId]: students,
    });
  };

  const handleBatchSelection = (e: any, batchId: string) => {
    if (e.target.checked && !selectedBatchList.includes(batchId)) {
      setSelectedBatchList([...selectedBatchList, batchId]);
    } else {
      setSelectedBatchList(selectedBatchList.filter(id => id !== batchId));
      setSelectedBatchWiseStudentList({
        ...selectedBatchWiseStudentList,
        [batchId]: [],
      });
    }
  };

  const handleBatchSelectAll = (e: any) => {
    if (e.target.checked) {
      const ids = batchSummary.data.batches
        .filter(
          ({ noOfStudent, testData }: any) =>
            noOfStudent - testData.uniqueStudentsWithActiveAssignment > 0,
        )
        .map(({ id }: any) => id);
      setSelectedBatchList(ids);
    } else {
      setSelectedBatchList([]);
    }
  };

  const handleStudentSelection = (e: any, userId: any) => {
    let students = selectedBatchWiseStudentList[selectedBatch.id];

    if (e.target.checked && !students.includes(userId)) {
      students.push(userId);
      setSelectedBatchWiseStudentList({
        ...selectedBatchWiseStudentList,
        [selectedBatch.id]: students,
      });
    } else {
      students = students.filter((id: any) => id !== userId);
      setSelectedBatchWiseStudentList({
        ...selectedBatchWiseStudentList,
        [selectedBatch.id]: students,
      });
    }
  };

  const handleStudentSelectAll = (e: any) => {
    if (e.target.checked) {
      const all = batchStudentList.data.students
        .filter(
          ({ assignments }: any) => !isStudentAlreadyAssigned(assignments),
        )
        .map(({ userId }: any) => userId);
      setSelectedBatchWiseStudentList({
        ...selectedBatchWiseStudentList,
        [selectedBatch.id]: all,
      });
    } else {
      setSelectedBatchWiseStudentList({
        ...selectedBatchWiseStudentList,
        [selectedBatch.id]: [],
      });
    }
  };

  useEffect(() => {
    if (
      !isLoading(batchStudentList.apiState) &&
      batchStudentList?.data?.students &&
      !selectedBatchWiseStudentList[selectedBatch.id]?.length
    ) {
      handleStudentSelectAll({ target: { checked: true } });
    }
  }, [batchStudentList, selectedBatch]);

  useEffect(() => {
    if (!isLoading(batchSummary.apiState) && batchSummary?.data?.batches) {
      setCurrentTabIndex(0);
      handleResetBatchSelections();
    }
  }, [batchSummary]);

  const handleTestAssignReviewEvent = () => {
    const { _id: testId, name: testName, testType: type } = test;
    const batchStudentEntries: any[] = Object.entries<any[]>(
      selectedBatchWiseStudentList,
    )
      .map(([batchId, studentIds]) =>
        studentIds.map(studentId => ({ id: studentId, batchId })),
      )
      .reduce((a, b) => [...a, ...b], []);

    const batchIdsInStudents = Array.from(
      new Set([...batchStudentEntries.map(({ batchId }: any) => batchId)]),
    );

    const payload = {
      batches: selectedBatchList.filter(id => !batchIdsInStudents.includes(id)),
      students: batchStudentEntries,
      test: { testId, testName, type },
      assignedDate: new Date(assignmentStartDate.date).toISOString(),
      dueDate: new Date(assignmentEndDate.date).toISOString(),
    };
    // Dispatching action
    handleTestAssignReview(payload);
  };

  const handleAssignmentStartDateSelect = (value: any) => {
    const now = new Date().getTime();
    const startDate = new Date(value.date).getTime();
    const diff = (startDate - now) / (1000 * 60);
    if (diff < 5 && value.picker === 'date') {
      const finalTime = now + 5 * 1000 * 60;
      setAssignmentStartDate({ ...value, date: new Date(finalTime) });
      return;
    }
    setAssignmentStartDate(value);

    if (!validStartDate(value.date)) {
      cppSnackbarEmitter({
        type: 'error',
        message: `Start time cannot be a past value`,
        show: true,
      });
      return;
    }

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

  const validStartDate = (start: any) => {
    if (!start) return false;
    const now = new Date().getTime();
    if (new Date(start).getTime() < now) {
      return false;
    }
    return true;
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

  const navigateToTimeslotSelection = (lastTabIndex: number) => {
    setLastTabIndex(lastTabIndex);
    setCurrentTabIndex(2);
  };

  const handleResetStudentSelections = () => {
    setSelectedBatchWiseStudentList({
      ...selectedBatchWiseStudentList,
      [selectedBatch.id]: [],
    });
  };

  const handleResetBatchSelections = () => {
    setSelectedBatchWiseStudentList({});
    setSelectedBatchList([]);
  };

  const handleClearTimeslotSelection = () => {
    setAssignmentStartDate(null);
    setAssignmentEndDate(null);
  };

  const handleCloseEvent = () => {
    setCurrentTabIndex(0);
    handleClose();
  };

  const filterOutOngoingAssignments = (assignment: any) => {
    const currentDate = new Date();
    const dueDate = new Date(assignment.dueDate);
    if (currentDate > dueDate) {
      return false;
    }
    return true;
  };

  assignmentHistoryArray = assignmentHistoryArray.filter(
    filterOutOngoingAssignments,
  );
  let activeAssignmentIds = assignmentHistoryArray.map(({ _id }: any) => _id);

  const isStudentAlreadyAssigned = (assignments: any[]) => {
    const result = assignments.find(({ assignmentId }: any) =>
      activeAssignmentIds.includes(assignmentId),
    );
    return !(result === undefined);
  };

  const isSelectAllBatchesButtonDisabled = () => {
    const total = batchSummary?.data?.batches
      .map(
        ({ noOfStudent, testData }: any) =>
          noOfStudent - testData.uniqueStudentsWithActiveAssignment,
      )
      .reduce((a: number, b: number) => a + b, 0);
    return !(total > 0);
  };

  return (
    <Drawer anchor="right" open={openDrawer} onClose={handleCloseEvent}>
      <TabPanel value={currenTabIndex} index={0}>
        <div
          className={classes.drawerList}
          role="presentation"
          // onClick={toggleDrawer(anchor, false)}
          // onKeyDown={toggleDrawer(anchor, false)}
        >
          <div className={classes.drawerHeader}>
            Select Batch(es)
            <button className="closeButton" onClick={handleCloseEvent}>
              <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/cross-mark.svg" />
            </button>
          </div>
          <Divider />
          <LoaderWrapper isLoading={isLoading(batchSummary.apiState)}>
            <div className={classes.drawerBody}>
              <ul className="batchList">
                <li>
                  <div className="batchname">
                    <span className="selectAllText">
                      Selected Batch(es) ( {selectedBatchList.length}/
                      {batchSummary?.data?.batches.length} )
                    </span>
                    <span>
                      Select All
                      <Checkbox
                        checked={
                          batchSummary?.data?.batches.filter(
                            ({ noOfStudent, testData }: any) =>
                              noOfStudent -
                                testData.uniqueStudentsWithActiveAssignment >
                              0,
                          ).length === selectedBatchList.length
                        }
                        onChange={handleBatchSelectAll}
                        edge="end"
                        disabled={isSelectAllBatchesButtonDisabled()}
                      />
                    </span>
                  </div>
                </li>

                {batchSummary?.data?.batches.map(
                  ({ id, name, noOfStudent, testData }: any) => (
                    <li key={id}>
                      <div className="batchname">
                        <span className="batchnameText">{name}</span>
                        <span>
                          <Checkbox
                            checked={selectedBatchList.includes(id)}
                            onChange={e => handleBatchSelection(e, id)}
                            edge="end"
                            disabled={
                              noOfStudent -
                                testData.uniqueStudentsWithActiveAssignment ===
                              0
                            }
                          />
                        </span>
                      </div>
                      <div className="batchname">
                        {!selectedBatchList.includes(id) &&
                          (noOfStudent -
                            testData.uniqueStudentsWithActiveAssignment >
                          0 ? (
                            <span className="studentCount">
                              Total Students : {noOfStudent}
                            </span>
                          ) : (
                            <span className="studentCount">
                              Already Assigned :{' '}
                              {testData.uniqueStudentsWithActiveAssignment}/
                              {noOfStudent}
                            </span>
                          ))}
                        {selectedBatchList.includes(id) && (
                          <span className="studentCount">
                            Selected Students :{' '}
                            {selectedBatchWiseStudentList[id]?.length ||
                              noOfStudent -
                                testData.uniqueStudentsWithActiveAssignment}
                            /{noOfStudent}
                          </span>
                        )}
                        <Button
                          variant="text"
                          onClick={() => handleStudentListView(id)}
                          className="studentList"
                          disabled={!selectedBatchList.includes(id)}
                          style={{
                            cursor: selectedBatchList.includes(id)
                              ? 'pointer'
                              : 'not-allowed',
                            opacity: selectedBatchList.includes(id)
                              ? '1'
                              : '0.6',
                          }}
                        >
                          Students List
                          <svg
                            width="9"
                            height="14"
                            viewBox="0 0 9 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1 1L7 7L1 13"
                              stroke="#1D7DEA"
                              strokeWidth="2"
                            />
                          </svg>
                        </Button>
                      </div>
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div className={classes.drawerfooter}>
              <Button
                variant="outlined"
                color="primary"
                style={{ width: '150px' }}
                onClick={handleResetBatchSelections}
              >
                Reset
              </Button>
              <Button
                disabled={selectedBatchList.length === 0}
                onClick={() => navigateToTimeslotSelection(0)}
                variant="contained"
                color="primary"
                style={{ width: '150px' }}
              >
                Next
              </Button>
            </div>
          </LoaderWrapper>
        </div>
      </TabPanel>
      <TabPanel value={currenTabIndex} index={1}>
        <div
          className={classes.drawerList}
          role="presentation"
          // onClick={toggleDrawer(anchor, false)}
          // onKeyDown={toggleDrawer(anchor, false)}
        >
          <div className={classes.drawerHeader}>
            <button className="backIcon" onClick={() => setCurrentTabIndex(0)}>
              <svg
                width="25"
                height="20"
                viewBox="0 0 25 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.0885 0.546753L13.8366 3.45334L9.02755 8.00005H24.001V12H9.02755L13.8366 16.5468L11.0885 19.4533L1.08984 10L11.0885 0.546753Z"
                  fill="#666666"
                />
              </svg>
            </button>
            Student List ({selectedBatch?.name})
          </div>
          <Divider />

          <LoaderWrapper isLoading={isLoading(batchStudentList.apiState)}>
            <div className={classes.drawerBody}>
              <ul className="batchList">
                <li>
                  <div className="batchname">
                    <span className="selectAllText">
                      Selected Students ({' '}
                      {selectedBatchWiseStudentList[selectedBatch.id]?.length}/
                      {batchStudentList?.data?.students.length || '-'} )
                    </span>
                    <span>
                      Select All
                      <Checkbox
                        checked={
                          selectedBatchWiseStudentList[selectedBatch.id]
                            ?.length ===
                          batchStudentList?.data?.students.filter(
                            ({ assignments }: any) =>
                              !isStudentAlreadyAssigned(assignments),
                          ).length
                        }
                        onChange={handleStudentSelectAll}
                        edge="end"
                      />
                    </span>
                  </div>
                </li>
                {/*               
                <li className="studentListContainer">
                  <div className="studentName">
                    <div>
                      <Avatar>Q</Avatar>
                    </div>
                    <div>
                      <h4>Jainendra Rai</h4>
                      <p>ID - 500047537</p>
                    </div>
                  </div>

                  <div>
                    <i>Already Assigned</i>
                  </div>
                </li> */}

                {batchStudentList?.data?.students.map(
                  ({
                    name,
                    attempted,
                    userId,
                    enrollmentNo,
                    assignments,
                  }: any) => (
                    <li key={userId} className="studentListContainer">
                      <div className="studentName">
                        <div>
                          <Avatar
                            style={{
                              background: getColorCode(name[0].toLowerCase()),
                            }}
                          >
                            {name[0]}
                          </Avatar>
                        </div>
                        <div>
                          <h4>{name}</h4>
                          <p>ID - {enrollmentNo}</p>
                        </div>
                      </div>

                      {!isStudentAlreadyAssigned(assignments) ? (
                        <div>
                          <Checkbox
                            checked={selectedBatchWiseStudentList[
                              selectedBatch.id
                            ]?.includes(userId)}
                            onChange={e => handleStudentSelection(e, userId)}
                            edge="end"
                          />
                        </div>
                      ) : (
                        <div>
                          <i>Already Assigned</i>
                        </div>
                      )}
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div className={classes.drawerfooter}>
              <Button
                variant="outlined"
                color="primary"
                style={{ width: '150px' }}
                onClick={handleResetStudentSelections}
              >
                Reset
              </Button>
              <Button
                onClick={() => navigateToTimeslotSelection(1)}
                variant="contained"
                color="primary"
                style={{ width: '150px' }}
                disabled={
                  selectedBatchWiseStudentList[selectedBatch.id]?.length === 0
                }
              >
                Done
              </Button>
            </div>
          </LoaderWrapper>
        </div>
      </TabPanel>
      <TabPanel value={currenTabIndex} index={2}>
        <div
          className={classes.drawerList}
          role="presentation"
          // onClick={toggleDrawer(anchor, false)}
          // onKeyDown={toggleDrawer(anchor, false)}
        >
          <div className={classes.drawerHeader}>
            <button
              className="backIcon"
              onClick={() => setCurrentTabIndex(lastTabIndex)}
            >
              <svg
                width="25"
                height="20"
                viewBox="0 0 25 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.0885 0.546753L13.8366 3.45334L9.02755 8.00005H24.001V12H9.02755L13.8366 16.5468L11.0885 19.4533L1.08984 10L11.0885 0.546753Z"
                  fill="#666666"
                />
              </svg>
            </button>
            Select Dates
            <button className="closeButton" onClick={handleCloseEvent}>
              <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/cross-mark.svg" />
            </button>
          </div>
          <Divider />
          <div className={classes.drawerBody}>
            <div className="marginBottom">
              <label>Select Start Date</label>
              <div className="calenderDate">
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
                    disablePast={true}
                    disableFuture={false}
                    dateFormat="dd MMM yyyy"
                    datePlaceholder="Date"
                    timePlaceholder="Time"
                  ></DateTimePickers>
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
                  ></DateTimePickers>
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
                ) || !validStartDate(assignmentStartDate?.date)
              }
              onClick={handleTestAssignReviewEvent}
              variant="contained"
              color="primary"
              style={{ width: '150px' }}
            >
              Assign
            </Button>
          </div>
        </div>
      </TabPanel>
    </Drawer>
  );
}
