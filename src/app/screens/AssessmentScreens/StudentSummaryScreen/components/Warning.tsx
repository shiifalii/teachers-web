import React from 'react';
import styled from 'styled-components';
import { Flex } from 'app/components/atoms';

interface WarningProps {
  open: boolean;
  children: any;
}

function Warning(props: WarningProps) {
  const { open, children } = props;
  if (!open) {
    return null;
  }
  return (
    <WarningContainer justify="flex-start" align="center">
      <WarningIcon />
      <MessageContainer>{children}</MessageContainer>
    </WarningContainer>
  );
}

const WarningIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0)">
      <path
        d="M8.07913 15.5587C3.95487 15.5587 0.600098 12.2039 0.600098 8.07962C0.600098 3.95535 3.95487 0.600586 8.07913 0.600586C12.2034 0.600586 15.5588 3.95535 15.5588 8.07962C15.5588 12.2039 12.2028 15.5587 8.07913 15.5587ZM8.07913 1.86725C4.65343 1.86725 1.86676 4.65392 1.86676 8.07962C1.86676 11.5059 4.65343 14.292 8.07913 14.292C11.5048 14.292 14.2921 11.5066 14.2921 8.07962C14.2915 4.65455 11.5048 1.86725 8.07913 1.86725Z"
        fill="#F21D1D"
      />
      <path
        d="M8.89713 3.78027H7.26123V9.51131H8.89713V3.78027Z"
        fill="#F21D1D"
      />
      <path
        d="M8.07885 12.3774C8.65284 12.3774 9.11815 11.9121 9.11815 11.3381C9.11815 10.7641 8.65284 10.2988 8.07885 10.2988C7.50486 10.2988 7.03955 10.7641 7.03955 11.3381C7.03955 11.9121 7.50486 12.3774 8.07885 12.3774Z"
        fill="#F21D1D"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const WarningContainer = styled(Flex as any)`
  background-color: #ffeaea;
  border-radius: 8px;
  padding: 0 13px;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const MessageContainer = styled.div`
  flex: 1;
  margin-left: 10px;
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  text-align: left;
  color: #333333;
  padding: 15px;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export default Warning;
