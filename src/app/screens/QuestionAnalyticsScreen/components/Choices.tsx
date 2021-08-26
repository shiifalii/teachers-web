import React from 'react';
import { ChoicesListItem } from 'app/types/questionAnalytics.screen.types';
import Grid from '@material-ui/core/Grid';
import { ChoicesGridStyles, CorrectAns } from '../styles';
import { Flex } from 'app/components/atoms';
import MathJax from 'react-mathjax3';

interface ChoicesProps {
  data: ChoicesListItem[];
  correctAnswerValues?: { answerType: string; correctOptions: string[] };
  type: string;
}

function Choices({ data, correctAnswerValues }: ChoicesProps) {
  const classes = ChoicesGridStyles();

  return (
    <>
      {data.map(choice => {
        const isCorrectAns =
          correctAnswerValues &&
          correctAnswerValues.correctOptions.includes(
            (choice as any)[correctAnswerValues.answerType],
          );
        return (
          <Grid
            item
            xs={12}
            key={choice.id}
            style={{ border: '1px solid #E6E6E6' }}
          >
            <Flex
              className={classes.choice}
              align="flex-start"
              justify="flex-start"
            >
              <div
                style={{
                  paddingRight: '5px',
                  display: 'flex',
                  paddingTop: '5px',
                }}
              >
                <CorrectAns>
                  {isCorrectAns && (
                    <img
                      src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/number.svg"
                      alt="Tick"
                    />
                  )}
                </CorrectAns>
              </div>
              <Flex align="flex-start">
                <div style={{ paddingRight: '10px' }}>
                  {SerialNoToAlphabet[choice.serialNo]}.
                </div>
                <MathJax.Context options={{ messageStyle: 'none' }}>
                  <MathJax.Html html={choice.value} />
                </MathJax.Context>
              </Flex>
            </Flex>
          </Grid>
        );
      })}
    </>
  );
}

const SerialNoToAlphabet: { [key: number]: string } = {
  1: 'A',
  2: 'B',
  3: 'C',
  4: 'D',
};

export default Choices;
