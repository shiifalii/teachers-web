import React, { useEffect, useState, useMemo } from 'react';
import HeaderComponent from '../../../components/common/header.component';
import CommonListCardComponent from '../../../components/common/common.list.card.component';
import styled from 'styled-components';
import Input from '@material-ui/core/Input';
import makeStyles from '@material-ui/core/styles/makeStyles';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import InfoToolTip from 'app/components/common/info.tooltip';
import LoaderWrapper from '../../../components/common/loader.wrapper.component';
import { Container, InputContainer, HiddenMobile } from '../../../components';
import { EmptyState } from '../../../components/common/emptyState.component';
import {
  CardListing,
  BackIcon,
} from 'app/components/common/common.screen.styles';
import {
  filterData,
  IBatch,
  IListObj,
  isLoading,
  isApiFailed,
  getNameByOrgType,
} from '../../../helpers/comman.helper';
import { useHistory } from 'react-router-dom';
import { current } from '@reduxjs/toolkit';

interface IProps {
  reportsHistory: any;
  getHistory: any;
}

const useStyles = makeStyles({
  searchBatchStyle: {
    padding: '5px 0px 5px 15px',
    borderRadius: '4px',
    backgroundColor: '#fff',
    border: '1px solid #E9E9E9',
    '@media (max-width: 768px)': {
      backgroundColor: '#fff',
      width: 'calc(100vw - 30px)',
      marginBottom: '15px',
    },
  },
});

const SearchIconEdit = styled(SearchIcon)`
  fill: #1d7dea !important;
`;
const Heading = styled.span`
  position: relative;
  :before {
    content: '';
    border-bottom: 2px solid #fff;
    width: 100%;
    max-width: 35px;
    position: absolute;
    bottom: -5px;
    left: 0;
  }
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  justify-content: center;
  align-items: center;
  > div {
    display: grid;
    grid-template-columns: 50% 50%;
    @media (max-width: 768px) {
      display: block;
    }
    @media (max-width: 360px) {
      font-size: 16px;
    }
  }
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1em 0;
  }
`;

const DashboradBackground = styled.div`
  background-color: #f4f8f9;
  color: #fff;
  padding-bottom: 2em;
  min-height: calc(100vh - 70px);
`;

const CardHeader = styled.div`
  min-height: 135px;
  background-color: var(--brand-color);
  @media (max-width: 768px) {
    min-height: initial;
  }
`;

const ClassCount = styled.div`
  font-size: 1.5em;
  @media (max-width: 768px) {
    font-size: 1em;
    img {
      width: 14px;
    }
  }
`;

const InputContainerEdit = styled(InputContainer as any)`
  @media (max-width: 768px) {
    margin-top: 0;
  }
  select {
    -webkit-appearance: initial;
    background-image: url('https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/angle-down-bold.svg');
    background-repeat: no-repeat;
    background-position: 125px 18px;
    min-width: 135px;
    width: 100%;
    max-width: 160px;
    padding-right: 50px;
  }

  @media (max-width: 768px) {
    select {
      height: 30px;
      font-size: 12px !important;
      background-position: 90px 10px;
      min-width: 120px;
      max-width: 120px;
      padding-right: 35px;
    }
  }
`;

const CustomHidden = styled.div`
  @media (min-width: 769px) {
    display: none;
  }
`;

const ClassesHeader = styled.div`
  display: grid;
  grid-template-columns: 10% 50% 20% 20%;
  padding: 15px 20px;
  border-bottom: 1px solid #e9e9e9;
  @media (max-width: 768px) {
    display: none;
  }
  .text-center {
    text-align: center;
  }
`;
const ReportsHistoryList = styled.div`
  display: grid;
  grid-template-columns: 10% 50% 20% 20%;
  padding: 15px 20px;
  border-bottom: 1px solid #e9e9e9;
  @media (max-width: 768px) {
    padding: 15px 4px;
    grid-template-columns: 10% 45% 20% 25%;
  }
  .text-center {
    text-align: center;
  }
  .srnoText {
    width: 30px;
    text-align: center;
  }
  .reportName {
    font-size: 16px;
    line-height: 20px;
    color: #333;
    @media (max-width: 768px) {
      font-size: 12px;
      line-height: 16px;
    }
  }
  .generateDate {
    font-size: 14px;
    line-height: 18px;
    color: #666;
    text-align: center;
    @media (max-width: 768px) {
      font-size: 12px;
      line-height: 16px;
    }
  }
  button {
    font-size: 14px;
    line-height: 20px;
    color: #1d7dea;
    background: transparent;
    border: 0;
    cursor: pointer;
    img {
      margin-right: 4px;
      vertical-align: middle;
    }
    @media (max-width: 768px) {
      font-size: 12px;
      line-height: 16px;
    }
  }
  .failedText {
    font-size: 14px;
    line-height: 20px;
    color: #f21d1d;
    img {
      vertical-align: top;
      margin-right: 4px;
    }
    @media (max-width: 768px) {
      font-size: 12px;
      line-height: 16px;
    }
  }
`;
const Title = styled.div`
  background-color: #f0f7ff;
  padding: 20px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  font-weight: 500;
  font-size: 20px;
  color: #333333;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const AssignedTestBlock = styled.div`
  padding: 20px;
  display: grid;
  cursor: pointer;
  grid-template-columns: 90% 5% 5%;
  align-items: center;
  div > span {
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    text-align: left;
    color: #333333;
  }
  @media (max-width: 768px) {
    grid-template-columns: 15% 70% 15%;

    div > span {
      font-size: 14px;
    }

    div > span:nth-of-type(2) {
      font-size: 10px;
      font-weight: 400;
      line-height: 10px;
      text-align: left;
      color: #999999;
    }
  }

  img {
    margin-right: 15px;
  }
`;

const AssignedTestCount = styled.span`
  color: #999;
  font-size: 12px;
  line-height: 14px;
`;

const ReportsHistory = function(props: IProps) {
  const { reportsHistory, getHistory } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    getHistory({ pageNumber: currentPage });
    window.scrollTo(0, 0);
    window.addEventListener('scroll', () => {
      if (
        Math.ceil(window.innerHeight + window.scrollY) >=
        document.documentElement.scrollHeight
      ) {
        if (!isLoading) {
          setIsLoading(true);
        }
      }
    });
  }, []);

  useEffect(() => {
    if (
      (currentPage - 1) * 10 <
      (reportsHistory &&
        reportsHistory.pageInfo &&
        reportsHistory.pageInfo.docCount)
    ) {
      getHistory({ pageNumber: currentPage });
    }
  }, [currentPage]);

  useEffect(() => {
    if (isLoading) {
      setCurrentPage((prevState: any) => {
        return prevState + 1;
      });
    }
  }, [isLoading]);

  const monthNames = [
    'Jan',
    'Feb',
    'March',
    'April',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];

  useMemo(() => {
    if (reportsHistory && reportsHistory.list && reportsHistory.list.length) {
      setIsLoading(false);
    }
  }, [reportsHistory]);

  const getDisplayDate = (date: any) => {
    const convertedDate = new Date(date);
    return (
      convertedDate.getDate() +
      ' ' +
      monthNames[convertedDate.getMonth()] +
      ' ' +
      convertedDate.getFullYear()
    );
  };

  const getDisplayTime = (date: any) => {
    const convertedDate = new Date(date);
    return (
      (convertedDate.getHours() % 12) +
      ':' +
      (convertedDate.getMinutes() > 9
        ? convertedDate.getMinutes()
        : '0' + convertedDate.getMinutes()) +
      ' ' +
      (convertedDate.getHours() > 11 ? 'PM' : 'AM')
    );
  };

  const downloadReport = (url: any) => {
    window.open(url, '_blank');
  };

  return (
    <>
      <HeaderComponent />
      <DashboradBackground>
        <CardHeader>
          <Container>
            <br />

            <ClassCount>
              <BackIcon>
                <img
                  src={
                    'https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/back-icon.svg'
                  }
                  alt="back-icon"
                  onClick={() => history.goBack()}
                />
              </BackIcon>

              <Heading>History</Heading>
            </ClassCount>
          </Container>
        </CardHeader>
        <Container>
          <CardListing>
            {/* <Title>My History</Title> */}
            {reportsHistory &&
              reportsHistory.list &&
              reportsHistory.list.length > 0 && (
                <ClassesHeader>
                  <span>S No.</span>
                  <span>Report Type</span>
                  <span className="text-center">Genarate Time</span>
                  <span className="text-center">Reports Status</span>
                </ClassesHeader>
              )}
            <LoaderWrapper isLoading={false}>
              {reportsHistory &&
              reportsHistory.list &&
              reportsHistory.list.length > 0 ? (
                reportsHistory.list.map((batchData: any, index: number) => (
                  <ReportsHistoryList key={batchData._id}>
                    <div className="srnoText">{index + 1}</div>
                    <div className="reportName">
                      {batchData.name || batchData.reportType}
                    </div>
                    <div className="generateDate">
                      {getDisplayDate(batchData.createdAt)}
                      <br />
                      {getDisplayTime(batchData.createdAt)}
                    </div>
                    <div className="text-center">
                      {batchData.status === 'success' ? (
                        <button
                          onClick={() => downloadReport(batchData.reportUrl)}
                        >
                          <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/download-icon.svg" />
                          Download
                        </button>
                      ) : batchData.status === 'failed' ? (
                        <p className="failedText">
                          <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/failed-icon.svg" />
                          Failed
                        </p>
                      ) : (
                        <em>Pending</em>
                      )}
                    </div>
                  </ReportsHistoryList>
                ))
              ) : (
                <EmptyState />
              )}
            </LoaderWrapper>
          </CardListing>
        </Container>
      </DashboradBackground>
    </>
  );
};

export default ReportsHistory;
