import PDFWorker from 'app/workers';
import { pdfjs } from 'react-pdf';
import {
  takeEvery,
  takeLatest,
  select,
  put,
  call,
  delay,
} from 'redux-saga/effects';
import {
  FETCH_ASSIGNED_CPP_TEST_COUNT,
  FETCH_ASSIGNED_CPP_TEST_LIST,
  FETCH_STUDENT_LIST,
  FETCH_STUDENT_SUMMARY,
  SYNC_EVALUATION,
  SUBMIT_EVALUATION,
  FETCH_TEACHERS_PDF,
  NAVIGATE,
  ZOOM_IN,
  ZOOM_OUT,
  UNDO,
  REDO,
  FETCH_PDF_AND_LOAD_PAGES,
  TOGGLE_SUBMIT_SUMMARY,
} from './assessments.actionTypes';
import createAPISaga from 'app/helpers/sagas.helper';
import {
  testListReducerName,
  assignedTestCountReducerName,
  studentListReducerName,
  studentSummaryReducerName,
  teachersPdfReducerName,
  submitEvaluationReducerName,
  submitEvaluationActions,
} from './assessments.reducer';
import {
  getCPPTestCount,
  getCPPTestList,
  getStudentListByAssignmentId,
  getStudentSummaryByAttemptId,
  syncEvaluationOfStudent,
  submitEvaluationOfStudent,
  fetchTeachersPDF,
} from 'app/helpers/private.api.helper';
import {
  modifyPdfPage,
  navigateToPdfPage,
  resetUnsavedChanges,
  modifyScale,
  submitEvaluation,
  loadResponseMessages,
  loadPdfPages,
  inititalisePDFSketch,
  modifyOriginalQuestions,
  setSubmitSummaryFlag,
} from './assessments.actions';
import { asyncDelay } from 'app/helpers/comman.helper';

const CreatePDFWorker = new PDFWorker();

// For Assigned CPP Test lists and count

const fetchAssignedCPPTestCountSaga = createAPISaga(
  assignedTestCountReducerName,
);

function* fetchAssignedCPPTestCount({ type, payload }: any) {
  try {
    yield fetchAssignedCPPTestCountSaga(
      getCPPTestCount,
      payload,
      ({ data }: any) => data,
    );
  } catch (error) {
    console.log(error);
  }
}

const fetchAssignedCPPTestListSaga = createAPISaga(testListReducerName);

function* fetchAssignedCPPTestList({ type, payload }: any) {
  try {
    yield fetchAssignedCPPTestListSaga(
      getCPPTestList,
      payload,
      ({ data }: any) => data,
    );
  } catch (error) {
    console.log(error);
  }
}

// For Student Listing per assignment

const fetchStudentListSaga = createAPISaga(studentListReducerName);

function* fetchStudentList({ type, payload }: any) {
  try {
    yield fetchStudentListSaga(
      getStudentListByAssignmentId,
      payload,
      ({ data }: any) => data,
    );
  } catch (error) {
    console.log(error);
  }
}

// For student summary by attemptId
const fetchStudentSummarySaga = createAPISaga(studentSummaryReducerName);

function* fetchStudentSummary({ type, payload }: any) {
  try {
    yield fetchStudentSummarySaga(
      getStudentSummaryByAttemptId,
      payload,
      ({ data }: any) => data,
    );
  } catch (error) {
    console.log(error);
  }
}

// For Test Evaluation

async function fetchPDFAndCreatePages(url: string) {
  const pdf = await pdfjs.getDocument(url).promise;
  const { numPages } = pdf;
  const canvas = document.createElement('canvas');
  const ctx: any = canvas.getContext('2d');
  const pages = [];
  // let scale = 0.8;
  // // update scale based on device width
  // if (window.matchMedia && window.matchMedia('(max-width: 768px)').matches) {
  //   scale = 0.5;
  // }
  for (let i = 1; i <= numPages; i++) {
    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 1 });
    const renderContext = { canvasContext: ctx, viewport: viewport };
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    await page.render(renderContext).promise;
    pages.push({
      data: canvas.toDataURL('image/jpeg', 1.0),
      aspectRatio: { height: canvas.height, width: canvas.width },
    });
    if (i === numPages) {
      canvas.remove();
    }
  }
  return pages;
}

function* fetchPdfAndLoadPagesSaga({ type, payload }: any) {
  try {
    const { unmodifiedPDFPages } = yield select(
      state => state.subjectiveAssessment.testEvaluation.data,
    );
    if (unmodifiedPDFPages.length === 0) {
      const { url } = payload;
      const pages = yield call(fetchPDFAndCreatePages, url);
      yield put(loadPdfPages(pages));
      yield put(inititalisePDFSketch({ currentPDFPageIndex: 0 }));
    }
  } catch (error) {
    console.log(error);
  }
}

function* syncEvaluation({ type, payload }: any) {
  try {
    const {
      data: { attemptId },
      toSubmit,
    } = payload;
    const { pdfAnnotated, unsavedQuestions } = yield select(
      state => state.subjectiveAssessment.testEvaluation.data,
    );
    if (toSubmit) {
      yield put(
        submitEvaluationActions[`${submitEvaluationReducerName}Loading`]({}),
      );
    }

    let syncRequestPayload: any = { attemptId };
    if (pdfAnnotated) {
      yield takeSnapShotOfCurrentPDFPageSaga();
      const pdf = yield combinePDFPagesSaga();
      syncRequestPayload.pdf = pdf;
    }
    if (unsavedQuestions.length > 0) {
      syncRequestPayload.questions = unsavedQuestions;
    }
    const response = yield call(syncEvaluationOfStudent, syncRequestPayload);
    yield put(loadResponseMessages(response.messages));
    if (toSubmit) {
      yield put(submitEvaluation({ data: { attemptId } }));
    }
    yield put(
      submitEvaluationActions[`${submitEvaluationReducerName}Init`]({}),
    );
    if (unsavedQuestions.length > 0) {
      yield put(modifyOriginalQuestions({ dirtyQuestions: unsavedQuestions }));
    }
    yield put(resetUnsavedChanges());
  } catch (error) {
    console.log(error);
  }
}

function* submitEvaluationSaga({ type, payload }: any) {
  try {
    const { data } = payload;
    yield call(submitEvaluationOfStudent, data);
    yield put(
      loadResponseMessages([
        'Teachers evaluation sheet submitted successfully',
      ]),
    );
    yield delay(1000);
    yield put(resetUnsavedChanges());
  } catch (error) {
    console.log(error);
    yield put(
      submitEvaluationActions[`${submitEvaluationReducerName}Error`](
        error.message,
      ),
    );
  }
}

const teachersPdfSaga = createAPISaga(teachersPdfReducerName);

function* fetchTeacherPDF({ type, payload }: any) {
  try {
    yield teachersPdfSaga(fetchTeachersPDF, payload, (data: any) => data);
  } catch (error) {
    console.log(error);
  }
}

// PDF Sketch related sagas

async function waitForPDF() {
  return new Promise(resolve => {
    CreatePDFWorker.onmessage = event => {
      resolve(event.data);
    };
  });
}

function scaleJSONData(jsonData: any, scale: number) {
  const { backgroundImage, objects } = jsonData;
  backgroundImage.scaleX = scale;
  backgroundImage.scaleY = scale;
  objects.forEach(({ scaleX, scaleY }: any) => {
    scaleX = scale;
    scaleY = scale;
  });
}

async function combinePDFPages({ pdfPages, ref }: any) {
  const data = [];
  for (let i = 0; i < pdfPages.length; i++) {
    const page = pdfPages[i];
    ref.clear();
    ref.setBackgroundFromDataUrl('');
    await asyncDelay(500);
    if (typeof page.data === 'string') {
      ref.setBackgroundFromDataUrl(page.data);
    } else {
      ref.fromJSON(page.data);
    }
    await asyncDelay(500);
    data.push(ref.toDataURL('image/jpeg', 1.0));
  }
  return data;
}

function* combinePDFPagesSaga() {
  const { pdfPages, sketchRef, hiddenSketchRef } = yield select(
    state => state.subjectiveAssessment.testEvaluation.data,
  );
  if (pdfPages.length > 0) {
    const data = yield call(combinePDFPages, {
      pdfPages,
      ref: hiddenSketchRef,
    });
    yield CreatePDFWorker.postMessage({
      pages: data,
      width: pdfPages[0].aspectRatio.width,
      height: pdfPages[0].aspectRatio.height,
    });
    const pdf = yield call(waitForPDF);
    return pdf;
  }
}

function* takeSnapShotOfCurrentPDFPageSaga() {
  const { sketchRef, currentPDFPageIndex, pdfPages, scales } = yield select(
    state => state.subjectiveAssessment.testEvaluation.data,
  );

  // yield sketchRef.setBackgroundFromDataUrl('');
  // yield sketchRef.setBackgroundFromDataUrl(pdfPages[currentPDFPageIndex].data, {
  //   scaleX: 1,
  //   scaleY: 1,
  // });
  yield sketchRef.zoom(1 / scales.scaleX);
  yield sketchRef._fc.setViewportTransform([1, 0, 0, 1, 0, 0]);
  const jsonData = yield sketchRef.toJSON();
  scaleJSONData(jsonData, 1);
  yield put(
    modifyPdfPage({
      index: currentPDFPageIndex,
      data: jsonData,
    }),
  );
}

function* navigateSaga({ type, payload }: any) {
  yield takeSnapShotOfCurrentPDFPageSaga();
  yield put(navigateToPdfPage(payload));
}

function* toggleSubmitSummarySaga({ type, payload }: any) {
  yield takeSnapShotOfCurrentPDFPageSaga();
  yield put(setSubmitSummaryFlag(payload));
}

function* sketchActionSaga({ type, payload }: any) {
  const { sketchRef, pdfPages, currentPDFPageIndex, scales } = yield select(
    state => state.subjectiveAssessment.testEvaluation.data,
  );
  let bgImage;
  if (typeof pdfPages[currentPDFPageIndex].data === 'string') {
    bgImage = pdfPages[currentPDFPageIndex].data;
  } else {
    bgImage = pdfPages[currentPDFPageIndex].data.backgroundImage.src;
  }
  switch (type) {
    case ZOOM_IN: {
      const val = 1.25;

      yield sketchRef.setBackgroundFromDataUrl('');
      yield sketchRef.setBackgroundFromDataUrl(bgImage, {
        scaleX: scales.scaleX * val,
        scaleY: scales.scaleY * val,
      });
      yield sketchRef.zoom(val);
      yield put(modifyScale(val));
      break;
    }
    case ZOOM_OUT: {
      const val = 0.8;
      yield sketchRef.setBackgroundFromDataUrl('');
      yield sketchRef.setBackgroundFromDataUrl(bgImage, {
        scaleX: scales.scaleX * val,
        scaleY: scales.scaleY * val,
      });
      yield sketchRef.zoom(val);
      yield put(modifyScale(val));
      break;
    }
    case UNDO: {
      yield sketchRef.undo();
      break;
    }
    case REDO: {
      yield sketchRef.redo();
      break;
    }
  }
}

export default [
  takeLatest(FETCH_ASSIGNED_CPP_TEST_COUNT, fetchAssignedCPPTestCount),
  takeLatest(FETCH_ASSIGNED_CPP_TEST_LIST, fetchAssignedCPPTestList),
  takeLatest(FETCH_STUDENT_LIST, fetchStudentList),
  takeLatest(FETCH_STUDENT_SUMMARY, fetchStudentSummary),
  takeLatest(SYNC_EVALUATION, syncEvaluation),
  takeLatest(SUBMIT_EVALUATION, submitEvaluationSaga),
  takeLatest(FETCH_TEACHERS_PDF, fetchTeacherPDF),
  takeEvery(NAVIGATE, navigateSaga),
  takeEvery([ZOOM_OUT, ZOOM_IN, UNDO, REDO], sketchActionSaga),
  takeLatest(FETCH_PDF_AND_LOAD_PAGES, fetchPdfAndLoadPagesSaga),
  takeLatest(TOGGLE_SUBMIT_SUMMARY, toggleSubmitSummarySaga),
];
