import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { UserAvatar, Flex, HiddenDesktop } from '../atoms';
import { getColorCode } from '../../helpers/comman.helper';
import { getOrgTypeInStorage } from 'app/helpers/local.storage.helper';
import { Dot } from 'app/components/common/common.screen.styles';

export interface CardProps {
  name: string | JSX.Element;
  initials?: string;
  proficiency: string;
  topic: string;
  batchId: string;
  index: number;
  enrollmentNo: string;
  studentId: string;
}

const Listing = styled.div`
  border-bottom: 1px solid #e9e9e9;
  cursor: pointer;
  display: grid;
  grid-template-columns: 98% 2%;
  padding: 15px;
  > div:nth-of-type(1) {
    display: grid;
    grid-template-columns: 6% 94%;

    @media (max-width: 768px) {
      grid-template-columns: 15% 85%;
    }

    > div:nth-of-type(2) {
      display: grid;
      grid-template-columns: 68% 15% 17%;
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
  }
`;

const EnrollmentNo = styled.span`
  display: block;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Proficiency = styled.span`
  text-align: center;
  @media (max-width: 380px) {
    font-size: 11px !important;
  }
`;

const Topic = styled.span`
  text-align: center;
  @media (max-width: 380px) {
    font-size: 11px !important;
    margin: 0 5px;
  }
`;

const HiddenDesktopSpan = styled(HiddenDesktop as any)`
  display: inline;
  margin-right: 5px;
`;

const StudentCardComponent = function(props: CardProps) {
  const history = useHistory();
  const {
    name,
    proficiency,
    enrollmentNo,
    topic,
    initials,
    batchId,
    studentId,
  } = props;

  const seeStudentInfo = () => {
    history.push('/anytime-ptm/student-profile/' + studentId);
  };

  return (
    <Listing>
      <div onClick={seeStudentInfo}>
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
            <span>{name}</span>
            <EnrollmentNo>
              {getIdName()}: {enrollmentNo}
            </EnrollmentNo>
          </div>

          <Proficiency>
            <HiddenDesktopSpan>Proficiency</HiddenDesktopSpan>
            {proficiency}
          </Proficiency>
          <HiddenDesktopSpan>
            <Dot>.</Dot>
          </HiddenDesktopSpan>
          <Topic>
            <HiddenDesktopSpan>Submissions</HiddenDesktopSpan>
            {topic}
          </Topic>
        </div>
      </div>
    </Listing>
  );
};

const getIdName = () => {
  const orgType = getOrgTypeInStorage();
  if (orgType === 'institute') {
    return 'Enrollment No';
  }
  return 'School ID';
};

export default StudentCardComponent;
