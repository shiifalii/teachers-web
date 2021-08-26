import React, { useState } from 'react';
import { EmptyState } from 'app/components/common/emptyState.component';
import LoaderWrapper from 'app/components/common/loader.wrapper.component';
import { isLoading } from 'app/helpers/comman.helper';
import ActionDialog from './ActionDialog';
import BatchStudentListDialog from './BatchStudentListDialog';
import CppAssignDrawer from './CppAssignDrawer';
import CppDetailDialog from './CppDetailDialog';
import CppEditDrawer from './CppEditDrawer';
import CppListItem from './CppListItem';
import { useStyles } from '../styles';
import {
  updateAssignment,
  duplicateTheTest,
  deleteTheTest,
  assignAssignment,
} from 'app/helpers/private.api.helper';
import {
  formatDateDDMMYYYY,
  getFormattedTime,
  formatDateWithMonthName,
} from 'app/helpers/date-time.helper';
import { getUserNameFromStorage } from 'app/helpers/local.storage.helper';
import { CircularProgress } from '@material-ui/core';

export default function CppList({
  cppTests,
  fetchAssignmentData,
  assignmentHistory,
  fetchStudentsData,
  studentsList,
  batchSummary,
  batchStudentList,
  fetchBatchStudentList,
  // cppAssignTest,
  fetchCppTestDetails,
  cppTestDetail,
  fetchCppTests,
  cppSnackbarEmitter,
  selectedGoalSubject,
  fetchBatchSummary,
}: any) {
  const classes = useStyles();

  const [showStudentList, setShowStudentList] = useState(false);
  // const [showStudentList, setShowStudentList] = useState(false);
  const [showCppDetailDialog, setShowCppDetailDialog] = useState(false);
  const [openCppAssignDrawer, setOpenCppAssignDrawer] = useState(false);
  const [cppDrawerAssignType, setCppDrawerAssignType] = useState('new');
  const [openCppEditDrawer, setOpenCppEditDrawer] = useState(false);
  const [actionDialogSettings, setActionDialogSettings] = useState<any>({
    show: false,
    type: '',
    body: '',
  });
  const [selectedTest, setSelectedTest] = useState<any>({});
  const [selectedAssignment, setSelectedAssignment] = useState<any>({});

  const teacherName = getUserNameFromStorage();

  let dataToIterate: any = cppTests && cppTests.data && cppTests.data.tests;
  if (dataToIterate && dataToIterate.length > 0) {
    dataToIterate = dataToIterate.filter((thing: any, index: any) => {
      const _thing = JSON.stringify(thing);
      return (
        index ===
        dataToIterate.findIndex((obj: any) => {
          return JSON.stringify(obj) === _thing;
        })
      );
    });
  }

  const fetchStudentListData = (id: string) => {
    fetchStudentsData(id);
    setShowStudentList(true);
  };

  const fetchCppTestDetailsParent = (id: string) => {
    fetchCppTestDetails(id);
  };

  // Refactoring files new code
  // List item callback starts here
  // 1. Assign button click event
  const handleCppAssignEvent = (test: any, assignType: string) => {
    fetchBatchSummary({
      subject: selectedGoalSubject.subjectId,
      targetExam: selectedGoalSubject.goalId,
      testId: test._id,
    });
    fetchAssignmentData(test._id);
    setCppDrawerAssignType(assignType);
    setSelectedTest(test);
    setOpenCppAssignDrawer(true);
  };

  // 2. Edit button click event
  const handleAssessmentEditEvent = (assignment: any) => {
    setSelectedAssignment(assignment);
    setOpenCppEditDrawer(true);
  };

  // 3. Duplicate button click event
  const handleCppDuplicateEvent = (testId: string) => {
    duplicateTheTest({ id: testId }).then((res: any) => {
      if (res && res.data && res.data.code === 200) {
        cppSnackbarEmitter({
          type: 'success',
          message: res.data.message,
          show: true,
        });
        fetchCppTests();
      }
    });
  };

  // 4. Delete CPP/Test button click event
  const handleCppDeleteEvent = (test: any) => {
    setSelectedTest(test);
    setActionDialogSettings({
      type: test.assignmentAssigned > 0 ? 'nodelete' : 'delete',
      show: true,
    });
  };

  // 5. Cpp details event button click
  const handleShowCppDetailsEvent = (testId: string) => {
    fetchCppTestDetails(testId);
    setShowCppDetailDialog(true);
  };

  // 6. Cpp assignment view student list button click
  const handleAssignmentStudentListPreviewEvent = (assignmentId: string) => {
    fetchStudentListData(assignmentId);
    setShowStudentList(true);
  };

  // 7. Toggle button events
  const handleAssignmentToggleButtonEvent = (newState: boolean) => {
    if (newState) {
      // Handle New assign Drawer events
      // Already handled
    } else {
      // Show the warning dialog
      // !!!!!!!!!!!!!!!!! Not found dialog (design)
      setActionDialogSettings({
        type: 'cpp-unassign-all',
        show: true,
      });
    }
  };
  // List item callback ends here

  // 8. New Assign Drawer Review Confirmation
  const handleTestAssignReview = (payload: any) => {
    const distinctBatches = new Set(
      payload.students.map((item: any) => item.batchId),
    );
    payload.batches.forEach((batchId: string) => distinctBatches.add(batchId));
    setOpenCppAssignDrawer(false);

    if (cppDrawerAssignType === 'new') {
      setActionDialogSettings({
        type: 'cpp-assign-review',
        show: true,
        body: `Test ${
          selectedTest.name
        } is scheduled from ${formatDateWithMonthName(
          payload.assignedDate,
        )} at ${getFormattedTime(payload.assignedDate)} to 
          ${formatDateWithMonthName(payload.dueDate)} at ${getFormattedTime(
          payload.dueDate,
        )} and assigned to ${payload.students.length} Students in ${
          distinctBatches.size
        } batches.`,
        payload,
      });
    } else if (cppDrawerAssignType === 're-assign') {
      setActionDialogSettings({
        type: 'cpp-reassign-review',
        show: true,
        body: `Test ${
          selectedTest.name
        } is scheduled from ${formatDateWithMonthName(
          payload.assignedDate,
        )} at ${getFormattedTime(payload.assignedDate)} to 
          ${formatDateWithMonthName(payload.dueDate)} at ${getFormattedTime(
          payload.dueDate,
        )} and assigned to ${payload.students.length} Students in ${
          distinctBatches.size
        } batches.`,
        payload,
      });
    }
  };

  // 9. Assignment edit drawer submmision
  const handleAssignmentUpdate = (payload: any) => {
    updateAssignment(payload).then((res: any) => {
      if (res && res.data && res.data.code === 200) {
        // cppSnackbarEmitter({
        //   type: 'success',
        //   message: res.data.message,
        //   show: true,
        // });
        // handleEditSuccess();
        setActionDialogSettings({
          show: true,
          type: 'assignment-update-success',
        });
        fetchAssignmentData(selectedTest._id);
        setOpenCppEditDrawer(false);
      } else {
        cppSnackbarEmitter({
          type: 'error',
          message: res.data.message,
          show: true,
        });
      }
    });
  };

  // 10. Dialog action button left
  const handleActionButtonLeft = (actionType: any) => {
    if (actionType === 'cpp-assign-review') {
      setActionDialogSettings({ ...actionDialogSettings, show: false });
      setOpenCppAssignDrawer(true);
    }
  };

  // 11.  Dialog action button right
  const handleActionButtonRight = (actionType: string, payload: any = {}) => {
    if (actionType === 'delete') {
      deleteTheTest({ id: selectedTest._id }).then((res: any) => {
        if (res && res.data && res.data.code === 200) {
          setActionDialogSettings({ type: '', show: false });
          cppSnackbarEmitter({
            type: 'success',
            message: 'Test deleted successfully',
            show: true,
          });
          fetchCppTests();
        }
      });
    } else if (
      actionType === 'cpp-assign-review' ||
      actionType === 'cpp-reassign-review'
    ) {
      // Assign confirm action in here
      assignAssignment({
        ...payload,
        courseId: selectedGoalSubject.goal._id,
        teacher: { teacherName },
      }).then((res: any) => {
        if (res && res.data && res.data.code === 200) {
          setActionDialogSettings({
            type: 'cpp-assign-success',
            show: true,
          });
          fetchCppTestDetailsParent(selectedTest._id);
          fetchAssignmentData(selectedTest._id);
        } else {
          cppSnackbarEmitter({
            type: 'error',
            message: res.data.message,
            show: true,
          });
        }
      });
    }
  };

  return (
    <div>
      <LoaderWrapper
        isLoading={isLoading(cppTests.apiState) && !dataToIterate?.length}
      >
        {dataToIterate && dataToIterate.length === 0 && <EmptyState />}
        {dataToIterate &&
          dataToIterate.map((test: any) => (
            <CppListItem
              key={test._id}
              test={test}
              fetchAssignment={() => fetchAssignmentData(test._id)}
              assignmentHistory={assignmentHistory}
              fetchStudentList={fetchStudentListData}
              handleCppAssignEvent={handleCppAssignEvent}
              handleAssessmentEditEvent={handleAssessmentEditEvent}
              handleCppDuplicateEvent={handleCppDuplicateEvent}
              handleCppDeleteEvent={handleCppDeleteEvent}
              handleShowCppDetailsEvent={handleShowCppDetailsEvent}
              handleAssignmentStudentListPreviewEvent={
                handleAssignmentStudentListPreviewEvent
              }
              handleAssignmentToggleButtonEvent={
                handleAssignmentToggleButtonEvent
              }
            />
          ))}
      </LoaderWrapper>
      {isLoading(cppTests.apiState) && !!dataToIterate?.length && (
        <div className={classes.circularProgressBarContainer}>
          <CircularProgress />
        </div>
      )}

      {/* Drawers */}
      <CppAssignDrawer
        test={selectedTest}
        batchSummary={batchSummary}
        openDrawer={openCppAssignDrawer}
        batchStudentList={batchStudentList}
        fetchBatchStudentList={fetchBatchStudentList}
        // cppAssignTest={cppAssignTest}
        assignmentHistory={assignmentHistory.data}
        cppSnackbarEmitter={cppSnackbarEmitter}
        handleClose={() => setOpenCppAssignDrawer(false)}
        handleTestAssignReview={handleTestAssignReview} // To be done
      />

      <CppEditDrawer
        openDrawer={selectedAssignment && openCppEditDrawer}
        assignment={selectedAssignment}
        duration={selectedTest?.settings?.duration}
        cppSnackbarEmitter={cppSnackbarEmitter}
        handleAssignmentUpdateEvent={handleAssignmentUpdate}
        handleClose={() => setOpenCppEditDrawer(false)}
      />

      {/* Dialogs */}
      <BatchStudentListDialog
        open={showStudentList}
        dataPassed={studentsList}
        onClose={() => setShowStudentList(false)}
      />
      <CppDetailDialog
        open={showCppDetailDialog}
        dataPassed={cppTestDetail}
        onClose={() => setShowCppDetailDialog(false)}
      />

      <ActionDialog
        type={actionDialogSettings.type}
        open={actionDialogSettings.show}
        dialogBody={actionDialogSettings.body}
        payload={actionDialogSettings.payload}
        onClose={() => setActionDialogSettings({ type: '', show: false })}
        handleActionButtonLeft={handleActionButtonLeft}
        handleActionButtonRight={handleActionButtonRight}
      />
    </div>
  );
}
