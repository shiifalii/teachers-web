import React, { useState, useRef, useEffect } from 'react';
import CircularProgress, {
  CircularProgressProps,
} from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import styled from 'styled-components';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CommonListCardComponent from '../../../components/common/common.list.card.component';
import {
  Container,
  InputContainer,
  HiddenMobile,
  HiddenDesktop,
} from '../../../components';
import { useHistory, useParams } from 'react-router-dom';
import { Dot } from 'app/components/common/common.screen.styles';
import Highlighted from 'app/components/atoms/highlighted';
import EmptyScreenGridView from './empty-screen';

import {
  filterData,
  IListObj,
  IChapter,
  IStudent,
  isLoading,
  isApiFailed,
  titleCase,
  getNameByOrgType,
} from '../../../helpers/comman.helper';
const StyledAccordion = styled(Accordion)`

  .MuiAccordionSummary-root.active {
    background-color: #f0f7ff;
  }
  .subjectName {
    font-size: 20px;
    display: flex;
    align-items: center;
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }
  .subjectName img{
      margin-right:10px;
      @media (max-width: 768px) {
        margin-right:6px;
      }
    }
  }
  .MuiAccordionSummary-content {
    display: grid;
    grid-template-columns: 70% 15% 15%;
    .subjectProficency,
    .subjectTopic {
      text-align: center;
    }
    @media (max-width: 768px) {
      display: block;
      .subjectProficency,
      .subjectTopic {
        text-align: left;
        display: inline-block;
        font-size: 10px;
        line-height: 16px;
        color: #999999;
      }
    }
  }
  .gridContainer {
    background: #fff;
    display: flex;
    padding: 22px 16px;
    display: grid;
    grid-template-columns: 50% 50%;
    @media (max-width: 768px){
      padding:2px;
      grid-template-columns: 100%;
    }
  }
  .gridViewContainer {
    display: content;
  }
  .gridCard {
    height: 185px;
    margin: 6px;
    border: solid 1px #e9e9e9;
    padding: 10px 20px 10px 10px;
    border-radius: 4px;
    .scrollbox{
      height:130px;
      overflow-y:scroll;
    }
  }
  .firstRow {
    display: grid;
    grid-template-columns: 80% 20%;
    margin-bottom: 14px;
    @media (max-width: 768px){
      grid-template-columns: 75% 25%;
    }
    .title {
      font-size: 16px;
      font-weight: 500;
      color: #666;
      align-items: center;
      display: flex;
      @media (max-width: 768px){
        font-size:12px;
      }
      b {
        font-weight: 500;
      }
      img {
        margin-right: 5px;
      }
    }
    .subTitle {
      font-size: 12px;
      font-weight: normal;
      color: #999;
      @media (max-width: 768px){
        font-size: 10px;
        font-weight:400;
      }
    }
  }
  .topicListPie {
    background: #fff;
    border-radius: 4px;
    display: grid;
    height: 64px;
    grid-template-columns: 80% 20%;
    padding: 14px 20px 14px 14px;
    position: relative;
    cursor: pointer;
    @media (max-width: 768px){
      height:47px;
      padding:6px;
      grid-template-columns: 70% 30%;
    }
    b {
      font-size: 16px;
      font-weight: normal;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      width: 100%;
      display: flex;
      @media (max-width: 768px){
        line-height:16px;
        font-size:12px;
        font-weight:400;
        max-width: 92%;
    text-overflow: ellipsis;
    overflow: hidden;
    display: block;
      }
    }
    i {
      font-style: normal;
      font-size: 12px;
      color: #999;
      @media (max-width: 768px){
        font-size: 10px;
        font-weight:400;
      }
      em {
        font-style: normal;
        color: #666;
      }
    }
  }
  .topicListPie:nth-child(2) {
    background: #f9fcff;
  }
  .topicListPie::after {
    content: '';
    width: 8px;
    height: 15px;
    background: url(https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/pieListArrow.svg)
      center center;
    position: absolute;
    right: 20px;
    top: 27px;
    z-index: 1;
    @media (max-width: 768px){
      top:14px;
    }
  }
  .leftPad20 {
    padding-left: 20px;
  }
  .notAttemptlist img {
    width: 39px;
    height: 39px;
    @media (max-width:768px){
      width: 34px;
      height: 34px; 
    }
  }
  .colorPieGreen{
    color:#30BE76;
  }
  .colorPieYellow{
    color:#FFCE07;
  }
  .colorPieRed{
    color:#F21D1D;
  }
  @media (max-width:768px){
    div[role=progressbar]{
      width:32px !important;
      height:32px !important;
    }
    .MuiTypography-colorTextSecondary{
      font-size:10px;
    }
  }
  
::-webkit-scrollbar{
  width: 0.4em;
}
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px #dfdfdf;
}
::-webkit-scrollbar-thumb{
  background-color: #ccc;
  border: 1px solid #ccc;
}

`;

const HiddenDesktopSpan = styled(HiddenDesktop as any)`
  display: inline;
  margin-right: 5px;
`;

interface IProps {
  finalData: any;
  currentExpanded: any;
  batchId: any;
  parentIds: any;
  searchText: any;
  batchName: any;
  expand: any;
  topicsData: any;
  currentMode: any;
}

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number },
) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
        color="yellow"
      >
        <Typography
          variant="caption"
          component="div"
          color="textSecondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

function CircularStatic() {
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prevProgress =>
        prevProgress >= 100 ? 0 : prevProgress + 10,
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <CircularProgressWithLabel value={progress} />;
}

function getProficiencyValue(chapObj: any) {
  return parseInt(chapObj.proficiency);
}

// function getAverageMarks(chapObj: any) {
//   let avg = chapObj.marksScored / chapObj.totalMarks;
//   return avg * 100;
// }

function GridView(props: IProps) {
  const history = useHistory();
  let allSubjectsData = props.finalData;
  for (let i = 0; i < allSubjectsData.length; i++) {
    let strong = [];
    let unattempted = [];
    let weak = [];
    let average = [];
    if (props.currentMode === 'chapter') {
      for (let j = 0; j < allSubjectsData[i].chapters.length; j++) {
        let checkProfValue = getProficiencyValue(
          allSubjectsData[i].chapters[j],
        );
        // getAverageMarks(allSubjectsData[i].chapters[j]);
        if (allSubjectsData[i].chapters[j].proficiency === 'NA') {
          unattempted.push(allSubjectsData[i].chapters[j]);
        } else if (checkProfValue > 80) {
          strong.push(allSubjectsData[i].chapters[j]);
        } else if (checkProfValue > 60 && checkProfValue < 80) {
          average.push(allSubjectsData[i].chapters[j]);
        } else if (checkProfValue < 60) {
          weak.push(allSubjectsData[i].chapters[j]);
        }
      }
    } else {
      for (let j = 0; j < props.topicsData.length; j++) {
        let checkProfValue = getProficiencyValue(props.topicsData[j]);
        if (props.topicsData[j].proficiency === 'NA') {
          unattempted.push(props.topicsData[j]);
        } else if (checkProfValue > 80) {
          strong.push(props.topicsData[j]);
        } else if (checkProfValue > 60 && checkProfValue < 80) {
          average.push(props.topicsData[j]);
        } else if (checkProfValue < 60) {
          weak.push(props.topicsData[j]);
        }
      }
    }
    allSubjectsData[i]['unattempted'] = unattempted;
    allSubjectsData[i]['strong'] = strong;
    allSubjectsData[i]['average'] = average;
    allSubjectsData[i]['weak'] = weak;
  }
  const handleExpanded = (e: any) => {
    props.expand(e);
  };
  const getSubjectIcon = (e: string) => {
    switch (e) {
      case 'Mathematics': {
        return 'https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/mathIcon.svg';
      }
      case 'Science': {
        return 'https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/scienceIcon.svg';
      }
      case 'Social Science': {
        return 'https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/socialScienceIcon.svg';
      }
      case 'Chemistry': {
        return 'https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/chemistryIcon.svg';
      }
      case 'Physics': {
        return 'https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/physicsIcon.svg';
      }
      case 'English': {
        return 'https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/englishIcon.svg';
      }
      case 'Hindi': {
        return 'https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/hindiIcon.svg';
      }
    }
  };
  useEffect(() => {}, []);

  const navigate = (data: any) => {
    if (props.currentMode === 'chapter') {
      const chapterIds = data.ids.join(',');
      const chapterName = data.name;
      history.push(
        `/concepts/${props.batchId}/${props.parentIds}/${chapterIds}/${props.batchName}/${chapterName}`,
      );
    } else {
      const url = `/tests/${props.batchId}/${data.ids.join(
        ',',
      )}/${encodeURIComponent(data.name)}/
        ${data.isLocked}/${props.batchName}/${props.parentIds}/${data.ids.join(
        ',',
      )}/${data.name}`;
      history.push(url);
    }
  };

  return (
    <>
      {allSubjectsData.map((data: any, index: any) => {
        const { subject, chapters, average, strong, unattempted, weak } = data;
        return (
          <StyledAccordion
            key={index}
            expanded={props.currentExpanded === index}
            onChange={() => handleExpanded(index)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              className={props.currentExpanded === index ? 'active' : ''}
              aria-controls={`subject-${subject.name}`}
              id={`subject-${subject.name}-heading`}
            >
              <div className="subjectName">
                <img src={getSubjectIcon(subject.name)}></img>
                {subject.name}
              </div>
              <div className="subjectProficency">
                <HiddenDesktopSpan> Proficiency</HiddenDesktopSpan>
                {subject.proficiency}
              </div>
              <HiddenDesktopSpan>
                <Dot>.</Dot>
              </HiddenDesktopSpan>
              <div className="subjectTopic">
                <HiddenDesktopSpan> Topics</HiddenDesktopSpan>
                {subject.topics.unlocked}/{subject.topics.total}
              </div>
            </AccordionSummary>
            <div className="gridContainer">
              <div className="gridViewContainer">
                <div className="gridCard">
                  <div className="firstRow">
                    <div className="title">
                      <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/strongIcon.svg" />
                      <b>Strong ({strong.length})</b>
                    </div>
                    <span className="subTitle">Proficiency</span>
                  </div>
                  <div className="scrollbox">
                    {strong.length > 0 ? (
                      strong.map((strongData: any, strongIndex: any) => (
                        <div
                          className="topicListPie"
                          key={strongIndex}
                          onClick={() => navigate(strongData)}
                        >
                          <div>
                            <b>{strongData.name}</b>
                            <i>
                              Tests Unlocked{' '}
                              <em>
                                {strongData.topics.unlocked}/
                                {strongData.topics.total}
                              </em>
                            </i>
                          </div>
                          <div className="leftPad20">
                            <CircularProgressWithLabel
                              className="colorPieGreen"
                              value={parseInt(strongData.proficiency)}
                            />
                          </div>
                        </div>
                      ))
                    ) : (
                      <EmptyScreenGridView type={'strong'} />
                    )}
                  </div>
                </div>
                <div className="gridCard">
                  <div className="firstRow">
                    <div className="title">
                      <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/weakIcon.svg" />
                      <b>Weak ({weak.length})</b>
                    </div>
                    <span className="subTitle">Proficiency</span>
                  </div>
                  <div className="scrollbox">
                    {weak.length > 0 ? (
                      weak.map((weakData: any, weakIndex: any) => (
                        <div
                          className="topicListPie"
                          key={weakIndex}
                          onClick={() => navigate(weakData)}
                        >
                          <div>
                            <b>{weakData.name}</b>
                            <i>
                              Tests Unlocked{' '}
                              <em>
                                {weakData.topics.unlocked}/
                                {weakData.topics.total}
                              </em>
                            </i>
                          </div>
                          <div className="leftPad20">
                            <CircularProgressWithLabel
                              className="colorPieRed"
                              value={parseInt(weakData.proficiency)}
                            />
                          </div>
                        </div>
                      ))
                    ) : (
                      <EmptyScreenGridView type={'weak'} />
                    )}
                  </div>
                </div>
              </div>
              <div className="gridViewContainer">
                <div className="gridCard">
                  <div className="firstRow">
                    <div className="title">
                      <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/averageIcon.svg" />
                      <b>Average ({average.length})</b>
                    </div>
                    <span className="subTitle">Proficiency</span>
                  </div>
                  <div className="scrollbox">
                    {average.length > 0 ? (
                      average.map((avgData: any, avgIndex: any) => (
                        <div
                          className="topicListPie"
                          key={avgIndex}
                          onClick={() => navigate(avgData)}
                        >
                          <div>
                            <b>{avgData.name}</b>
                            <i>
                              Tests Unlocked{' '}
                              <em>
                                {avgData.topics.unlocked}/{avgData.topics.total}
                              </em>
                            </i>
                          </div>
                          <div className="leftPad20">
                            <CircularProgressWithLabel
                              className="colorPieYellow"
                              value={parseInt(avgData.proficiency)}
                            />
                          </div>
                        </div>
                      ))
                    ) : (
                      <EmptyScreenGridView type={'average'} />
                    )}
                  </div>
                </div>

                <div className="gridCard">
                  <div className="firstRow">
                    <div className="title">
                      <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/notAttemptIcon.svg" />
                      <b>Unattempted ({unattempted.length})</b>
                    </div>
                    <span className="subTitle">Proficiency</span>
                  </div>
                  <div className="scrollbox">
                    {unattempted.length > 0 ? (
                      unattempted.map(
                        (unattemptedData: any, unattemptedIndex: any) => (
                          <div
                            className="topicListPie"
                            key={unattemptedIndex}
                            onClick={() => navigate(unattemptedData)}
                          >
                            <div>
                              <b>{unattemptedData.name}</b>
                              <i>
                                Tests Unlocked{' '}
                                <em>
                                  {unattemptedData.topics.unlocked}/
                                  {unattemptedData.topics.total}
                                </em>
                              </i>
                            </div>
                            <div className="notAttemptlist leftPad20">
                              <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/notAttemptIcon.svg" />
                            </div>
                          </div>
                        ),
                      )
                    ) : (
                      <EmptyScreenGridView type={'unattempted'} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </StyledAccordion>
        );
      })}
    </>
  );
}

export default GridView;
