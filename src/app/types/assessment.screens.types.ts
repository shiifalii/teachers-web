import { API_STATE } from 'app/stores/api.reducer';

export interface AssignedCPPTestCountState {
  apiState: API_STATE;
  data: {
    totalCount: number;
  };
  error: string;
}

export interface AssignedCPPTest {
  _id: string;
  isSubjective?: boolean;
  assignmentInfo: AssignmentInfo;
  assignmentId: string;
  testId: string;
  teacherId: string;
  courseId: string;
  subjectiveAssignmentStatsId?: SubjectiveAssignmentStats;
}

interface AssignmentInfo {
  endDate: string;
  createDate: string;
  totalBatchesAssigned: number;
  totalStudentsAssigned: number;
  testName: string;
  testType: string;
  targetExam: string;
  testDuration: number;
}

interface SubjectiveAssignmentStats {
  submissions: number;
  avgScore: number;
  checked: number;
  status: AssessmentStatus;
}

export type AssessmentStatus =
  | 'toBeChecked'
  | 'checking'
  | 'checked'
  | 'published';

export interface AssignedCPPTestListState {
  apiState: API_STATE;
  data: {
    message: string;
    assignedTest: AssignedCPPTest[];
  };
  error: string;
}

export interface StudentListItem {
  assignmentId: string;
  mypatStudentId: string;
  studentName: string;
  studentEnrollmentNo: string;
  attempted: boolean;
  attemptData: AttemptData;
}

interface AttemptData {
  paperAttemptId: string;
  status: AssessmentStatus;
  attemptDate: string;
  checkedBy: {
    teacherId: string;
  };
  totalSubjectiveQuestions: number;
  checkedSubjectiveQuestions: number;
  maxTotalScore: number;
  userTotalMarks: number;
}

export interface StudentListState {
  apiState: API_STATE;
  data: {
    studentList: StudentListItem[];
  };
  error: string;
}

// For student summary

export interface StudentSummaryData {
  _id: string;
  maxTotalScore: number;
  userTotalMarks: number;
  status: AssessmentStatus;
  totalSubjectiveQuestions: number;
  checkedSubjectiveQuestions: number;
  subjectiveAnswers: {
    student: any;
    teacher: any;
  };
  questions: Question[];
}

export interface Question {
  section: Section;
  attemptData: QuestionAttemptData;
  questionNo: number;
  _id: string;
  qId: string;
  skill: string;
  difficulty: string;
  questionType: string;
  questionCode: number;
  marksAwarded?: number;
  correctAnswer: CorrectAnswer;
}

interface QuestionAttemptData {
  isAttempted: boolean;
  answer: Answer[];
  userTotalMarks: number;
  userPositiveMarks: number;
  userNegativeMarks: number;
  userTimeTaken: number;
  questionTotalMarks: number;
  questionNegativeMarks: number;
  questionPartialMarks: null;
  isCorrect: number;
  status: AssessmentStatus;
}

export interface Answer {
  value: string;
}

export interface CorrectAnswer {
  answerType: string;
  data: Datum[];
}

export interface Datum {
  value: string;
  _id: string;
}

export interface Section {
  subSection: {
    name: string;
    id: string;
  };
  name: string;
  id: string;
}

export interface StudentSummaryState {
  apiState: API_STATE;
  data: {
    studentSummary: StudentSummaryData;
  };
  error: string;
}

// For test evaluation

interface QuestionEvaluationItem {
  qId: string;
  userPositiveMarks: number;
  attempted: boolean;
}

export interface TestEvaluationState {
  apiState: API_STATE;
  data: {
    message: string[];
    unsavedQuestions: QuestionEvaluationItem[];
    pdfAnnotated: boolean;
    unsavedChangesPresent: boolean;
  };
  error: string;
}
