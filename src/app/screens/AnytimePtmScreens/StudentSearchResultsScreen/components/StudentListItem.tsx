import React from 'react';
import styled from 'styled-components';
import { UserAvatar, HiddenDesktop } from '../../../../components/atoms';
import { getColorCode } from '../../../../helpers/comman.helper';
import { getOrgTypeInStorage } from 'app/helpers/local.storage.helper';
import { useStyles } from '../styles';
import { useHistory } from 'react-router-dom';

const Listing = styled.div`
  border-bottom: 1px solid #e9e9e9;
  cursor: pointer;
  display: grid;
  grid-template-columns: 98% 2%;
  padding: 15px;
  > div:nth-of-type(1) {
    display: grid;
    grid-template-columns: 6% 92% 2%;

    @media (max-width: 768px) {
      grid-template-columns: 12% 90% 2%;
    }

    > div:nth-of-type(2) {
      display: grid;
      grid-template-columns: 100%;
      align-items: center;
      @media (max-width: 768px) {
        display: initial;
      }
    }
  }
  &:hover {
    background-color: #f5f5f5;
    transition: all 0.4s ease-in-out;
  }

  &:last-child() {
    border: none;
  }

  span {
    font-size: 14px;
    @media (max-width: 768px) {
      font-size: 12px;
    }
  }
  h3 {
    font-weight: 400;
    color: #333;
  }
`;

const EnrollmentNo = styled.span`
  display: block;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export interface IStudentListItem {
  studentId: string;
  name: string | JSX.Element;
  batchName: string;
  enrollmentNo: string;
  initials?: string;
  handleClick: any;
}

const StudentListItem = function(props: IStudentListItem) {
  const {
    studentId,
    name,
    batchName,
    enrollmentNo,
    initials,
    handleClick,
  } = props;
  const classes = useStyles();
  const history = useHistory();

  return (
    <Listing onClick={() => handleClick(studentId)}>
      <div>
        <div>
          <UserAvatar>
            <span
              style={{
                backgroundColor: `${initials &&
                  getColorCode(initials.toLowerCase())}`,
                color: '#fff',
              }}
            >
              {initials}
            </span>
          </UserAvatar>
        </div>
        <div>
          <div>
            <h3>{name}</h3>
            <EnrollmentNo>
              Class {batchName}
              <svg
                className={classes.dotIcon}
                width="2"
                height="2"
                viewBox="0 0 2 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="1" cy="1" r="1" fill="#666666" />
              </svg>
              {/* {getIdName()}: {enrollmentNo} */}
              ID - {enrollmentNo}
            </EnrollmentNo>
          </div>
        </div>
        <div className={classes.rightArrowIcon}>
          <span>
            <svg
              width="10"
              height="16"
              viewBox="0 0 10 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 1L8 8L1 15" stroke="#999999" strokeWidth="2" />
            </svg>
          </span>
        </div>
      </div>
    </Listing>
  );
};

export default StudentListItem;
