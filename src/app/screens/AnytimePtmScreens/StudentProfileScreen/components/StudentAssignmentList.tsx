import React from 'react';
import { List, ListItem } from '@material-ui/core';
import {
  Heading,
  useStyles,
  Grid1,
  TabHeaderContainer,
  NoData,
} from '../styles';
import { TEACHERSV2_URL } from 'app/constants/config.constant';
import { HiddenDesktop, HiddenMobile } from 'app/components';
import { LOGIN_TOKEN_KEY } from 'app/helpers/local.storage.helper';
interface IStudentAssignmentList {
  assignments: any[];
}

export default function StudentAssignmentList({
  assignments,
}: IStudentAssignmentList) {
  const titleCaseWord = (word: string) => {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  };
  const formatStats = (score: number) => {
    if (typeof score !== 'number') return score;
    if (score % 1 === 0) return score;
    return score.toFixed(2);
  };
  const dateFormatter = (date: any) => {
    date = new Date(date);
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return `${dd}/${mm}/${yyyy}`;
  };

  const classes = useStyles();
  const authToken = localStorage.getItem(LOGIN_TOKEN_KEY);

  return (
    <ul className={classes.tabsContainer}>
      {assignments.map(
        ({ _id, score, startDate, dueDate, test, type, status }: any) => (
          <li key={_id}>
            <div>
              {status === 'active' ? (
                <span className="liveTag">Live</span>
              ) : (
                <span className="pastTag">Past</span>
              )}

              <span className="testName">{titleCaseWord(type)} Test</span>
              <h3>{test}</h3>
              <p>
                <span className="dateText">
                  <b>Creation Date : </b>
                  {dateFormatter(startDate)}
                </span>
                <span className="dateText">
                  <b>Due Date : </b>
                  {dateFormatter(dueDate)}
                </span>
                {/* 
                <span className="dateText">
                  <b>Submit Date : </b>
                  {dateFormatter(dueDate)}
                </span>
                 */}
              </p>
            </div>
            <div className="marksScore">
              <HiddenMobile>
                <p>Marks Scored : </p>
                <b>{formatStats(score)} % </b>
              </HiddenMobile>
              <HiddenDesktop>
                <div>
                  <p>Marks Scored : </p>
                  <b>{formatStats(score)} % </b>
                </div>
              </HiddenDesktop>
              {status !== 'active' && (
                <a
                  href={`${TEACHERSV2_URL}/public/login?token=${authToken}&redirectUrl=assignments/${_id}`}
                  // href={`http://localhost:4505/public/login?token=${authToken}&redirectUrl=assignments/${_id}`}
                  target="_blank"
                >
                  <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/graphIcon.svg" />{' '}
                  View Result
                  <svg
                    width="10"
                    height="16"
                    viewBox="0 0 10 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1 1L8 8L1 15" stroke="#1D7DEA" strokeWidth="2" />
                  </svg>
                </a>
              )}
            </div>
          </li>
        ),
      )}

      {assignments.length === 0 && (
        <NoData>
          <p>Nothing to display</p>
        </NoData>
      )}

      {/*     
      <li>
        <div>
          <span className="pastTag">Past</span>
          <span className="testName">Chap Test</span>
          <h3>CPP Mathematics 8 Jan 2021</h3>
          <p>
            <span className="dateText">
              <b>Creation Date : </b>19/01/2021
            </span>
            <span className="dateText">
              <b>Due Date : </b>19/01/2021
            </span>
            <span className="dateText">
              <b>Submit Date : </b>19/01/2021
            </span>
          </p>
        </div>
        <div className="marksScore">
          <p>Marks Scored : </p>
          <b>90.0 % </b>
          <a href="#">
            <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/graphIcon.svg" />{' '}
            View Result
            <svg
              width="10"
              height="16"
              viewBox="0 0 10 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 1L8 8L1 15" stroke="#1D7DEA" strokeWidth="2" />
            </svg>
          </a>
        </div>
      </li>

      <li>
        <div>
          <span className="liveTag">Live</span>
          <span className="testName">Chap Test</span>
          <h3>CPP Mathematics 8 Jan 2021</h3>
          <p>
            <span className="dateText">
              <b>Creation Date : </b>19/01/2021
            </span>
            <span className="dateText">
              <b>Due Date : </b>19/01/2021
            </span>
            <span className="dateText">
              <b>Submit Date : </b>19/01/2021
            </span>
          </p>
        </div>
        <div className="marksScore">
          <p>Marks Scored : </p>
          <b>90.0 % </b>
          <a href="#">
            <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/graphIcon.svg" />{' '}
            View Result
            <svg
              width="10"
              height="16"
              viewBox="0 0 10 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 1L8 8L1 15" stroke="#1D7DEA" strokeWidth="2" />
            </svg>
          </a>
        </div>
      </li>

      <li>
        <div>
          <span className="liveTag">Live</span>
          <span className="testName">Chap Test</span>
          <h3>CPP Mathematics 8 Jan 2021</h3>
          <p>
            <span className="dateText">
              <b>Creation Date : </b>19/01/2021
            </span>
            <span className="dateText">
              <b>Due Date : </b>19/01/2021
            </span>
            <span className="dateText">
              <b>Submit Date : </b>19/01/2021
            </span>
          </p>
        </div>
        <div className="marksScore">
          <p>Marks Scored : </p>
          <b>90.0 % </b>
          <a href="#">
            <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/graphIcon.svg" />{' '}
            View Result
            <svg
              width="10"
              height="16"
              viewBox="0 0 10 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 1L8 8L1 15" stroke="#1D7DEA" strokeWidth="2" />
            </svg>
          </a>
        </div>
      </li>
       */}
    </ul>
  );
}
