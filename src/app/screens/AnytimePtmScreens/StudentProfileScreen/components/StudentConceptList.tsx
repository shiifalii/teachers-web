import React from 'react';
import { useStyles, NoData } from '../styles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import BorderLinearProgress from './BorderLinearProgress';

interface IStudentConceptList {
  concepts: any[];
}

export default function StudentConceptList({ concepts }: IStudentConceptList) {
  const classes = useStyles();

  const formatStats = (score: number) => {
    if (typeof score !== 'number') return score;
    if (score % 1 === 0) return score;
    return score.toFixed(2);
  };

  return (
    <ul className={classes.tabsContainer}>
      {concepts.map(
        (
          {
            _id,
            name,
            subjectId,
            courseName,
            assignedQuestions,
            attemptPercentage,
            accuracyScore,
            avgScore,
          },
          index,
        ) => (
          <li key={name}>
            <div>
              <h4>
                {index + 1}. {name}
              </h4>
              <p>
                <span className="nameText">
                  <b>Subject : </b>Science
                </span>
                <span className="nameText">
                  <b>Goal : </b>
                  {courseName}
                </span>
              </p>
              <p className="rateText">
                <span className="nameText1">
                  <b>Questions Assigned : </b>
                  <br /> {assignedQuestions}
                </span>
                <span className="nameText1">
                  <b>Attempt Rate : </b>
                  <br />
                  {formatStats(attemptPercentage)}%
                </span>
                <span className="nameText1">
                  <b>Accuracy Rate : </b>
                  <br /> {formatStats(accuracyScore)}%
                </span>
              </p>
            </div>
            <div className="marksScoreConceptList">
              <p>Marks Scored : </p>
              <b>{formatStats(avgScore)} % </b>

              <div className="scoreProgressBar">
                <BorderLinearProgress
                  variant="determinate"
                  value={parseInt(avgScore)}
                />
              </div>
            </div>
          </li>
        ),
      )}

      {concepts.length === 0 && (
        <NoData>
          <p>Nothing to display</p>
        </NoData>
      )}

      {/* 
      <li>
        <div>
          <h4>2. Coal and Petroleum</h4>
          <p>
            <span className="dateText">
              <b>Subject : </b>Science
            </span>
            <span className="dateText">
              <b>Goal : </b>NTSE & Fundamentals of Engineering and Medical-2020
            </span>
          </p>
          <p>
            <span className="dateText">
              <b>Questions Assigned : </b>10
            </span>
            <span className="dateText">
              <b>Attempt Rate : </b>100%
            </span>
            <span className="dateText">
              <b>Accuracy Rate : </b>70%
            </span>
          </p>
        </div>
        <div className="marksScore">
          <p>Marks Scored : </p>
          <b>90.0 % </b>
        </div>
      </li>

      <li>
        <div>
          <h4>3. Coal and Petroleum</h4>
          <p>
            <span className="dateText">
              <b>Subject : </b>Science
            </span>
            <span className="dateText">
              <b>Goal : </b>NTSE & Fundamentals of Engineering and Medical-2020
            </span>
          </p>
          <p>
            <span className="dateText">
              <b>Questions Assigned : </b>10
            </span>
            <span className="dateText">
              <b>Attempt Rate : </b>100%
            </span>
            <span className="dateText">
              <b>Accuracy Rate : </b>70%
            </span>
          </p>
        </div>
        <div className="marksScore">
          <p>Marks Scored : </p>
          <b>90.0 % </b>
        </div>
      </li>

      <li>
        <div>
          <h4>4. Coal and Petroleum</h4>
          <p>
            <span className="dateText">
              <b>Subject : </b>Science
            </span>
            <span className="dateText">
              <b>Goal : </b>NTSE & Fundamentals of Engineering and Medical-2020
            </span>
          </p>
          <p>
            <span className="dateText">
              <b>Questions Assigned : </b>10
            </span>
            <span className="dateText">
              <b>Attempt Rate : </b>100%
            </span>
            <span className="dateText">
              <b>Accuracy Rate : </b>70%
            </span>
          </p>
        </div>
        <div className="marksScore">
          <p>Marks Scored : </p>
          <b>90.0 % </b>
        </div>
      </li>

       */}
    </ul>
  );
}
