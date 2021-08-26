import styled from 'styled-components';
import { ClassCount } from 'app/components/common/common.screen.styles';
import { CardListing } from 'app/screens/StudentAnalyticsScreen/styles';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box/Box';
import { Button } from 'app/components';

export const useStyles = makeStyles({
  table: {
    minWidth: 650,
    '& .MuiTableCell-root': {
      fontWeight: 'normal',
      fontSize: '16px',
      border: '1px solid #E1E1E1',
      color: '#333333',
    },
    '& .MuiTableHead-root': {
      backgroundColor: '#EFF6FF',
      color: '#333',
    },
  },
});

export const HeaderContainer = styled(ClassCount as any)`
  display: flex;
  justify-content: flex-start;

  @media (min-width: 768px) {
    margin-top: 1.5rem;
  }
`;

export const TotalMarksPill = styled.div`
  background: rgba(0, 0, 0, 0.15);
  border-radius: 62px;
  color: #fff;
  padding: 10px 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  span {
    margin-left: 5px;
  }
`;

export const Title = styled.h3`
  margin: 10px 0 20px 0;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  color: #333333;
  @media (max-width: 768px) {
    background: #eff6ff;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    width: 100%;
    padding: 10px;
    color: #333333;
    font-size: 16px;
    font-weight: normal;
    margin-bottom: 0;
  }
`;

export const CardListingEdit = styled(CardListing as any)`
  padding: 15px;
  margin-bottom: 30px;
  @media (max-width: 768px) {
    background-color: #f4f8f9;
    padding: 0;
    margin-bottom: 100px;
  }
`;

export const Footer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.15);
  color: #333;
  padding: 18px 0;
  @media (max-width: 360px) {
    padding: 5px 0;
  }
`;

export const FooterItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  @media (max-width: 768px) {
    font-size: 10px;
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const FooterItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    justify-content: flex-start;
    margin: 5px 0;
  }

  span {
    display: flex;
    color: #666;
    img {
      margin-right: 5px;
    }
  }
`;

export const SummaryList = styled.div`
  font-size: 12px;
  background: #fff;
  padding: 10px;
  border-bottom: 1px solid #e9e9e9;
  @media (max-width: 360px) {
    font-size: 10px;
  }
`;

export const SummaryItem = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  @media (max-width: 360px) {
    font-size: 9px;
  }
`;

export const SummaryTitle = styled.div`
  font-size: 14px;
`;

export const TextMuted = styled.span`
  color: #999999;
`;

export const SummaryItemFooter = styled.span`
  color: #999999;
  font-size: 12px;
`;

export const BoxEdit = styled(Box)`
  margin: 10px 0;
  display: grid;
  grid-template-columns: 50% 50%;
`;

export const TotalMarks = styled.div`
  margin: 10px 0;
  position: fixed;
  bottom: -15px;
  width: calc(100% - 30px);
  background-color: #fff;
  padding: 15px 10px;
  left: 15px;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #e9e9e9;

  span:nth-of-type(2) {
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #333333;
  }
`;

export const TabsEdit = styled.div`
  background: #fff;
  border: 1px solid #e2e2e2;
  border-radius: 4px;
  div {
    border: none;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    text-align: center;
  }
`;

export const ButtonEdit = styled(Button)`
  font-weight: normal;
`;

export const StudentHeading = styled.span`
  font-weight: 400;
  line-height: 19px;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const ButtonNoShadow = styled(Button)`
  box-shadow: none;
  &:hover {
    box-shadow: none;
  }
`;
