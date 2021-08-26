import createSaga from '../../helpers/sagas.helper';
import {
  chapterReducerName,
  studentReducerName,
  topicsReducerName,
} from './chapter.reducer';

export const fetchChapters = createSaga(chapterReducerName);
export const fetchStudents = createSaga(studentReducerName);
export const fetchTopicsForSubjects = createSaga(topicsReducerName);
