import createApiReducer from '../../stores/api.reducer';
import { combineReducers } from 'redux';
export const conceptReducerName = 'concepts';

const conceptSlice = createApiReducer(conceptReducerName, []);
export const conceptActions = conceptSlice.actions;

export const chapterTestReducerName = 'chapter';
const chapterTestSlice = createApiReducer(chapterTestReducerName, []);
export const chapterTestActions = chapterTestSlice.actions;

export default combineReducers({
  concepts: conceptSlice.reducer,
  chapterTests: chapterTestSlice.reducer,
});
