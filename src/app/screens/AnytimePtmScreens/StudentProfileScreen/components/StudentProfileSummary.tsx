import React from 'react';
import { useStyles } from '../styles';

function StudentProfileSummary({ summary }: any) {
  const classes = useStyles();
  const {
    batchRank = 'NA',
    completedAssignments = 'NA',
    avgScore = 'NA',
    avgAccuracyRate = 'NA',
  } = summary;

  const formatStats = (score: number) => {
    if (typeof score !== 'number') return score;
    if (score % 1 === 0) return score;
    return score.toFixed(2);
  };

  return (
    <div className={classes.rankScoreContainer}>
      <div className={classes.categoryIcon}>
        <div>
          <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/rank-icon.svg" />
        </div>
        <div>
          <h3>{batchRank === 'NA' ? '-' : `Rank ${batchRank}`}</h3>
          <p>Class Rank</p>
        </div>
      </div>
      <div className={classes.categoryIcon}>
        <div>
          <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/assignment-icon.svg" />
        </div>
        <div>
          <h3>{completedAssignments === 'NA' ? '-' : completedAssignments}</h3>
          <p>Completed Assignments</p>
        </div>
      </div>

      <div className={classes.categoryIcon}>
        <div>
          <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/avgscore-icon.svg" />
        </div>
        <div>
          <h3>{avgScore === 'NA' ? '-' : `${formatStats(avgScore)}%`}</h3>
          <p>Avg. Score</p>
        </div>
      </div>

      <div className={classes.categoryIcon}>
        <div>
          <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/avgrate-icon.svg" />
        </div>
        <div>
          <h3>
            {avgAccuracyRate === 'NA'
              ? '-'
              : `${formatStats(avgAccuracyRate)}%`}
          </h3>
          <p>Avg. Accuracy Rate</p>
        </div>
      </div>
    </div>
  );
}

export default StudentProfileSummary;
