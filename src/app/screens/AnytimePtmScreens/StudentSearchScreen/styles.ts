import makeStyles from '@material-ui/core/styles/makeStyles';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';

export const useStyles = makeStyles({
  searchStudentContainerStyle: {
    textAlign: 'center',
  },

  SearchContainer: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '400px',
    '@media(max-width:768px)': {
      padding: '10px',
    },
  },
  searchStudentStyle: {
    border: '1px solid #DADADA',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.12)',
    borderRadius: '4px',
    padding: '4px 14px',
    width: '400px',
    '@media(max-width:768px)': {
      width: '300px',
    },
  },
  searchStudentList: {
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.12)',
    borderRadius: '0 0 4px 4px',
    border: '1px solid #DADADA',
    borderTop: '0px',
    width: '100%',
    marginBottom: '40px',
    '&>li': {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
    },
  },
  searchStudentName: {
    width: '100%',
    '& h3': {
      fontSize: '14px',
      color: '#333',
      fontWeight: '400',
    },
    '& span': {
      fontSize: '12px',
      lineHeight: '14px',
      color: '#666666',
    },
  },
  searchListContainer: {
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.12)',
    borderRadius: '0 0 4px 4px',
    border: '1px solid #DADADA',
    borderTop: '0px',
  },
});
export const SearchImg = styled.div`
  padding: 40px 0px;
`;
export const Heading = styled.span`
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const SearchIconEdit = styled(SearchIcon)`
  fill: #1d7dea !important;
`;
