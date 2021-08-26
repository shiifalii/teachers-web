import React from 'react';
import { StudentAnalyticsListItem } from 'app/types/studentAnalytics.screen.types';
import {
  Listing,
  StudentAvatar,
  MarksHeading,
  AvatarContainer,
  RankBadge,
} from '../styles';
import { UserAvatar } from 'app/components/atoms';
import { getColorCode } from 'app/helpers/comman.helper';
import Meter from './Meter';
import { getStudentAuthToken } from 'app/helpers/private.api.helper';
import MarksDescriptionToolTip from './MarksDescriptionToolTip';

interface StudentListingProps {
  student: StudentAnalyticsListItem;
  testName: string;
  highlightedName: JSX.Element;
}

function StudentListing(props: StudentListingProps) {
  const {
    student: {
      name,
      imgUrl,
      attempted,
      marksScored,
      totalMarks,
      rank,
      enrollmentNo,
      courseId,
      mypatStudentId,
      attemptId,
      testId,
      testType,
    },
    testName,
    highlightedName,
  } = props;

  const clickHandler = async () => {
    try {
      const response = await getStudentAuthToken({ courseId, mypatStudentId });
      const {
        data: { authToken, mypatUrl },
      } = response.data;

      if (attempted) {
        const resultData = encodeURIComponent(
          JSON.stringify({ testId, attemptId, testType, testName, courseId }),
        );
        const redirectUrl = encodeURI(
          window.location.href
            .split('/')
            .slice(0, 3)
            .join('/'),
        );
        Object.assign(document.createElement('a'), {
          target: '_blank',
          href: `${mypatUrl}?authToken=${authToken}&resultData=${resultData}&redirectUrl=${redirectUrl}`,
        }).click();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ cursor: 'pointer' }} onClick={clickHandler}>
      <Listing>
        <li>
          <div>
            <AvatarContainer>
              {imgUrl ? (
                <StudentAvatar src={imgUrl} alt="Student" />
              ) : (
                <UserAvatar>
                  <span
                    style={{
                      backgroundColor: `${name[0] &&
                        getColorCode(name[0].toLowerCase())}`,
                      color: '#fff',
                    }}
                  >
                    {name[0]}
                  </span>
                </UserAvatar>
              )}
              {rank < 4 && <RankBadge>{rank}</RankBadge>}
            </AvatarContainer>
            <div>
              <span className="studentName">{highlightedName}</span>
              <div className="enrollmentNo">ID: {enrollmentNo}</div>
            </div>
          </div>
          {/* <div>{attempted ? <MarksDescriptionToolTip /> : ''}</div> */}
          {attempted ? (
            <>
              <div>
                <div className="scoreDiv">
                  <MarksHeading>
                    <span className="marksScored">{marksScored}</span>
                    <span className="totalMarks">/{totalMarks}</span>
                  </MarksHeading>
                  <Meter score={marksScored!} total={totalMarks!} />
                  <div style={{ color: '#999999' }}>Score</div>
                </div>
              </div>
              <div>&gt;</div>
            </>
          ) : (
            <div className="notattempt">Not Attempted</div>
          )}
        </li>
      </Listing>
    </div>
  );
}

export default React.memo(StudentListing);
