import makeStyles from '@material-ui/core/styles/makeStyles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import styled from 'styled-components';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import { Flex } from 'app/components';

export const CheckIcon = styled(CheckCircleIcon)`
  color: #77bd30;
  margin-right: 5px;
`;
export const NotCheckedIcon = styled(CancelIcon)`
  color: #f44335;
  margin-right: 5px;
`;

export const useStyles = makeStyles({
  searchBatchStyle: {
    padding: '5px 15px',
    borderRadius: '4px',
    backgroundColor: '#fff',
    border: '1px solid #E9E9E9',
    '@media (max-width: 768px)': {
      backgroundColor: '#fff',
      width: 'calc(100vw - 75px)',
      margin: '1em 0 0 0;',
    },
  },
});

export const Listing = styled.div`
  border-bottom: 1px solid #e9e9e9;
  /* cursor: pointer; */

  &:hover {
    /* background-color: #f5f5f5; */
    transition: all 0.4s ease-in-out;
  }

  &:last-child() {
    border: none;
  }
`;

export const Proficiency = styled.span`
  text-align: center;
  @media (max-width: 380px) {
    font-size: 11px !important;
  }
`;

export const Topic = styled.span`
  text-align: center;
  @media (max-width: 380px) {
    font-size: 11px;
    margin: 0 5px;
  }
`;

export const StudentHeader = styled.div`
  padding: 15px;
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  border-bottom: 1px solid #e9e9e9;
  align-items: center;
  @media (max-width: 768px) {
    grid-template-columns: 50% 50%;
  }
`;

export const StudentListItemContainer = styled.div`
  padding: 15px;
  display: grid;
  border-bottom: 1px solid #e9e9e9;
  grid-template-columns: 25% 25% 25% 25%;
  @media (max-width: 768px) {
    grid-template-columns: 50% 50%;
  }
  @media (max-width: 360px) {
    grid-template-columns: 55% 45%;
  }
`;

export const StudentNameContainer = styled.div`
  display: inline;
  margin-left: 10px;
  span:nth-of-type(1) {
    color: #333333;
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }
`;

export const EnrollmentNo = styled.span`
  display: block;
  font-size: 12px;
  color: #999999;
  @media (max-width: 768px) {
    font-size: 12px;
    line-height: 20px;
  }

  @media (max-width: 360px) {
    font-size: 10px;
  }
`;

export const StudentScore = styled.span`
  margin-top: 10px;
  color: #999999;
  font-weight: 300;

  b {
    font-weight: 400;
    color: #333;
  }
`;

export const LinkMobEdit = styled(Link)`
  cursor pointer;
`;

export const StudentHeading = styled.span`
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const BoxMobile = styled(Box)`
  @media (max-width: 768px) {
    justify-content: flex-end;
  }
`;

export const FlexMobile = styled(Flex)`
  @media (max-width: 768px) {
    justify-content: flex-end;
  }
`;
