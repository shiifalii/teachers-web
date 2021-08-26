import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { Flex } from 'app/components/atoms';
import {
  marksAwardByAttemptId,
  submitEvaluationOfStudent,
} from 'app/helpers/private.api.helper';

const NotSubmitToastContainer = styled.div`
  position: fixed;
  padding: 15px;
  background-color: #fbfbfb;
  box-shadow: 0px 4px 4px rgba(130, 130, 130, 0.25);
  border-radius: 4px;
  bottom: 10px;
  width: 60vw;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  @media (max-width: 768px) {
    width: 100vw;
  }
`;
const ButtonContainer = styled.div`
  text-align: right;
`;

const AttentionSvg = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip2)">
      <path
        d="M15.9997 31.7453C7.31706 31.7453 0.254395 24.6826 0.254395 16C0.254395 7.3173 7.31706 0.254639 15.9997 0.254639C24.6824 0.254639 31.7464 7.3173 31.7464 16C31.7464 24.6826 24.6811 31.7453 15.9997 31.7453ZM15.9997 2.92131C8.78773 2.92131 2.92106 8.78797 2.92106 16C2.92106 23.2133 8.78773 29.0786 15.9997 29.0786C23.2117 29.0786 29.0797 23.2146 29.0797 16C29.0784 8.7893 23.2117 2.92131 15.9997 2.92131Z"
        fill="#FFCC00"
      />
      <path
        d="M17.7223 6.95068H14.2783V19.016H17.7223V6.95068Z"
        fill="#FFCC00"
      />
      <path
        d="M16 25.0493C17.2084 25.0493 18.188 24.0697 18.188 22.8613C18.188 21.6529 17.2084 20.6733 16 20.6733C14.7916 20.6733 13.812 21.6529 13.812 22.8613C13.812 24.0697 14.7916 25.0493 16 25.0493Z"
        fill="#FFCC00"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="32" height="32" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

function ForceSubmitToast({
  allSubjectiveQIds,
  attemptId,
}: {
  allSubjectiveQIds: string[];
  attemptId: false | string;
}) {
  const [loading, setLoading] = useState(false);

  const questionsData = useMemo(() => {
    return allSubjectiveQIds.map(qId => {
      return {
        qId,
        userPositiveMarks: 0,
        attempted: false,
      };
    });
  }, [allSubjectiveQIds]);

  async function handleForceSubmit() {
    try {
      if (attemptId) {
        setLoading(true);
        await marksAwardByAttemptId({ questions: questionsData, attemptId });
        await submitEvaluationOfStudent({ attemptId });
        //@ts-ignore
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <NotSubmitToastContainer>
      <Flex align="center">
        <div>
          <AttentionSvg />
        </div>
        <p style={{ marginLeft: '10px' }}>
          No subjective answers asnwers have been submitted by this student.
          Please press OKAY to allow results to be published for this submission
        </p>
      </Flex>
      <ButtonContainer>
        {loading ? (
          <CircularProgress size={20} />
        ) : (
          <Button variant="text" color="primary" onClick={handleForceSubmit}>
            OKAY
          </Button>
        )}
      </ButtonContainer>
    </NotSubmitToastContainer>
  );
}
export default React.memo(ForceSubmitToast);
