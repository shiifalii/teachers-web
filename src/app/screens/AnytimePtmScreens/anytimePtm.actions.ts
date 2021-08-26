import { createAction } from '@reduxjs/toolkit';
import {
  FETCH_STUDENT_LIST_BY_KEYWORD,
  FETCH_STUDENT_PROFILE_SUMMARY,
  FETCH_STUDENT_ASSIGNMENTS,
  FETCH_STUDENT_CONCEPTS,
  FETCH_STUDENT_RECENT_SEARCH_LIST,
  ADD_STUDENT_SEARCH_EVENT,
} from './anytimePtm.actionTypes';

export const fetchStudentSearchResults = createAction(
  FETCH_STUDENT_LIST_BY_KEYWORD,
  function prepare(payload) {
    return {
      payload,
    };
  },
);

export const fetchStudentProfileSummary = createAction(
  FETCH_STUDENT_PROFILE_SUMMARY,
  function prepare(payload) {
    return {
      payload,
    };
  },
);

export const fetchStudentProfileAssignments = createAction(
  FETCH_STUDENT_ASSIGNMENTS,
  function prepare(payload) {
    return {
      payload,
    };
  },
);

export const fetchStudentProfileConcepts = createAction(
  FETCH_STUDENT_CONCEPTS,
  function prepare(payload) {
    return {
      payload,
    };
  },
);

export const fetchStudentRecentSearchList = createAction(
  FETCH_STUDENT_RECENT_SEARCH_LIST,
  function prepare(payload) {
    return {
      payload,
    };
  },
);

export const addStudentSearchEvent = createAction(
  ADD_STUDENT_SEARCH_EVENT,
  function prepare(payload) {
    return {
      payload,
    };
  },
);
