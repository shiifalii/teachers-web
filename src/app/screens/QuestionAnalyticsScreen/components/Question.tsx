import React, { useMemo, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import MathJax from 'react-mathjax3';
import { QuestionAnalyticsListItem } from 'app/types/questionAnalytics.screen.types';
import {
  QuestionContainer,
  Tag,
  ChoicesGridStyles,
  Bold,
  QuestionAnalyticeDetail,
  SolutionContainer,
} from '../styles';
import { Flex } from 'app/components/atoms';
import { titleCase, secondsToHms } from 'app/helpers/comman.helper';
import InfoToolTip from 'app/components/common/info.tooltip';
import Choices from './Choices';
import { Typography } from '@material-ui/core';
import { WithStyles, createStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

const styles = (theme: Theme) =>
  createStyles({
    // Solution Tabs
    tabPanel: {
      marginTop: 20,
      marginBottom: 12,
    },
    tabs: {
      fontSize: 15,
      lineHeight: '19px',
      color: '#333',
      marginRight: '30px!important',
      cursor: 'pointer',
    },
    fontSM: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: '22px',
      color: '#333333',
    },
    titleDesc: {
      margin: '10px 0',
      '& p': {
        margin: 0,
      },
      '& p > img, img': {
        maxWidth: '100%',
      },
    },
    activeTab: {
      fontWeight: 600,
      color: '#1d7dea!important',
      position: 'relative',
      '&::before': {
        content: '""',
        width: '75px',
        height: '5px',
        borderRadius: 10,
        backgroundColor: '#1d7dea',
        position: 'absolute',
        top: '26px',
      },
    },
    tabContent: {
      // marginTop:14,
    },
    stepSubHeading: {
      fontSize: 14,
      lineHeight: '17px',
      fontWeight: 600,
      color: '#333',
      marginTop: '18px!important',
      marginBottom: '8px',
    },
    stepsContent: {
      fontSize: 14,
      lineHeight: '24px',
      color: '#666',
      marginTop: '5px!important',
    },
    formulaSection: {
      background: '#F9F9F9',
      border: '1px solid #E2E2E2',
      padding: '10px 15px',
      margin: '22px -1rem -1rem -1rem',
    },
    HeadingTxt: {
      fontWeight: 500,
      fontSize: 15,
      marginBottom: '16px',
      lineHeight: '22px',
      color: '#666',
    },
  });

const QuestiontextContainer = styled.div`
  img {
    @media (max-width: 768px) {
      max-width: 100% !important;
    }
  }
`;

const StyledFlex = styled(Flex as any)`
  @media (max-width: 768px) {
    overflow: auto;
  }
`;
interface QuestionsInterface extends WithStyles<typeof styles> {
  currentQuestion: QuestionAnalyticsListItem;
}

function Questions(props: QuestionsInterface) {
  const classes = ChoicesGridStyles();
  const [activeTab, setActiveTab] = useState(0);
  const { currentQuestion, classes: MuiClasses } = props;

  const correctAnswerValues = useMemo(() => {
    if (currentQuestion) {
      const {
        correctAnswer: { answerType, data },
      } = currentQuestion;
      const correctOptions = data.map(({ value }) => value);
      return {
        answerType,
        correctOptions,
      };
    }
  }, [currentQuestion]);

  if (!currentQuestion) {
    return null;
  }
  const {
    question,
    difficultyLevel,
    difficultyType,
    type,
    positiveMarks,
    negativeMarks,
    choices,
    summary,
    stepWiseSolution,
    serialNo,
  } = currentQuestion;

  const isSingleSolution = stepWiseSolution.length === 1;

  const renderSingleSolutionTitle = () => {
    const { classes } = props;
    return (
      <div className={classes.titleDesc}>
        <Typography variant="body2" className={classes.fontSM}>
          Solutions:{' '}
        </Typography>
      </div>
    );
  };

  const renderMultiSolutionTabs = () => {
    return (
      <Grid container justify="flex-start" className={MuiClasses.tabPanel}>
        {stepWiseSolution.map((solution, index) => {
          const solutionNo = index + 1;
          const isActive = activeTab === index;
          return (
            <Grid item key={solutionNo}>
              <Typography
                className={[
                  MuiClasses.tabs,
                  isActive ? MuiClasses.activeTab : '',
                ].join(' ')}
                onClick={() => setActiveTab(index)}
              >
                Solution{solutionNo}
              </Typography>
            </Grid>
          );
        })}
      </Grid>
    );
  };

  return (
    <div style={{ width: '100%' }}>
      <QuestionContainer>
        <StyledFlex>
          <Bold style={{ paddingRight: '10px' }}>Q{serialNo}.</Bold>
          <QuestiontextContainer>
            {' '}
            <MathJax.Context options={{ messageStyle: 'none' }}>
              <MathJax.Html html={question} />
            </MathJax.Context>
          </QuestiontextContainer>
        </StyledFlex>
        <Flex
          wrap="wrap"
          justify="flex-start"
          align="center"
          style={{ paddingTop: '0.5rem', maxWidth: '90%' }}
        >
          {difficultyLevel.map((level, i) => (
            <Tag key={i}>{titleCase(level)}</Tag>
          ))}
          {difficultyType.map((type, i) => (
            <Tag key={i}>{titleCase(type)}</Tag>
          ))}
        </Flex>
        <Flex style={{ paddingTop: '0.8rem' }}>
          <Bold style={{ width: '37%' }}>Options</Bold>

          <Bold
            style={{ paddingRight: '0.5rem', width: '67%', textAlign: 'right' }}
          >
            {type}, +{positiveMarks}, -{negativeMarks}
          </Bold>
          <span className="tooltip">
            <InfoToolTip
              title={
                <p>
                  The mentioned data is the Question Type and the Marking scheme
                  for this question.
                </p>
              }
            />
          </span>
        </Flex>
      </QuestionContainer>
      <div className={classes.root}>
        <Grid container>
          <Grid container item xs={12}>
            <Choices
              data={choices}
              type={type}
              correctAnswerValues={correctAnswerValues}
            />
          </Grid>
        </Grid>
      </div>
      <SolutionContainer>
        <>
          {isSingleSolution
            ? renderSingleSolutionTitle()
            : renderMultiSolutionTabs()}

          <Grid
            container
            justify="flex-start"
            direction="column"
            className={MuiClasses.tabContent}
          >
            {stepWiseSolution[activeTab].solutionSteps.map(
              ({ solution, stepNo }) => {
                const totalSteps =
                  stepWiseSolution[activeTab].solutionSteps.length;
                return (
                  <Grid item key={stepNo}>
                    {totalSteps > 1 && (
                      <Typography className={MuiClasses.stepSubHeading}>
                        Step - {stepNo}
                      </Typography>
                    )}
                    <div className="overflowContainer">
                      <MathJax.Context options={{ messageStyle: 'none' }}>
                        <MathJax.Html html={solution} />
                      </MathJax.Context>
                    </div>
                  </Grid>
                );
              },
            )}
            {stepWiseSolution[activeTab].formulaUsed && (
              <Grid item className={MuiClasses.formulaSection}>
                <Typography className={MuiClasses.HeadingTxt}>
                  Formula Used
                </Typography>
                <div className="overflowContainer">
                  <MathJax.Context options={{ messageStyle: 'none' }}>
                    <MathJax.Html
                      html={stepWiseSolution[activeTab].formulaUsed}
                    />
                  </MathJax.Context>
                </div>
              </Grid>
            )}
          </Grid>
        </>
      </SolutionContainer>
    </div>
  );
}

export default withStyles(styles)(Questions);
