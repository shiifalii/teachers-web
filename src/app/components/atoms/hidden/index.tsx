import styled from 'styled-components';

export const HiddenMobile = styled.div`
  @media (max-width: 769px) {
    display: none !important;
  }
`;

export const HiddenDesktop = styled.div`
  @media (min-width: 769px) {
    display: none !important;
  }
`;
