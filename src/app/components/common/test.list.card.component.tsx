import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from '@material-ui/core';
import { getCourseNameById } from 'app/helpers/local.storage.helper';
import { Center, Button } from '..';
import Grid from '@material-ui/core/Grid';
import { Drawer } from '@material-ui/core';
import { testInterface } from 'app/types/test.screen.types';
import { ClickedViewDetailsAnalyticEvent } from 'app/helpers/analytics.helper';
import { HiddenDesktop, HiddenMobile } from '..';
import { Dot } from './common.screen.styles';

const Listing = styled.div`
  border-bottom: 1px solid #e9e9e9;
  cursor: pointer;
  display: grid;
  grid-template-columns: 98% 2%;
  padding: 20px;
  @media (max-width: 768px) {
    grid-template-columns: 90% 10%;
  }
  @media (max-width: 360px) {
    padding: 10px;
  }
  > div:nth-of-type(1) {
    display: grid;
    grid-template-columns: 61% 17% 21%;
    @media (max-width: 768px) {
      display: initial;
    }
  }
  &:hover {
    background-color: #f5f5f5;
    transition: all 0.4s ease-in-out;
  }

  &:last-child() {
    border: none;
  }

  div:nth-of-type(2) {
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      @media (max-width: 768px) {
        margin-right: 10px;
      }
    }
    @media (max-width: 768px) {
      font-size: 13px;
      /* display: inline; */
      padding-left: 10px;
    }
  }
  div:nth-of-type(3) {
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 768px) {
      font-size: 13px;
      justify-content: flex-start;
      display: inline;
    }
  }

  span {
    font-size: 14px;
    @media (max-width: 360px) {
      font-size: 12px;
    }
  }

  }
  li {
    display: grid;
    grid-template-columns: 68% 15% 2% 12% 3%;
    padding: 1.5em;
    justify-content: space-between;
    font-size: 14px;
    div:last-child {
      font-size: 20px;
    }
    @media (max-width: 768px) {
      grid-template-columns: 90% 10%;
    }
    @media (max-width: 360px) {
      padding: 10px;
    }
  }
`;

const Proficiency = styled.span`
  font-size: 12px !important;
  color: #666666;
`;

const ListingIndex = styled.span`
  margin-right: 5px;
`;

const LinkEdit = styled(Link)`
  cursor: pointer;
  font-size: 14px;
`;

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.15);
  padding: 10px;
`;

const ButtonEdit = styled(Button as any)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const TestName = styled.p`
  color: #333;
  font-size: 16px;
  display: flex;
  @media (max-width: 768px) {
    font-size: 14px;
    display: flex;
  }
`;

const SidebarContainer = styled.div`
  max-width: 540px;
  width: 100%;
`;

const SidebarHeader = styled.div`
  box-shadow: 0px 5px 8px rgba(212, 212, 212, 0.5);
  padding: 20px;
  font-size: 18px;
`;

const SidebarBody = styled.div`
  padding: 20px;

  h4 {
    font-weight: normal;
    font-size: 22px;
    color: #333333;
    margin-bottom: 10px;
  }

  h5 {
    font-weight: normal;
    font-size: 20px;
    color: #333333;
    margin-bottom: 10px;
  }

  span {
    color: #999999;
    margin-right: 10px;
  }

  b {
    color: #656565;
    font-weight: normal;
  }
`;

const Block = styled.div`
  margin: 30px 10px;
`;

const SidebarFooter = styled.div`
  padding: 20px;
  /* position: absolute;
  bottom: 50px; */
  width: 100%;
  text-align: center;
`;

const SideBarButton = styled(Button as any)`
  max-width: 300px;
  width: 100%;
`;

const SyllabusText = styled.p`
  color: #999999;
`;

const PointerCursor = styled.div`
  img {
    cursor: pointer;
  }
`;
const Clickable = styled.div`
  font-size: 22px;
  cursor: pointer;
`;

const TestNameBlock = styled.span`
  font-size: 20px;
  display: flex;
  flex-direction: column;
`;

const HiddenDesktopSpan = styled(HiddenDesktop as any)`
  display: inline;
`;

const HiddenMobileSpan = styled(HiddenMobile as any)`
  display: inline;
`;

const calculateDuration = function(minutes: number) {
  if (minutes < 60) {
    return minutes + ' minutes ';
  } else {
    /*
      checkes if munutes grater then 59
    */
    if (minutes % 60 === 0) {
      const hours = Math.floor(minutes / 60);
      if (hours === 1) {
        return hours + ' hour ';
      } else {
        return hours + ' hours ';
      }
    } else {
      const hours = Math.floor(minutes / 60);
      const minutesToShow = minutes % 60;
      return `${hours} hours ${minutesToShow} minutes`;
    }
  }
};

export interface TestListCardComponentProps {
  sNo: number;
  mode: 'data' | 'list';
  test: testInterface;
  conceptName?: string;
  highlightedName: JSX.Element;
  handleClick: () => void;
}

const TestListCardComponent = function(props: TestListCardComponentProps) {
  const { sNo, mode, test, conceptName, handleClick, highlightedName } = props;
  const {
    name,
    courseId,
    duration,
    totalMarks,
    questionsCount,
    syllabus,
    stats,
  } = test;

  // const [drowerState, setDrowerState] = useState(false);
  return (
    <div>
      <Listing onClick={handleClick}>
        <div>
          <div>
            <TestName>
              <ListingIndex>{sNo}. </ListingIndex>
              <TestNameBlock>
                {highlightedName}
                <Proficiency>
                  {getCourseNameById(courseId) +
                    ', ' +
                    calculateDuration(duration)}
                </Proficiency>

                <HiddenDesktop>
                  {!stats || !stats.attempted ? (
                    <>
                      <div>
                        <span
                          style={{
                            textAlign: 'center',
                            fontSize: '12px',
                            color: '#666666',
                          }}
                        >
                          No attempts yet
                        </span>
                      </div>

                      <HiddenMobileSpan style={{ textAlign: 'center' }}>
                        <div>NA</div>
                      </HiddenMobileSpan>
                    </>
                  ) : (
                    <>
                      <span
                        style={{
                          textAlign: 'center',
                          fontSize: '12px',
                          color: '#666666',
                        }}
                      >
                        {' '}
                        Submissions{' '}
                        {`${stats.submissions.count}/${stats.submissions.total}`}
                      </span>
                      <Dot>.</Dot>
                      <span
                        style={{
                          textAlign: 'center',
                          fontSize: '12px',
                          color: '#666666',
                        }}
                      >
                        Avg. Score {stats.proficiency}
                      </span>
                    </>
                  )}
                </HiddenDesktop>
              </TestNameBlock>
            </TestName>
          </div>

          {/* <div>
              {mode === 'list' ? (
                ''
              ) : stats && stats.attempted ? (
                <p>
                  <span>Avg . Score {stats.proficiency} . Submissions </span>
                  <span>{`${stats.submissions.count}/${stats.submissions.total}`}</span>
                </p>
              ) : (
                <p>No attempts yet</p>
              )}
            </div> */}
          {!stats || !stats.attempted ? (
            <>
              <HiddenMobile>
                <div>
                  <span style={{ textAlign: 'center' }}>No attempts yet</span>
                </div>
              </HiddenMobile>

              <HiddenMobile style={{ textAlign: 'center' }}>
                <div>NA</div>
              </HiddenMobile>
            </>
          ) : (
            <>
              <HiddenMobile>
                <span>
                  {' '}
                  <HiddenDesktopSpan> Submissions</HiddenDesktopSpan>{' '}
                  {`${stats.submissions.count}/${stats.submissions.total}`}
                </span>
              </HiddenMobile>

              <HiddenMobile>
                <span>
                  <HiddenDesktopSpan>Avg. Score </HiddenDesktopSpan>
                  {stats.proficiency}
                </span>
              </HiddenMobile>
            </>
          )}
        </div>
        <Clickable
          onClick={() => {
            // setDrowerState(true);
            // Trigger analytics - Event name = clicked_ViewDetail
            ClickedViewDetailsAnalyticEvent({
              testName: name,
              goal: getCourseNameById(courseId),
              topicName: conceptName as string,
            });
          }}
        >
          {' '}
          &gt;
        </Clickable>
      </Listing>
    </div>
  );
};

export default TestListCardComponent;
