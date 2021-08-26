import { API_STATE } from 'app/stores/api.reducer';

export interface ChoicesListItem {
  value: string;
  serialNo: number;
  id: string;
}

interface CorrectAnswerListItem {
  _id: string;
  value: string;
}

interface Summary {
  attemptCount: number;
  correctAttemptCount: number;
  incorrectAttemptCount: number;
  totalTimeTaken: number;
  totalStudentsCount: number;
  studentAttemptedPercentage: number;
  avgTimeTaken: number;
  avgAccuracy: number;
}

export interface QuestionAnalyticsListItem {
  id: string;
  question: string;
  type: string;
  code: number;
  choices: ChoicesListItem[];
  matrixOptions: {
    optionLeft: any[];
    optionRight: any[];
  };
  correctAnswer: {
    data: CorrectAnswerListItem[];
    answerType: string;
  };
  solution: string;
  stepWiseSolution: StepWiseSolution[];
  positiveMarks: number;
  negativeMarks: number;
  difficultyType: string[];
  difficultyLevel: string[];
  description: string;
  summary: Summary;
  serialNo: number;
}

export interface SolutionStep {
  stepNo: number;
  solution: string;
  weightage?: number | string;
}

export interface StepWiseSolution {
  formulaUsed: string;
  solutionSteps: SolutionStep[];
}

export interface questionAnalyticsDataInterface {
  apiState: API_STATE;
  data: QuestionAnalyticsListItem[];
  error: string;
}
