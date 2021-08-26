import styled from 'styled-components';

interface Props {
  display?: string;
  maxWidth?: string;
  responsiveMaxWidth?: string;
}

export const Truncate = styled.div<Props>`
  display: ${({ display }) => (display ? display : 'block')};
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : '200px')};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    max-width: ${({ responsiveMaxWidth }) =>
      responsiveMaxWidth ? responsiveMaxWidth : '200px'};
  }
`;
