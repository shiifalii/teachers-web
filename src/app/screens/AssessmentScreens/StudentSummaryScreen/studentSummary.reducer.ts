import { modifyOriginalQuestions } from '../assessments.actions';
import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { Question } from 'app/types/assessment.screens.types';

export default (builder: ActionReducerMapBuilder<any>) =>
  builder.addCase(modifyOriginalQuestions, (state, action) => {
    const { dirtyQuestions } = action.payload;
    dirtyQuestions.forEach(({ qId, attempted, userPositiveMarks }: any) => {
      const index = state.data.questions.findIndex(
        (ques: Question) => qId === ques.qId,
      );
      if (index !== -1) {
        state.data.questions[index].attemptData.isAttempted = attempted;
        state.data.questions[index].attemptData.status = 'checked';
        state.data.questions[
          index
        ].attemptData.userPositiveMarks = userPositiveMarks;
        state.data.questions[
          index
        ].attemptData.userTotalMarks = userPositiveMarks;
      }
    });
  });
