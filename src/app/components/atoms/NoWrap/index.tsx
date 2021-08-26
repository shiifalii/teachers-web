import styled from 'styled-components';

export const NoWrap = styled.span`
  display: inline-block;
  @media (max-width: 768px) {
    max-width: calc(100% - 75px);
  }
`;
