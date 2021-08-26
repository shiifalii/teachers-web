import { Tools } from '@tarik.djurdjevic/react-sketch';
import {
  marksAssigned,
  pdfModified,
  resetUnsavedChanges,
  inititalisePDFSketch,
  loadPdfPages,
  modifyPdfPage,
  navigateToPdfPage,
  setSketchTool,
  clearPDFPage,
  modifyScale,
  loadResponseMessages,
  setSubmitSummaryFlag,
  toggleFullScreen,
} from '../assessments.actions';
import { ActionReducerMapBuilder } from '@reduxjs/toolkit';

export default (builder: ActionReducerMapBuilder<any>) =>
  builder
    .addCase(loadResponseMessages, (state, action) => {
      state.data.messages = state.data.messages.concat(action.payload);
    })
    .addCase(resetUnsavedChanges, (state, action) => {
      // return { ...state, data: action.payload };
      state.data.unsavedChangesPresent = false;
      state.data.pdfAnnotated = false;
      state.data.unsavedQuestions = [];
      state.data.messages = [];
      state.data.selectedSketchTool = {
        tool: Tools.Pan,
      };
      // state.data = {...state.data, ...action.payload};
    })
    .addCase(setSubmitSummaryFlag, (state, action) => {
      state.data.showSubmitSummary = action.payload;
    })
    .addCase(marksAssigned, (state, action) => {
      // return action.payload
      // return { ...state, data: { ...state.data, ...action.payload } };
      // const { payload } = action;
      let foundIndex = state.data.unsavedQuestions.findIndex(
        ({ qId }: any) => qId === action.payload.qId,
      );
      if (foundIndex !== -1) {
        state.data.unsavedQuestions[foundIndex] = action.payload;
      } else {
        state.data.unsavedQuestions.push(action.payload);
      }
      state.data.unsavedChangesPresent = true;
    })
    .addCase(pdfModified, (state, action) => {
      // return { ...state, data: action.payload };
      state.data.pdfAnnotated = true;
      state.data.unsavedChangesPresent = true;
    })
    .addCase(inititalisePDFSketch, (state, action) => {
      state.data = { ...state.data, ...action.payload };
    })
    .addCase(setSketchTool, (state, action) => {
      state.data.selectedSketchTool = action.payload;
    })
    .addCase(toggleFullScreen, (state, action) => {
      state.data.isFullScreen = !state.data.isFullScreen;
    })
    .addCase(loadPdfPages, (state, action) => {
      state.data.pdfPages = state.data.pdfPages.concat(action.payload);
      state.data.unmodifiedPDFPages = state.data.unmodifiedPDFPages.concat(
        action.payload,
      );
    })
    .addCase(modifyPdfPage, (state, action) => {
      const { index, data } = action.payload;
      state.data.pdfPages[index] = { ...state.data.pdfPages[index], data };
      state.data.pdfAnnotated = true;
      state.data.unsavedChangesPresent = true;
      state.data.scales.scaleX = 1;
      state.data.scales.scaleY = 1;
    })
    .addCase(navigateToPdfPage, (state, action) => {
      const { step } = action.payload;
      state.data.currentPDFPageIndex += step;
    })
    .addCase(clearPDFPage, (state, action) => {
      const index = state.data.currentPDFPageIndex;
      state.data.pdfPages[index] = state.data.unmodifiedPDFPages[index];
    })
    .addCase(modifyScale, (state, action) => {
      state.data.scales.scaleX *= action.payload;
      state.data.scales.scaleY *= action.payload;
    });
