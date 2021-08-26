import makeStyles from '@material-ui/core/styles/makeStyles';
import styled from 'styled-components';
import Link from '@material-ui/core/Link/Link';
import { Button } from 'app/components/atoms/button';
import { Container, Grid } from 'app/components';
import { TestStatus } from './testList.screen';

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

export const ContainerEdit = styled(Container as any)`
  @media (min-width: 768px) {
    padding-top: 1em;
  }
`;

export const TestListHeader = styled.div`
  padding: 15px;
  border-bottom: 1px solid #e9e9e9;
  display: grid;
  grid-template-columns: 28% 13% 17% 10% 17% 17%;
  font-size: 14px;
`;

export const TestListContainer = styled.div``;

export const TestListItemContainer = styled.div`
  display: grid;
  grid-template-columns: 28% 13% 17% 10% 17% 17%;
  padding: 15px;
  align-items: center;
  border-bottom: 1px solid #e9e9e9;
  @media (max-width: 768px) {
    display: block;
  }
`;

export const TestName = styled.span`
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  text-align: left;
  color: #333333;
  @media (max-width: 768px) {
    color: #333333;
    font-size: 14px;
  }
`;

export const TestType = styled.div`
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: #999999;
  display: flex;
  align-items: center;
`;

export const TestSchedule = styled.span<{ status: TestStatus }>`
  ${({ status }) => {
    if (status === 'Live') {
      // styles when status is Live
      return `
      color: #30be76;
      font-weight: 500;
      `;
    } else if (status === 'Upcoming') {
      // Styles when status is Upcoming
      return `
        color: #FFA20C;
        font-weight: 500;
      `;
    }
    // Styles when status is Past
    return `
      color: #F21D1D;
      font-weight: 500;
    `;
  }}
`;

export const SmallDot = styled.span`
  margin: 0 5px;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background-color: #999;
  display: inline-block;
`;

export const ButtonEdit = styled(Button as any)`
  border: 2px solid transparent;
  max-width: 120px;
  line-height: initial;
  &:hover {
    border: 2px solid #1d7dea;
    /* color: #77bd30; */
  }
`;

export const ButtonGreen = styled(Button)`
  background: #77bd30;
  color: #fff;
  text-transform: capitalize;
  font-weight: normal;
  border: 2px solid transparent;
  max-width: 120px;
  font-size: 14px;
  line-height: initial;
  &:hover {
    border: 2px solid #77bd30;
    color: #fff;
  }
`;

export const LinkGreen = styled.span`
  color: #77bd30;
  display: flex;
  justify-content: center;
  align-items: center;
  order: 2;
`;

export const LinkGray = styled(Link)`
  font-size: 14px;
  line-height: 16px;
  color: #666666;
`;

export const TestListMobile = styled.div`
  font-size: 12px;
  color: #999;
  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

export const GridEdit = styled(Grid)`
  a {
    font-size: 14px;
  }
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    width: calc(100vw - 60px);
    justify-content: space-between;
    > div:nth-of-type(1) {
      font-size: 10px;
    }

    button {
      order: 2;
      margin-left: auto;
      min-width: 100px;
    }

    a {
      display: flex;
      align-items: center;
      font-size: 14px;
    }
    a:nth-of-type(1) {
      /* order: 2; */
      /* margin-left: auto; */
      justify-content: flex-end;
    }
  }
`;

export const NoSubmissionTxt = styled.div`
  font-size: 14px;
  line-height: 16px;
  color: #999;
  font-weight: 400;
  text-transform: capitalize;
  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

export const DueDate = styled.div`
  text-align: center;
  font-size: 14px;
`;

export const LinkMobEdit = styled(Link)`
  cursor: pointer;
  font-size: 14px;

  @media (max-width: 768px) {
    display: block !important;
    text-align: right;
  }
`;

export const StudentHeading = styled.span`
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;
