import { createAction } from '@reduxjs/toolkit';
import {
  FETCH_ASSIGNED_CPP_TEST_COUNT,
  FETCH_ASSIGNED_CPP_TEST_LIST,
  FETCH_STUDENT_LIST,
  FETCH_STUDENT_SUMMARY,
  ANNOTATED_PDF,
  ASSIGNED_MARKS,
  RESET_UNSAVED_CHANGES,
  SYNC_EVALUATION,
  SUBMIT_EVALUATION,
  FETCH_TEACHERS_PDF,
  INITIALISE_PDF_SKETCH,
  ZOOM_IN,
  ZOOM_OUT,
  UNDO,
  REDO,
  LOAD_PDF_PAGES,
  MODIFY_PDF_PAGE,
  NAVIGATE_TO_PDF_PAGE,
  STORE_SNAPSHOT_OF_CURRENT_PDP_PAGE,
  NAVIGATE,
  SET_SKETCH_TOOL,
  CLEAR_PDF_PAGE,
  MODIFY_SCALE,
  RESPONSE_MESSAGES,
  FETCH_PDF_AND_LOAD_PAGES,
  MODIFY_ORIGINAL_QUESTIONS,
  TOGGLE_SUBMIT_SUMMARY,
  SET_SUBMIT_SUMMARY,
  TOGGLE_FULL_SCREEN,
} from './assessments.actionTypes';

function createGenericAction(actionType: string) {
  return createAction(actionType, function prepare(payload) {
    return {
      payload,
    };
  });
}

export const fetchAssignedCPPTestCount = createGenericAction(
  FETCH_ASSIGNED_CPP_TEST_COUNT,
);

export const fetchAssignedCPPTestList = createGenericAction(
  FETCH_ASSIGNED_CPP_TEST_LIST,
);

export const loadResponseMessages = createGenericAction(RESPONSE_MESSAGES);

export const fetchStudentList = createGenericAction(FETCH_STUDENT_LIST);

export const fetchStudentSummary = createGenericAction(FETCH_STUDENT_SUMMARY);

export const marksAssigned = createGenericAction(ASSIGNED_MARKS);

export const modifyOriginalQuestions = createGenericAction(
  MODIFY_ORIGINAL_QUESTIONS,
);

export const pdfModified = createAction(ANNOTATED_PDF);

export const resetUnsavedChanges = createAction(RESET_UNSAVED_CHANGES);

export const syncEvaluation = createAction(SYNC_EVALUATION);

export const submitEvaluation = createGenericAction(SUBMIT_EVALUATION);

export const fetchTeachersPDF = createGenericAction(FETCH_TEACHERS_PDF);

export const toggleSubmitSummary = createGenericAction(TOGGLE_SUBMIT_SUMMARY);
export const setSubmitSummaryFlag = createGenericAction(SET_SUBMIT_SUMMARY);

// PDF Sketch related actions

export const inititalisePDFSketch = createGenericAction(INITIALISE_PDF_SKETCH);

export const setSketchTool = createGenericAction(SET_SKETCH_TOOL);

export const toggleFullScreen = createAction(TOGGLE_FULL_SCREEN);

export const fetchPdfAndLoadPages = createGenericAction(
  FETCH_PDF_AND_LOAD_PAGES,
);

export const loadPdfPages = createGenericAction(LOAD_PDF_PAGES);

export const modifyPdfPage = createGenericAction(MODIFY_PDF_PAGE);

export const zoomIn = createGenericAction(ZOOM_IN);

export const zoomOut = createGenericAction(ZOOM_OUT);

export const undo = createGenericAction(UNDO);

export const redo = createGenericAction(REDO);

export const navigateToPdfPage = createGenericAction(NAVIGATE_TO_PDF_PAGE);

export const navigate = createGenericAction(NAVIGATE);

export const storeCurrentPDFPage = createGenericAction(
  STORE_SNAPSHOT_OF_CURRENT_PDP_PAGE,
);

export const clearPDFPage = createGenericAction(CLEAR_PDF_PAGE);

export const modifyScale = createGenericAction(MODIFY_SCALE);
