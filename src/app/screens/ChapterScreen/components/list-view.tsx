import React, { useState, useRef, useEffect } from 'react';
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
  }
  .subjectName img{
      margin-right:10px;
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
        font-size: 12px;
        line-height: 16px;
        color: #999999;
      }
    }
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

function ListView(props: IProps) {
  const history = useHistory();
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

  return (
    <>
      {props.finalData.map((data: any, index: any) => {
        const { subject, chapters } = data;
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
            <AccordionDetails style={{ padding: '0', display: 'block' }}>
              {props.currentMode === 'chapter' ? (
                <>
                  {chapters.map((chapterData: any, chapterIndex: any) => (
                    <CommonListCardComponent
                      key={chapterIndex}
                      onCardClick={() => {
                        const chapterIds = chapterData.ids.join(',');
                        const chapterName = chapterData.name;
                        history.push(
                          `/concepts/${props.batchId}/${props.parentIds}/${chapterIds}/${props.batchName}/${chapterName}`,
                        );
                      }}
                      classes={
                        <Highlighted
                          text={titleCase(chapterData.name)}
                          highlight={props.searchText}
                        />
                      }
                      proficiency={`${chapterData.proficiency}`}
                      topic={`${chapterData.topics.unlocked}/${chapterData.topics.total}`}
                      sNo={chapterIndex + 1}
                    />
                  ))}
                </>
              ) : (
                <>
                  {props.topicsData.map((topicData: any, topicIndex: any) => (
                    <CommonListCardComponent
                      key={topicIndex}
                      onCardClick={() => {
                        const url = `/tests/${
                          props.batchId
                        }/${topicData.ids.join(',')}/${encodeURIComponent(
                          topicData.name,
                        )}/${topicData.isLocked}/${props.batchName}/${
                          props.parentIds
                        }/${topicData.ids.join(',')}/${topicData.name}`;
                        history.push(url);
                      }}
                      // onCardClick={() => {
                      //   const chapterIds = topicData.ids.join(',');
                      //   const chapterName = topicData.name;
                      //   history.push(
                      //     `/concepts/${props.batchId}/${props.parentIds}/${chapterIds}/${props.batchName}/${chapterName}`,
                      //   );
                      // }}
                      classes={
                        <Highlighted
                          text={titleCase(topicData.name)}
                          highlight={props.searchText}
                        />
                      }
                      proficiency={`${topicData.proficiency}`}
                      topic={`${topicData.topics.unlocked}/${topicData.topics.total}`}
                      sNo={topicIndex + 1}
                    />
                  ))}
                </>
              )}
            </AccordionDetails>
          </StyledAccordion>
        );
      })}
    </>
  );
}

export default ListView;
