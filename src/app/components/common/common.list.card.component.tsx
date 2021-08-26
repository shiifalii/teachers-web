import React from 'react';
import styled from 'styled-components';
import { Center, HiddenDesktop, HiddenMobile } from '..';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const Listing = styled.div`
  border-bottom: 1px solid #e9e9e9;
  cursor: pointer;
  padding: 15px;
  display: grid;
  grid-template-columns: 98% 2%;
  align-items: center;
  @media (max-width: 768px) {
    grid-template-columns: 90% 10%;
  }
  > div:nth-of-type(1) {
    display: grid;
    grid-template-columns: 70% 15% 15%;
    @media (max-width: 768px) {
      display: initial;
    }

    span {
      @media (max-width: 768px) {
        /* margin-right: 10px; */
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
  .text-center {
    text-align: center;
  }
  .arrow {
    text-align: right;
  }
  span {
    font-size: 14px;
    @media (max-width: 320px) {
      font-size: 12px;
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

  @media (max-width: 768px) {
    svg {
      fill: #999;
    }
  }
`;

const CLassNames = styled.div`
  color: #333333;
  font-size: 14px;

  @media (max-width: 768px) {
    font-size: 12px;
    width: 95%;
    display: flex;
  }
`;
const ClassNameText = styled.span`
  span:nth-of-type(2) {
    font-size: 14px;
  }
`;

const HiddenDesktopSpan = styled(HiddenDesktop)`
  display: inline;
  margin-right: 10px;
`;

const Proficiency = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  text-align: center;
`;

const Dot = styled.span`
  margin: 0 10px;
`;

const IndexNo = styled.span<{
  hidesNoOnMobile?: boolean;
  children: (string | number | undefined)[];
}>`
  margin-right: 3px;
  @media (max-width: 768px) {
    display: ${({ hidesNoOnMobile }) => (hidesNoOnMobile ? 'none' : 'inline')};
  }
`;

const MobProficiency = styled.span`
  color: #999999;
`;

const MobTopic = styled.span`
  color: #999999;
`;

export interface CardProps {
  classes: string | JSX.Element;
  proficiency: string;
  topic: string;
  sNo?: number;
  hidesNoOnMobile?: boolean;
  onCardClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const CommonListCardComponent = function(props: CardProps) {
  const {
    classes,
    proficiency,
    topic,
    sNo,
    hidesNoOnMobile,
    onCardClick,
  } = props;
  return (
    <Listing onClick={onCardClick}>
      <div>
        <CLassNames>
          <IndexNo hidesNoOnMobile={hidesNoOnMobile}>{sNo}. </IndexNo>
          <ClassNameText>
            {classes}
            <HiddenDesktop>
              <MobProficiency>Proficiency {proficiency}</MobProficiency>
              <Dot>.</Dot>
              <MobTopic>Topics {topic}</MobTopic>
            </HiddenDesktop>
          </ClassNameText>
        </CLassNames>

        <HiddenMobile>
          <Proficiency>{proficiency}</Proficiency>
        </HiddenMobile>
        <HiddenMobile>
          <Center>{topic}</Center>
        </HiddenMobile>
      </div>
      <Center>
        <ChevronRightIcon />
      </Center>
    </Listing>
  );
};

export default CommonListCardComponent;
