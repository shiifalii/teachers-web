import React from 'react';
import styled from 'styled-components';
import { Flex } from 'app/components/atoms';

export enum TabTypes {
  View_Questions,
  View_Solutions,
}

interface TabsInterface {
  activeTab: TabTypes;
  setActiveTab: (tab: TabTypes) => void;
  isSolutionPdfPresent: boolean;
}

function Tabs(props: TabsInterface) {
  const { activeTab, setActiveTab, isSolutionPdfPresent } = props;
  return (
    <Flex>
      <Tab
        active={activeTab === TabTypes.View_Questions}
        onClick={() =>
          activeTab !== TabTypes.View_Questions &&
          setActiveTab(TabTypes.View_Questions)
        }
      >
        View Questions
      </Tab>
      {isSolutionPdfPresent && (
        <Tab
          active={activeTab === TabTypes.View_Solutions}
          onClick={() =>
            activeTab !== TabTypes.View_Solutions &&
            setActiveTab(TabTypes.View_Solutions)
          }
        >
          View Solutions
        </Tab>
      )}
    </Flex>
  );
}

const Tab = styled.div<{ active?: boolean; onClick: any }>`
  text-align: center;
  padding: 10px 18px;
  cursor: pointer;
  ${({ active }) => {
    if (active) {
      // Styles when tab is active
      return `
        font-weight: 500 !important;
        border-bottom: 2px solid #1D7DEA !important;
      `;
    }
    // Styles when Tab is inactive
    return ``;
  }}
`;

export default Tabs;
