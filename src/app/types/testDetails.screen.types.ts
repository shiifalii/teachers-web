import { API_STATE } from 'app/stores/api.reducer';

export interface TestDetailsListItem {
  id: string;
  name: string;
  assignment: {
    id: string;
    syllabus: string;
    name: string;
    assignedDate: string;
    courseId: string;
    duration_minutes: number;
  };
  students: {
    total: number;
    attempted: number;
  };
}

export interface testDetailsDataInterface {
  apiState: API_STATE;
  data: TestDetailsListItem[];
  error: string;
}

export interface TestAnalyticsData {
  isAssigned: boolean;
  isAttempted: boolean;
  avgMarksPercentage: number;
  graphData: any;
  students: any;
  questions: any;
}

export interface testAnalyticsDataInterface {
  apiState: API_STATE;
  data: TestAnalyticsData;
  error: string;
}
