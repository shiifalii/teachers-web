import axios from 'axios';
import {
  createPrivateAxiosInstance,
  getPriorDateByDays,
} from './comman.helper';
import { API_AUTH_BASE_URL } from 'app/constants/config.constant';
import { LOGIN_TOKEN_KEY } from 'app/helpers/local.storage.helper';
import {
  getChaptersApiInterface,
  getConceptsApiInterface,
  getTestsApiParamsInterface,
  getTestDetailsApiParamsInterface,
  getNotificationsInterface,
  viewNotificationInterface,
  getTestAnalyticsApiParamsInterface,
  getStudentAuthTokenApiParamsInterface,
} from 'app/types/api.params.types';
import { AssignTestProps } from 'app/types/concept.screen.types';
import { BASE_URL } from 'app/constants/config.constant';

export async function getClasses() {
  const privateAxiosInstance = createPrivateAxiosInstance();
  return await privateAxiosInstance.get('batches');
}

export async function getNotifications(queryParams: getNotificationsInterface) {
  const { pageNo, limit } = queryParams;
  const privateAxiosInstance = createPrivateAxiosInstance();
  return await privateAxiosInstance.get(
    `users/notifications?page=${pageNo}&limit=${limit}`,
  );
}

export async function getUnreadNotificationCount() {
  const privateAxiosInstance = createPrivateAxiosInstance();
  return await privateAxiosInstance.get(
    `users/notifications?newNotificationCount=true&startDate=${getPriorDateByDays(
      15,
    ).toISOString()}`,
  );
}

export async function viewNotification(queryParams: viewNotificationInterface) {
  const { notificationId } = queryParams;
  const privateAxiosInstance = createPrivateAxiosInstance();
  return await privateAxiosInstance.post(
    `notifications/${notificationId}/view`,
  );
}

export async function getChapters(queryParams: getChaptersApiInterface) {
  const privateAxiosInstance = createPrivateAxiosInstance();
  const { subjectIds, batchId } = queryParams;
  return await privateAxiosInstance.get(
    `batches/${batchId}/syllabus/chapter?${subjectIds}&isNew=true`,
  );
}

export async function getStudents({
  subjectIds,
  batchId,
}: getChaptersApiInterface) {
  const privateAxiosInstance = createPrivateAxiosInstance();
  return await privateAxiosInstance.get(
    'batches/' + batchId + '/students?' + subjectIds,
  );
}

export async function getConcept({
  chapterIds,
  batchId,
}: getConceptsApiInterface) {
  const privateAxiosInstance = createPrivateAxiosInstance();
  return await privateAxiosInstance.get(
    'batches/' + batchId + '/syllabus/concept?' + chapterIds,
  );
}

export async function getTests({
  conceptIds,
  batchId,
  mode,
}: getTestsApiParamsInterface) {
  const privateAxiosInstance = createPrivateAxiosInstance();
  return await privateAxiosInstance.get(
    `batch/${batchId}/tests/concept/${conceptIds}?mode=${mode}`,
  );
}

export async function getTestDetails({
  testId,
  conceptIds,
}: getTestDetailsApiParamsInterface) {
  const privateAxiosInstance = createPrivateAxiosInstance();
  return await privateAxiosInstance.get(
    `tests/${testId}/details?conceptIds=${conceptIds}`,
  );
}

export async function getTestAnalytics({
  assignmentIds,
}: getTestAnalyticsApiParamsInterface) {
  const privateAxiosInstance = createPrivateAxiosInstance();
  return await privateAxiosInstance.post(`assignments/analytics`, {
    assignmentIds,
  });
}

export async function getStudentAnalytics(
  params: getTestAnalyticsApiParamsInterface,
) {
  const privateAxiosInstance = createPrivateAxiosInstance();
  return await privateAxiosInstance.post(`assignments/students`, params);
}
export async function getStudentAuthToken({
  courseId,
  mypatStudentId,
}: getStudentAuthTokenApiParamsInterface) {
  const privateAxiosInstance = createPrivateAxiosInstance(BASE_URL);
  return await privateAxiosInstance.get(
    `auth/getStudentAuthToken/${mypatStudentId}?targetExam=${courseId}&isV3=true`,
  );
}

export async function handleTestAssign(params: AssignTestProps) {
  const privateAxiosInstance = createPrivateAxiosInstance();
  return await privateAxiosInstance.post('/tests/assignTest', params);
}

export async function getQuestionAnalytics(
  params: getTestAnalyticsApiParamsInterface,
) {
  const privateAxiosInstance = createPrivateAxiosInstance();
  return await privateAxiosInstance.post(`assignments/questions`, params);
}

export async function logoutConcurrentSession() {
  const privateAxiosInstance = createPrivateAxiosInstance();
  return await privateAxiosInstance.post('users/logout');
}

export async function getCPPTestCount() {
  const privateAxiosInstance = createPrivateAxiosInstance();
  return await privateAxiosInstance.get('assigned-cpp?countOnly=true');
}

export async function getCPPTestList() {
  const privateAxiosInstance = createPrivateAxiosInstance();
  return await privateAxiosInstance.get('assigned-cpp');
}

export async function getStudentListByAssignmentId({
  assignmentId,
}: {
  assignmentId: string;
}) {
  const privateAxiosInstance = createPrivateAxiosInstance();
  return await privateAxiosInstance.get(
    `student-paper-attempts/${assignmentId}`,
  );
}

export async function getStudentSummaryByAttemptId({
  attemptId,
}: {
  attemptId: string;
}) {
  const privateAxiosInstance = createPrivateAxiosInstance();
  return await privateAxiosInstance.get(`paper-attempts/${attemptId}`);
}

export async function marksAwardByAttemptId(params: {
  questions: any[];
  attemptId: string;
}) {
  const { questions, attemptId } = params;
  const privateAxiosInstance = createPrivateAxiosInstance();
  return await privateAxiosInstance.post(
    `subjective/attempts/${attemptId}/award-marks`,
    { questions },
  );
}

export async function syncEvaluationOfStudent(params: {
  attemptId: string;
  pdf: any;
  questions: any;
}) {
  const { attemptId, pdf, questions } = params;
  let response: any = { messages: [] };
  if (pdf) {
    const formData = new FormData();
    formData.append('file', pdf);
    await axios({
      method: 'post',
      url: `${API_AUTH_BASE_URL}subjective/attempts/${attemptId}/sync-teachers-evaluation`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: localStorage.getItem(LOGIN_TOKEN_KEY),
      },
    });
    response.messages.push('Teachers evaluation sheet synced successfully');
  }
  if (questions && questions.length > 0) {
    await marksAwardByAttemptId({ attemptId, questions });
    response.messages.push('Marks awarded successfully');
  }
  return response;
}

export async function submitEvaluationOfStudent({
  attemptId,
}: {
  attemptId: string;
}) {
  const privateAxiosInstance = createPrivateAxiosInstance();
  return await privateAxiosInstance.post(
    `subjective/attempts/${attemptId}/finish-checking`,
  );
}

export async function fetchTeachersPDF({ testId }: { testId: string }) {
  const privateAxiosInstance = createPrivateAxiosInstance(BASE_URL);
  return await privateAxiosInstance.get(
    `auth/tests/${testId}?projections=questions&`,
  );
}

export async function publishTestResult({
  assignmentId,
}: {
  assignmentId: string;
}) {
  const privateAxiosInstance = createPrivateAxiosInstance();
  return await privateAxiosInstance.post(
    `subjective/assignment/${assignmentId}/publish-result`,
  );
}

export async function fetchStudentsFromKeyword({ query }: any) {
  const privateAxiosInstance = createPrivateAxiosInstance(BASE_URL);
  return await privateAxiosInstance.get(
    `auth/students?q=${query}&offset=1&limit=10`,
  );
}

export async function fetchStudentProfileSummary({
  studentId,
  subject,
  targetExam,
  criteria,
}: any) {
  const privateAxiosInstance = createPrivateAxiosInstance(BASE_URL);
  return await privateAxiosInstance.get(
    `auth/students/${studentId}/summary?subject=${subject}&criteria=${criteria}${
      targetExam ? `&targetExam=${targetExam}` : ''
    }`,
  );
}

export async function fetchStudentProfileAssignments({
  studentId,
  subject,
  targetExam,
  offset = 1,
  limit = 10,
}: any) {
  const privateAxiosInstance = createPrivateAxiosInstance(BASE_URL);
  return await privateAxiosInstance.get(
    `/auth/students/${studentId}/assignments?offset=${offset}&limit=${limit}&targetExam=${targetExam}&subject=${subject}`,
  );
}

export async function fetchStudentProfileConcepts({
  studentId,
  subject,
  targetExam,
  offset = 1,
  limit = 10,
}: any) {
  const privateAxiosInstance = createPrivateAxiosInstance(BASE_URL);
  return await privateAxiosInstance.get(
    `/auth/students/${studentId}/concepts?offset=${offset}&limit=${limit}&subject=${subject}&targetExam=${targetExam}`,
  );
  // return await privateAxiosInstance.get(`/auth/students/5ea829a84adb7f23a969b964/concepts?previousData=true&targetExam=5ec4f0c093939f38f1326b3c&subject=5ec4f136555b3f38ebdaed92`);
}

export async function fetchStudentRecentSearchList({
  limit = 5,
  sortBy = 'descCreatedAt',
  type = 'student',
  offset = 1,
}: any) {
  const privateAxiosInstance = createPrivateAxiosInstance(BASE_URL);
  return await privateAxiosInstance.get(
    `/auth/search-events?type=${type}&offset=${offset}&limit=${limit}&sortBy=${sortBy}`,
  );
}

export async function addStudentRecentSearchEvent({
  type = 'student',
  searchTerm,
  meta,
}: any) {
  const privateAxiosInstance = createPrivateAxiosInstance(BASE_URL);
  return await privateAxiosInstance.post(`auth/search-events`, {
    type,
    searchTerm,
    meta,
  });
}
// reports apis
export async function getAllAssignments(params: any) {
  const privateAxiosInstance = createPrivateAxiosInstance(API_AUTH_BASE_URL);
  return await privateAxiosInstance.get(`assignments`, { params });
}

export async function getAllBatches(params: any) {
  const privateAxiosInstance = createPrivateAxiosInstance(API_AUTH_BASE_URL);
  return await privateAxiosInstance.get(`assignments/${params}/batches-info`);
}

export async function getReportsHistory(params: any) {
  const privateAxiosInstance = createPrivateAxiosInstance(API_AUTH_BASE_URL);
  return await privateAxiosInstance.get(`reports/history`, { params });
}

export async function sendMailForSingleReport(body: any) {
  const bodyPayload = { studentIds: body.studentIds };
  const privateAxiosInstance = createPrivateAxiosInstance(BASE_URL);
  return await privateAxiosInstance.post(
    `auth/reports/v3/students?email=${body.email}&assignmentId=${body.assignmentId}&centreId=${body.centreId}&sample=false&reportName=${body.reportName}`,
    bodyPayload,
  );
}

export async function sendMailForConsolidatedReport(body: any) {
  const bodyPayload = {
    studentIds: body.studentIds,
    assignmentIds: body.assignmentId,
    orgCentreId: body.centreId,
    email: body.email,
    startDate: body.startDate.date,
    endDate: body.endDate.date,
    batchIds: body.batchIds,
    testType: body.reportName,
  };
  const privateAxiosInstance = createPrivateAxiosInstance(BASE_URL);
  return await privateAxiosInstance.post(
    `auth/v3/reports/student`,
    bodyPayload,
  );
}

export async function fetchChapterTestForTopics(body: any) {
  const privateAxiosInstance = createPrivateAxiosInstance(API_AUTH_BASE_URL);
  return await privateAxiosInstance.get(
    `batch/${body.batchId}/tests/chapter/${body.chapterIds}`,
  );
}
/**************** CPP APIs ***********************/
export async function fetchCppTests({
  subject,
  targetExam,
  offset = 1,
  limit = 10,
  type = 'mine',
  query = null,
}: any) {
  const privateAxiosInstance = createPrivateAxiosInstance(BASE_URL);
  if (query) {
    return await privateAxiosInstance.get(
      `/auth/tests?type=${type}&offset=${offset}&limit=${limit}&subject=${subject}&targetExam=${targetExam}&q=${query}`,
    );
  }
  return await privateAxiosInstance.get(
    `/auth/tests?type=${type}&offset=${offset}&limit=${limit}&subject=${subject}&targetExam=${targetExam}`,
  );
}

export async function getAllAssignmentHistoryData(payload: any) {
  const privateAxiosInstance = createPrivateAxiosInstance(API_AUTH_BASE_URL);
  return await privateAxiosInstance.get(`test/${payload.id}/assignments`);
}

export async function getAlStudentsForBatch(payload: any) {
  const privateAxiosInstance = createPrivateAxiosInstance(API_AUTH_BASE_URL);
  return await privateAxiosInstance.get(`assignment/${payload.id}/batch/user`);
}

export async function fetchBatchSummary({
  subject,
  targetExam,
  testId,
  offset = 1,
  limit = 500,
}: any) {
  const privateAxiosInstance = createPrivateAxiosInstance(BASE_URL);
  return await privateAxiosInstance.get(
    `/auth/batches/summary?targetExam=${targetExam}&subject=${subject}&testId=${testId}&limit=${limit}&offset=${offset}`,
  );
}

export async function fetchBatchStudentList({
  subject,
  targetExam,
  testId,
  offset = 1,
  limit = 500,
  batchId,
  type = 'mine',
}: any) {
  const privateAxiosInstance = createPrivateAxiosInstance(BASE_URL);
  return await privateAxiosInstance.get(
    `/auth/batches/${batchId}/students?offset=${offset}&limit=${limit}&type=${type}&targetExam=${targetExam}&subject=${subject}&testId=${testId}`,
  );
}

export async function assignAssignment(payload: any) {
  // let payload = {"batches":[],"teacher":{"teacherName":"Rebati"},"students":[{"id":"5ea6d6dd3205bc31592766f0","batchId":"5ea829a71a9775afbcca65bf"},{"id":"5ea6d6dc3205bc31592766da","batchId":"5ea829a71a9775afbcca65bf"},{"id":"5ea6d6dc3205bc31592766de","batchId":"5ea829a71a9775afbcca65bf"}],"test":{"testId":"5ed3faf63b86e62141cb8645","testName":"Endoplasmic Reticulum and Golgi Apparatus","type":"concept"},"assignedDate":"2021-03-10T18:30:00.000Z","dueDate":"2021-03-23T18:29:59.999Z","courseId":"5ec4f0c093939f38f1326b3c","source":"web"};
  // const url = '/auth/tests/5ed3faf63b86e62141cb8645/assignTest';

  const privateAxiosInstance = createPrivateAxiosInstance(BASE_URL);
  return await privateAxiosInstance.post(
    `/auth/tests/${payload.test?.testId}/assignTest`,
    {
      ...payload,
      // "courseId":"5ec4f0c093939f38f1326b3c",
      // "teacher":{"teacherName":"Rebati"},
      source: 'web',
    },
  );
}

export async function getCppTestDetail(payload: any) {
  const privateAxiosInstance = createPrivateAxiosInstance(BASE_URL);
  return await privateAxiosInstance.get(`auth/tests/${payload.id}`);
}

export async function deleteTheTest(payload: any) {
  const privateAxiosInstance = createPrivateAxiosInstance(API_AUTH_BASE_URL);
  return await privateAxiosInstance.delete(`test/${payload.id}`);
}

export async function duplicateTheTest(payload: any) {
  const privateAxiosInstance = createPrivateAxiosInstance(API_AUTH_BASE_URL);
  return await privateAxiosInstance.post(`test/clone-test`, {
    testId: payload.id,
  });
}

export async function updateAssignment({ assignmentId, ...restPayload }: any) {
  const privateAxiosInstance = createPrivateAxiosInstance(API_AUTH_BASE_URL);
  return await privateAxiosInstance.patch(
    `assignment/${assignmentId}`,
    restPayload,
  );
}

export async function getTopicsForSubjects(queryParams: any) {
  const privateAxiosInstance = createPrivateAxiosInstance(API_AUTH_BASE_URL);
  const { subjectIds, batchId } = queryParams;
  return await privateAxiosInstance.get(
    `batches/${batchId}/syllabus/concept?${subjectIds}`,
  );
}

export async function fetchChapTestBatches(queryParams: any) {
  const privateAxiosInstance = createPrivateAxiosInstance(BASE_URL);
  return await privateAxiosInstance.get(
    `auth/batches/summary?limit=${queryParams.limit}&offset=${queryParams.offset}&subject=${queryParams.subject}&targetExam=${queryParams.targetExam}&type=${queryParams.type}`,
  );
}

export async function assignChapTest(payload: any) {
  const privateAxiosInstance = createPrivateAxiosInstance(BASE_URL);
  return await privateAxiosInstance.post(
    `auth/tests/${payload.test.testId}/assignTest`,
    payload,
  );
}

export async function sendMailForChapTestReport(body: any) {
  const privateAxiosInstance = createPrivateAxiosInstance(BASE_URL);
  return await privateAxiosInstance.post(`auth/tests/report/v2`, body);
}
