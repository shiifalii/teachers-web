import { API_STATE } from 'app/stores/api.reducer';

export interface StudentAnalyticsListItem {
  attempted: boolean;
  testId: string;
  courseId: string;
  testType: string;
  attemptId?: string;
  name: string;
  enrollmentNo: string;
  imgUrl: string;
  studentId: string;
  mypatStudentId: string;
  marksScored?: number;
  totalMarks?: number;
  rank: number | string;
}

export interface studentAnalyticsDataInterface {
  apiState: API_STATE;
  data: StudentAnalyticsListItem[];
  error: string;
}
