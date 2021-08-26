import createSaga from '../../helpers/sagas.helper';
import { conceptReducerName, chapterTestReducerName } from './concept.reducer';

export const fetchConcepts = createSaga(conceptReducerName);

export const fetchChapterTests = createSaga(chapterTestReducerName);
