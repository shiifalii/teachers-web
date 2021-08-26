import createApiReducer from '../../stores/api.reducer';
import { combineReducers } from 'redux';
export const chapterReducerName = 'chapters';
export const studentReducerName = 'students';
export const topicsReducerName = 'topics';

const chapterSlice = createApiReducer(chapterReducerName, []);
const studentSlice = createApiReducer(studentReducerName, []);
const topicsSlice = createApiReducer(topicsReducerName, []);
export const chapterActions = chapterSlice.actions;
export const studentActions = studentSlice.actions;
export const topicsActions = topicsSlice.actions;

export default combineReducers({
  chapters: chapterSlice.reducer,
  students: studentSlice.reducer,
  topics: topicsSlice.reducer,
});
