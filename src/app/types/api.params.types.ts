export interface loginUserParamsInterface {
  username: string;
  password: string;
  osType: 'web';
  device: 'desktop';
}

export interface getConceptsApiInterface {
  batchId: string;
  chapterIds: string;
}

export interface getChaptersApiInterface {
  batchId: string;
  subjectIds: string;
}

export interface getNotificationsInterface {
  pageNo: number;
  limit: number;
}

export interface viewNotificationInterface {
  notificationId: string;
}

export interface getTestsApiParamsInterface {
  batchId: string;
  conceptIds: string;
  mode: 'list' | 'data';
}
export interface getTestDetailsApiParamsInterface {
  testId: string;
  conceptIds: string;
}

export interface getTestAnalyticsApiParamsInterface {
  assignmentIds: string[];
}

export interface getStudentAuthTokenApiParamsInterface {
  mypatStudentId: string;
  courseId: string;
}
