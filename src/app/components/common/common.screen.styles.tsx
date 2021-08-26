import styled from 'styled-components';
import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles({
  searchBatchStyle: {
    padding: '5px 15px',
    borderRadius: '4px',
    backgroundColor: '#fff',
    border: '1px solid #E9E9E9',
  },
});

export const CommonScreenBackground = styled.div`
  background-color: #f4f8f9;
  color: #fff;
  padding-bottom: 2em;
  min-height: calc(100vh - 70px);
`;
export const CardHeader = styled.div`
  min-height: 165px;
  background-color: var(--brand-color);
  @media (max-width: 768px) {
    min-height: initial;
    padding: 1em 0;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 80% 20%;
  justify-content: center;
  align-items: center;
  margin-top: 1.2em;
  @media (max-width: 768px) {
    margin-top: 0px;
    padding-top: 10px;
  }
`;

export const ClassCount = styled.div`
  font-size: 1.5em;
  display: flex;

  /* margin-top: 1em; */
  @media (max-width: 768px) {
    font-size: 1em;
    display: flex;
  }
  span:nth-of-type(2) {
    font-size: 1em;

    span {
      position: relative;
      &:before {
        content: '';
        border-bottom: 2px solid #fff;
        width: 100%;
        max-width: 35px;
        position: absolute;
        bottom: -5px;
        left: 0;
        @media (max-width: 768px) {
          display: none;
        }
      }
    }

    @media (max-width: 768px) {
      font-size: 20px;
    }
  }

  span:nth-of-type(3) {
    font-size: 16px;
    display: block;
    text-indent: 50px;
    @media (max-width: 768px) {
      text-indent: 35px;
      max-width: 280px;
      padding-left: 2.2em;
      text-indent: initial;
      font-size: 14px;
    }
    @media (max-width: 360px) {
      max-width: 220px;
    }
  }
  .TestName {
    @media (max-width: 768px) {
      display: block;
    }
  }
`;

export const BackIcon = styled.span`
  cursor: pointer;
  width: 26px;
  height: 21px;
  margin: 0 1em 0 0;
  @media (max-width: 768px) {
    margin: 0 0.3em 0 0;
    transform: scale(0.8);
  }
`;

export const FilterContainer = styled.div`
  max-width: 80vw;
  min-width: 500px;
  height: 100%;
  padding: 2rem 1rem 0.5rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  h3 {
    font-weight: normal;
  }
  @media (max-width: 768px) {
    min-width: 300px;
    width: 100vw;
    max-width: 100%;
    .filterHeading {
      padding-bottom: 12px;
      border-bottom: 1px solid rgba(153, 153, 153, 0.54);
    }
    .mobile-only {
      display: block;
      border-bottom: 1px solid rgba(153, 153, 153, 0.54);
    }
  }
  .footer {
    margin-top: auto;
    box-shadow: 0px -1px 4px rgba(198, 198, 198, 0.5);
    padding: 10px;
    margin-right: -15px;
    margin-left: -15px;
    button {
      flex-basis: 40%;
    }
  }
  .filterOptions-container {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
  }
  .filterOption {
    padding: 0.3rem 0;
  }
  .filter-by-batch {
    flex-direction: row;
    display: block;
  }

  .questionFilter {
    display: flex;
    flex-direction: column;
  }

  .MuiFormControlLabel-root {
    flex-direction: row-reverse;
    justify-content: space-between;
    margin-left: 0;
    margin-right: 0;
  }

  .studentFilter {
    display: flex;
    flex-direction: column;
  }

  @media (min-width: 769px) {
    .mobile-only {
      display: none;
    }
  }
`;

export const TabHeader = styled.div`
  margin-top: -4.5em;
  @media (max-width: 768px) {
    margin-top: 0;
    box-shadow: 0px 4px 4px rgba(141, 141, 141, 0.25);
    margin-left: -15px;
    margin-right: -15px;
  }
  ul {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    li {
      margin-right: 1em;
      opacity: 0.5;
      cursor: pointer;
      font-weight: 500;
    }

    @media (max-width: 768px) {
      display: grid;
      grid-template-columns: 50% 50%;
      text-align: center;
      color: var(--brand-color);
      margin-top: 0.5em;
    }
  }

  .active {
    border-bottom: 1px solid #fff;
    opacity: 1;
    line-height: 40px;
    pointer-events: none;
    @media (max-width: 768px) {
      border-bottom: 1px solid var(--brand-color);
    }
  }
`;
export const CppListingContainer = styled.div`
  margin-top: -3em;
  background-color: transparent;
  display: grid;
  grid-template-columns: 70% 30%;
`;
export const CardListingContainer = styled.div`
  margin-top: -3em;
  background-color: transparent;
  display: grid;
  grid-template-columns: 30% 70%;
  @media (max-width: 768px) {
    margin-top: 0;
    grid-template-columns: 100%;
  }
`;
export const CardListing = styled.div<{
  cols?: string;
  responsiveCols?: string;
  children: (JSX.Element | false)[] | JSX.Element;
}>`
  background-color: #fff;
  margin-top: -3em;
  color: var(--text-color);
  border-radius: 4px;
  @media (max-width: 768px) {
    margin-top: 1em;
  }
  .listHeader {
    padding: 15px;
    border-bottom: 1px solid #e9e9e9;
    display: grid;
    grid-template-columns: ${({ cols }) => (cols ? cols : '68% 15% 15%')};
    align-items: center;
    @media (max-width: 768px) {
      padding: 15px;
      display: none;
      grid-template-columns: ${({ responsiveCols }) =>
        responsiveCols ? responsiveCols : '68% 24% 8%'};

      .only-desktop {
        display: none;
      }
    }

    .text-center {
      text-align: center;
    }
  }
  .inline-block {
    display: inline-block;
    padding: 0 5px;
  }
  .clickable {
    cursor: pointer;
  }
  .MuiIconButton-root {
    padding: 0px;
  }
  .MuiIconButton-edgeEnd {
    margin-right: 0;
  }
  .MuiAccordion-root.Mui-expanded {
    margin-top: 0;
  }
`;

export const Dot = styled.span`
  margin: 0 10px;
`;
