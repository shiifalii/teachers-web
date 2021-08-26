export enum ROUTE_TYPE {
  public,
  private,
}
interface ROUTE {
  path: string;
  type: ROUTE_TYPE;
}

// Define all public routes below
export const LOGIN_ROUTE: ROUTE = { path: '/login', type: ROUTE_TYPE.public };
export const RESET_PASSWORD_ROUTE: ROUTE = {
  path: '/v3/users/change_password',
  type: ROUTE_TYPE.public,
};

// Define all private routes below
export const DASHBOARD_ROUTE: ROUTE = { path: '/', type: ROUTE_TYPE.private };

export const CHAPTER_ROUTE: ROUTE = {
  path: '/chapters/:batchId/:parentIds/:batchName',
  type: ROUTE_TYPE.private,
};

export const CONCEPT_ROUTE: ROUTE = {
  path: '/concepts/:batchId/:parentIds/:chapterIds/:batchName/:chapterName',
  type: ROUTE_TYPE.private,
};

export const TEST_ROUTE: ROUTE = {
  path:
    '/tests/:batchId/:conceptIds/:conceptName/:isConceptLocked/:batchName/:parentIds/:chapterIds/:chapterName',
  type: ROUTE_TYPE.private,
};

export const TEST_DETAILS_ROUTE: ROUTE = {
  path:
    '/tests/details/:batchId/:conceptIds/:conceptName/:isConceptLocked/:batchName/:parentIds/:chapterIds/:chapterName/:testData',
  type: ROUTE_TYPE.private,
};

export const STUDENT_ANALYTICS_ROUTE: ROUTE = {
  path:
    '/tests/details/:batchId/:conceptIds/:conceptName/:isConceptLocked/:batchName/:parentIds/:chapterIds/:chapterName/:testData/:assignmentIds/students',
  type: ROUTE_TYPE.private,
};

export const QUESTION_ANALYTICS_ROUTE: ROUTE = {
  path:
    '/tests/details/:batchId/:conceptIds/:conceptName/:isConceptLocked/:batchName/:parentIds/:chapterIds/:chapterName/:testData/:assignmentIds/questions',
  type: ROUTE_TYPE.private,
};

export const TEST_LIST_ASSESSMENT_ROUTE: ROUTE = {
  path: '/assessments/testList',
  type: ROUTE_TYPE.private,
};

export const STUDENT_LIST_ASSESSMENT_ROUTE: ROUTE = {
  path: '/assessments/studentList',
  type: ROUTE_TYPE.private,
};

export const STUDENT_SUMMARY_ASSESSMENT_ROUTE: ROUTE = {
  path: '/assessments/studentSummary',
  type: ROUTE_TYPE.private,
};

export const TEST_EVALUATION_ASSESSMENT_ROUTE: ROUTE = {
  path: '/assessments/testEvaluation',
  type: ROUTE_TYPE.private,
};

export const ANYTIME_PTM_STUDENT_SEARCH: ROUTE = {
  path: '/anytime-ptm/student-search',
  type: ROUTE_TYPE.private,
};

export const ANYTIME_PTM_STUDENT_SEARCH_RESULTS: ROUTE = {
  path: '/anytime-ptm/student-search/:query',
  type: ROUTE_TYPE.private,
};

export const ANYTIME_PTM_STUDENT_PROFILE: ROUTE = {
  path: '/anytime-ptm/student-profile/:studentId',
  type: ROUTE_TYPE.private,
};

export const GENARATE_REPORTS_ROUTE: ROUTE = {
  path: '/reports/genarate',
  type: ROUTE_TYPE.private,
};

export const REPORTS_HISTORY_ROUTE: ROUTE = {
  path: '/reports/history',
  type: ROUTE_TYPE.private,
};

export const CPP_LIST_ROUTE: ROUTE = {
  path: '/cpp',
  type: ROUTE_TYPE.private,
};

export const CPP_COMPLETE_PAPER: ROUTE = {
  path: '/cpp/complete-paper/:paperId',
  type: ROUTE_TYPE.private,
};
