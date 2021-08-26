import makeStyles from '@material-ui/core/styles/makeStyles';
import styled from 'styled-components';

export const useStyles = makeStyles({
  searchBatchStyle: {
    padding: '5px 15px',
    borderRadius: '4px',
    backgroundColor: '#fff',
    border: '1px solid #E9E9E9',
    '@media (max-width: 768px)': {
      backgroundColor: '#fff',
      width: 'calc(100vw - 30px)',
    },
  },
  emptyStateContainer: {
    minHeight: '500px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: '16px',
    lineHeight: '24px',
    color: '#666',
    '& b': {
      fontSize: '24px',
      lineHeight: '34px',
      color: '#333',
      fontWeight: 'normal',
      paddingBottom: '8px',
    },
  },
  rightArrowIcon: {
    display: 'flex',
    alignItems: 'center',
    '& span': {
      height: '16px',
    },
  },
  dotIcon: {
    margin: '0 6px',
    height: '6px',
    width: '4px',
  },
  styledBreadcrumbs: {
    padding: '1em 0 0 0',
    fontSize: '12px',
    color: '#fff',
    '@media (max-width: 768px)': {
      display: 'none',
    },
    '& .MuiBreadcrumbs-separator': {
      margin: 0,
    },
    '& .MuiTypography-colorPrimary': {
      color: '#fff',
    },
    '& .MuiLink-underlineHover': {
      '&:hover': {
        textDecoration: 'none',
      },
    },
  },
  link: {
    cursor: 'pointer',
  },
});

export const ConceptScreenBackground = styled.div`
  background-color: #f4f8f9;
  color: #fff;
  padding-bottom: 2em;
  min-height: calc(100vh - 70px);
`;

export const CardHeader = styled.div`
  /* min-height: 165px; */
  padding-bottom: 4em;
  background-color: var(--brand-color);
  @media (max-width: 768px) {
    min-height: initial;
    padding: 1em 0;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 75% 25%;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    grid-template-columns: 80% 20%;
  }
`;

export const ClassCount = styled.div`
  font-size: 1.5em;
  margin-top: 30px;
  display: flex;
  @media (max-width: 768px) {
    margin: initial;
  }

  span:nth-of-type(2) {
    font-size: 1em;
    @media (max-width: 768px) {
      font-size: 20px;
    }
  }

  span:nth-of-type(3) {
    text-indent: 50px;

    font-size: 16px;
    max-width: 100%;
    display: block;
    @media (max-width: 768px) {
      text-indent: initial;
      max-width: 350px;
      font-size: 14px;
      padding-left: 2.5em;
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
  }
`;

export const ListHeader = styled.div`
  display: grid;
  grid-template-columns: 85% 15%;
  padding: 15px;
  border-bottom: 1px solid #e9e9e9;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const Heading = styled.span`
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;
