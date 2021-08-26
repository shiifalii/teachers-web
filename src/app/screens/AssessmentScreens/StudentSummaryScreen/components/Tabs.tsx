import React from 'react';
import styled from 'styled-components';
import { Flex } from 'app/components/atoms';

export enum TabTypes {
  Section_Wise,
  Question_Wise,
}

interface TabsInterface {
  activeTab: TabTypes;
  setActiveTab: (tab: TabTypes) => void;
}

function Tabs(props: TabsInterface) {
  const { activeTab, setActiveTab } = props;
  return (
    <Flex>
      <Tab
        active={activeTab === TabTypes.Section_Wise}
        onClick={() =>
          activeTab !== TabTypes.Section_Wise &&
          setActiveTab(TabTypes.Section_Wise)
        }
      >
        Section Wise
      </Tab>
      <Tab
        active={activeTab === TabTypes.Question_Wise}
        onClick={() =>
          activeTab !== TabTypes.Question_Wise &&
          setActiveTab(TabTypes.Question_Wise)
        }
      >
        Question Wise
      </Tab>
    </Flex>
  );
}

const Tab = styled.div<{ active?: boolean; onClick: any }>`
  text-align: center;
  padding: 10px 18px;
  cursor: pointer;
  border-radius: 5px;

  ${({ active }) => {
    if (active) {
      // Styles when tab is active
      return `
        color: #fff;
        background-color: var(--brand-color);
        border: 2px solid #fff !important;
      `;
    }
    // Styles when Tab is inactive
    return `
    border: 1px solid #E2E2E2;
    color: #999999;
    `;
  }}
`;

export default Tabs;
