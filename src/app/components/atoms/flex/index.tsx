import styled from 'styled-components';

interface Props {
  justify?: string;
  align?: string;
  wrap?: string;
  direction?: string;
}

export const Flex = styled.div<Props>`
  display: flex;
  justify-content: ${({ justify }) => justify || 'left'};
  align-items: ${({ align }) => align || 'stretch'};
  flex-wrap: ${({ wrap }) => wrap || 'nowrap'};
  flex-direction: ${({ direction }) => direction || 'row'};
  .tooltip button {
    padding: 0px;
  }
  .solutiondrawer {
    @media (max-width: 768px) {
      .kXvaRT {
        max-width: 100vw;
        width: 100vw;
      }
    }
  }
`;
