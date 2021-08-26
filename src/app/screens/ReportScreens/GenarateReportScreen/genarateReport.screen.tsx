import React, { useMemo, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import HeaderComponent from '../../../components/common/header.component';
import styled from 'styled-components';
import AutoCompleteMutiSelect from '../../../components/common/autocomplete-multiselect.component';
import DateTimePickers from '../../../components/common/date-time-picker';
import { Container } from 'app/components';
import Button from '@material-ui/core/Button';
import { useStyles } from './styles';
import SwipeableTemporaryDrawer from './drawer';
import {
  sendMailForSingleReport,
  sendMailForConsolidatedReport,
} from '../../../helpers/private.api.helper';
import {
  CommonScreenBackground,
  Grid,
} from 'app/components/common/common.screen.styles';
import { reportTypes } from '../../../constants/data.constants';
import { MenuItem, Select } from '@material-ui/core';
import SimpleSnackbar from 'app/components/common/snackbar.component';
interface GenarateReportProps {
  fetchAllAssignments: any;
  allAssignments: any;
  fetchAllBatches: any;
  allBatches: any;
}
const ReportsHeading = styled.span`
  font-size: 1.5em;
  display: flex;
  position: relative;
  &:before {
    content: '';
    border-bottom: 2px solid #fff;
    width: 100%;
    max-width: 35px;
    position: absolute;
    bottom: -5px;
    left: 0;
  }
`;
const HistoryIcon = styled.div`
  font-size: 16px;
  line-height: 19px;
  color: #fff;
  cursor: pointer;
  img {
    margin-right: 4px;
  }
`;
const ReportsContainer = styled.div`
  background-color: #fff;
  padding: 20px 0 20px 0px;
  box-shadow: 0px 2px 8px rgba(174, 174, 174, 0.25);
  max-width: 1170px;
  width: 100%;
  margin: 10px auto;
  border-radius: 4px;
  margin-top: -3em;
  position: relative;
  min-height: 300px;
  max-height: 100%;
  h4 {
    font-weight: 500;
    font-size: 20px;
    line-height: 20px;
    text-align: center;
    color: #333;
    margin: 40px 0px;
    @media (max-width: 768px) {
      font-size: 16px;
      line-height: 18px;
      margin: 10px 0px;
    }
  }
  form {
    width: 650px;
    margin: 0 auto;
    @media (max-width: 768px) {
      width: 100%;
      margin: 0;
      padding: 15px;
    }
    .marginBottom {
      margin-bottom: 20px;
      display: flex;
      @media (max-width: 768px) {
        flex-direction: column;
      }
    }
    .errorText {
      color: #eb3535;
      margin-top: -24px;
      font-size: 12px;
      margin-left: 33%;
      line-height: 32px;
    }
    .msgText {
      color: #999;
      margin-top: -24px;
      font-size: 12px;
      margin-left: 33%;
      line-height: 32px;
    }
    .calenderDate {
      display: flex;
      width: 70%;
      @media (max-width: 768px) {
        width: 100%;
      }
      span {
        color: #333;
        margin: 8px 10px;
      }
    }
    .reportText {
      border: 1px solid #e9e9e9;
      border-radius: 4px;
      height: 36px;
      padding: 4px 14px;
      font-size: 14px;
      width: 70%;
      @media (max-width: 768px) {
        width: 100%;
      }
    }
    select {
      -webkit-appearance: initial;
      background-image: url('https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/arrow-down.svg');
      background-repeat: no-repeat;
      background-position: 98% 12px;
      min-width: 135px;
      width: 100%;
      max-width: 68%;
      padding: 8px 50px 8px 14px;
      background-color: #fff;
      border: 1px solid #e9e9e9;
      border-radius: 4px;
      height: 36px;
      font-size: 14px;
      z-index: 9;
      @media (max-width: 768px) {
        max-width: 100%;
      }
    }
    label {
      font-size: 16px;
      line-height: 30px;
      color: #666;
      width: 32%;
      margin-right: 10px;
      text-align: right;
      z-index: 9;

      @media (max-width: 768px) {
        font-size: 14px;
        text-align: left;
        width: 100%;
      }
    }
  }
  &:before {
    content: '';
    background-image: url(https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/report-top-bgimg.svg);
    position: absolute;
    right: 0px;
    top: 20px;
    height: 174px;
    width: 278px;
    @media (max-width: 768px) {
      display: none;
    }
  }
  &:after {
    content: '';
    background-image: url(https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/report-bottom-bgimg.svg);
    position: absolute;
    left: 0px;
    bottom: 0px;
    height: 256px;
    width: 260px;
    @media (max-width: 768px) {
      display: none;
    }
  }
  .buttonField {
    text-align: right;
  }
`;
const Container1 = styled.div`
  max-width: 930px;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
`;
export const ReportsCardHeader = styled.div`
  min-height: 130px;
  background-color: var(--brand-color);
  div {
    @media (max-width: 768px) {
      grid-template-columns: 60% 40%;
    }
  }
`;

const GenarateReportScreen = function(props: GenarateReportProps) {
  let {
    allAssignments,
    fetchAllAssignments,
    allBatches,
    fetchAllBatches,
  } = props;
  const [selectedReportType, selectReportType] = useState('');
  const initialState = {
    selectedReportType: selectedReportType,
    targetExams: '',
    startDate: {
      date: null,
      type: '',
    },
    endDate: {
      date: null,
      type: '',
    },
    centreId: '',
    email: '',
    assignmentId: '',
    assignmentName: '',
    studentIds: [],
    batchIds: [],
    reportName: '',
  };
  const [finalRequestData, setRequestData] = useState(initialState);
  const [showData, changeShowData] = useState({
    showAll: false,
    showTestName: false,
    showBatchName: false,
    showStudentName: false,
    showReportName: false,
  });
  const [exams, setTargetExams] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [assignmentPage, setAssignmentPage] = useState(1);
  const history = useHistory();
  const [drawerState, setDrawerState] = useState('enterEmail');
  const [drawerMessage, setDrawerMessage] = useState('');
  const [fillAllDataError, setFillAllDataError] = useState('');
  const [isLoadingTargetExams, setIsLoadingTargetExams] = useState(false);
  const [allAssignmentsForPage, setAllAssignmentsForPage] = useState(
    allAssignments,
  );
  const [allBatchesForPage, setAllBatchesForPage] = useState(allBatches);

  const classes = useStyles();
  useEffect(() => {
    const localCourses: string | null = localStorage.getItem('courses');
    setTargetExams(JSON.parse(localCourses ? localCourses : ''));

    const centreData: string | null = localStorage.getItem('centreData');
    finalRequestData.centreId = centreData ? JSON.parse(centreData)[0]._id : '';
    setRequestData({
      ...finalRequestData,
      centreId: finalRequestData.centreId,
    });
  }, []);

  useEffect(() => {
    if (isLoadingTargetExams) {
      setAssignmentPage((prevState: any) => {
        return prevState + 1;
      });
    }
  }, [isLoadingTargetExams]);

  const finalData = useMemo(() => {
    setIsLoadingTargetExams(false);
    setAllAssignmentsForPage(allAssignments);
  }, [allAssignments]);

  useMemo(() => {
    setAllBatchesForPage(allBatches);
  }, [allBatches]);

  // call assignments api when end date changes
  useEffect(() => {
    if (
      finalRequestData.endDate.date !== null &&
      finalRequestData.targetExams != ''
    ) {
      setRequestData({
        ...finalRequestData,
        assignmentId: '',
        assignmentName: '',
        batchIds: [],
        studentIds: [],
      });
      setAllAssignmentsForPage([]);
      setAllBatchesForPage([]);
      buildPayloadAndGetAssignments(false);
    }
  }, [finalRequestData.endDate]);

  useEffect(() => {
    if (finalRequestData.assignmentId) {
      setRequestData({ ...finalRequestData, batchIds: [], studentIds: [] });
      setAllBatchesForPage([]);
      fetchAllBatches(finalRequestData.assignmentId);
    }
  }, [finalRequestData.assignmentId]);

  useEffect(() => {
    if (
      (allAssignmentsForPage &&
        allAssignmentsForPage.pageInfo &&
        allAssignmentsForPage.pageInfo.docCount) >
      assignmentPage * 10
    ) {
      buildPayloadAndGetAssignments(true);
    }
  }, [assignmentPage]);

  const selectExam = (e: any) => {
    setRequestData({
      ...finalRequestData,
      targetExams: getTargetExamId(e.target.value),
      startDate: { type: '', date: null },
      endDate: { type: '', date: null },
      assignmentId: '',
      assignmentName: '',
      batchIds: [],
      studentIds: [],
    });
    setAllAssignmentsForPage([]);
    setAllBatchesForPage([]);
  };

  const getTargetExamId = (e: string) => {
    const examsMatched: any = exams.filter(
      (examVal: any) => examVal.name === e,
    );
    return examsMatched && examsMatched[0]._id;
  };

  const selectDate = (e: any) => {
    let dateNew = new Date(e.date);
    if (e.type === 'startDate') {
      dateNew.setUTCHours(0);
      dateNew.setUTCMinutes(0);
      dateNew.setUTCSeconds(1);
      e.date = dateNew.toISOString();
      setRequestData({
        ...finalRequestData,
        startDate: e,
        endDate: { type: '', date: null },
      });
    } else {
      dateNew.setUTCHours(18);
      dateNew.setUTCMinutes(29);
      dateNew.setUTCSeconds(29);
      e.date = dateNew.toISOString();
      setRequestData({ ...finalRequestData, endDate: e });
    }
  };

  const selectTestName = (e: any) => {
    if (
      allAssignmentsForPage &&
      allAssignmentsForPage.list &&
      allAssignmentsForPage.list.length > 0
    ) {
      setRequestData({
        ...finalRequestData,
        assignmentId: getAssignmentId(e),
        assignmentName: selectedReportType === 'Single' ? e.target.value : '',
        batchIds: [],
        studentIds: [],
      });
    }
  };

  const getAssignmentId = (e: any) => {
    if (selectedReportType === 'Single') {
      e = e.target.value;
      const dataMatched: any = allAssignmentsForPage.list.filter(
        (examVal: any) => examVal.name === e,
      );
      return dataMatched.length > 0 ? dataMatched[0].id : '';
    } else {
      const allList: any = e.map((res: any) => {
        return res.id;
      });
      return allList;
    }
  };

  const selectBatches = (e: any) => {
    setRequestData({
      ...finalRequestData,
      batchIds: e.map((res: any) => res.id),
    });
    let allStudents: any = [];
    for (let i = 0; i < e.length; i++) {
      allStudents.push(...e[i].students);
    }
    setStudentList(allStudents);
  };

  const selectStudents = (e: any) => {
    setRequestData({
      ...finalRequestData,
      studentIds: e.map((res: any) => res.studentId),
    });
  };

  const buildPayloadAndGetAssignments = (append: any) => {
    let dataToPass = {
      courseIds: finalRequestData.targetExams,
      startDate: finalRequestData.startDate.date,
      endDate: finalRequestData.endDate.date,
      pageNumber: assignmentPage,
      pageSize: 10,
    };
    fetchAllAssignments(dataToPass);
  };

  const reportTypeChange = (e: any) => {
    // select report values
    selectReportType(e.target.value);
    // show other fields
    changeShowData({
      ...showData,
      showAll: e.target.value !== '' ? true : false,
    });
    setRequestData({ ...finalRequestData, selectedReportType: e.target.value });
    // reset start and end date on report change
    if (finalRequestData.targetExams.length > 0) {
      setRequestData({
        ...finalRequestData,
        startDate: { type: '', date: null },
        endDate: { type: '', date: null },
        assignmentId: '',
        assignmentName: '',
        batchIds: [],
        studentIds: [],
      });
    }
    setAllAssignmentsForPage([]);
    setAllBatchesForPage([]);
    setDrawerState('enterEmail');
    setDrawerMessage('');
    setShowDrawer(false);
  };
  const loadMoreItems = (e: any) => {
    if (selectedReportType === 'Single') {
      const div = document.getElementsByClassName('MuiMenu-paper')[0];
      if (div) {
        div.addEventListener('scroll', (e: any) => {
          // hit api when reached end
          if (div.scrollHeight - div.scrollTop - div.clientHeight <= 0) {
            if (!isLoadingTargetExams) {
              setIsLoadingTargetExams(true);
            }
          }
        });
      }
    } else {
      setAssignmentPage((prevState: any) => {
        return prevState + 1;
      });
    }
  };

  const nothingOnLoad = (e: any) => {};

  const genarateReportFunction = () => {
    setShowDrawer(false);
    setTimeout(() => {
      setShowDrawer(true);
    }, 500);
  };

  const goToReportsHistory = () => {
    history.push('/reports/history');
  };

  const sendMail = (e: any) => {
    finalRequestData.email = e;
    if (
      finalRequestData.targetExams === '' ||
      finalRequestData.startDate.date === null ||
      finalRequestData.endDate.date === null ||
      finalRequestData.assignmentId === '' ||
      finalRequestData.studentIds.length === 0 ||
      finalRequestData.batchIds.length === 0 ||
      finalRequestData.reportName === ''
    ) {
      setFillAllDataError('Please fill all entries');
    } else {
      if (selectedReportType === 'Single') {
        sendMailForSingleReport(finalRequestData).then((res: any) => {
          if (res && res.data.code === 200) {
            setDrawerState('emailSent');
            setDrawerMessage(res.data.message);
            resetAllStates();
          }
        });
      } else {
        sendMailForConsolidatedReport(finalRequestData).then((res: any) => {
          if (res && res.data.code === 200) {
            setDrawerState('emailSent');
            setDrawerMessage(res.data.message);
            resetAllStates();
          }
        });
      }
    }
  };

  const resetAllStates = () => {
    setRequestData(initialState);
    changeShowData({
      showAll: false,
      showTestName: false,
      showBatchName: false,
      showStudentName: false,
      showReportName: false,
    });
    selectReportType('');
    setStudentList([]);
    setAssignmentPage(1);
  };

  const handleOnClose = () => {
    setFillAllDataError('');
  };

  return (
    <>
      <HeaderComponent />
      <CommonScreenBackground>
        <ReportsCardHeader>
          <Container>
            <br />
            <Grid>
              <ReportsHeading>Reports</ReportsHeading>
              <div style={{ textAlign: 'right' }}>
                <HistoryIcon onClick={goToReportsHistory}>
                  <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/history-icon.svg" />
                  History
                </HistoryIcon>
              </div>
            </Grid>
          </Container>
        </ReportsCardHeader>
        <ReportsContainer>
          <h4>Generate Test Report</h4>
          <div>
            <form>
              <div className="marginBottom">
                <label>Select Report Type</label>
                <select
                  onChange={e => reportTypeChange(e)}
                  value={selectedReportType}
                >
                  <option value="">Select option</option>
                  {reportTypes.type.map(typeVal => {
                    return (
                      <option key={typeVal} value={typeVal}>
                        {typeVal}
                      </option>
                    );
                  })}
                </select>
              </div>
              {showData.showAll ? (
                <div className="marginBottom">
                  <label id="demo-mutiple-chip-label">Select Target Exam</label>
                  <select onChange={e => selectExam(e)}>
                    <option value="">Select option</option>
                    {exams.map((typeVal: any, index: any) => {
                      return (
                        <option
                          key={typeVal.name + '' + index}
                          value={typeVal.name}
                        >
                          {typeVal.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              ) : null}
              {showData.showAll ? (
                <div>
                  <div className="marginBottom">
                    <label>Select DateRange</label>
                    <div className="calenderDate">
                      <DateTimePickers
                        type="startDate"
                        page="reports"
                        onSelect={selectDate}
                        minValue={undefined}
                        value={finalRequestData.startDate.date}
                      ></DateTimePickers>
                      <span>-</span>
                      <DateTimePickers
                        type="endDate"
                        page="reports"
                        onSelect={selectDate}
                        minValue={
                          finalRequestData.startDate.date
                            ? finalRequestData.startDate.date
                            : undefined
                        }
                        value={finalRequestData.endDate.date}
                      ></DateTimePickers>
                    </div>
                  </div>
                  {/* {
                    dateErrorMessage
                    ? 
                    <p className="errorText">
                    Start date should be less than end date.
                  </p> : 
                  null
                  } */}
                </div>
              ) : null}
              {showData.showAll ? (
                <div>
                  <div className="marginBottom" id="scroll-div">
                    <label id="demo-mutiple-chip-label">Select Test Name</label>
                    {selectedReportType === 'Single' ? (
                      <Select
                        className={classes.selectTestName}
                        onChange={e => selectTestName(e)}
                        defaultValue="none"
                        value={
                          finalRequestData.endDate.date === null
                            ? 'none'
                            : finalRequestData.assignmentName
                            ? finalRequestData.assignmentName
                            : 'none'
                        }
                        disabled={
                          finalRequestData.endDate.date === null &&
                          (!allAssignmentsForPage ||
                            !allAssignmentsForPage.list ||
                            !allAssignmentsForPage.list.length)
                            ? true
                            : false
                        }
                        MenuProps={{
                          onScroll: loadMoreItems,
                        }}
                      >
                        <MenuItem value="none">Select Test Name</MenuItem>
                        {finalRequestData.endDate.date !== null &&
                          allAssignmentsForPage &&
                          allAssignmentsForPage.list &&
                          allAssignmentsForPage.list.length > 0 &&
                          allAssignmentsForPage.list.map((typeVal: any) => {
                            return (
                              <MenuItem key={typeVal.id} value={typeVal.name}>
                                {typeVal.name}
                              </MenuItem>
                            );
                          })}
                      </Select>
                    ) : (
                      <div className={classes.selectmultiTestName}>
                        <AutoCompleteMutiSelect
                          dataPassed={
                            allAssignmentsForPage ? allAssignmentsForPage : []
                          }
                          resetValue={finalRequestData.endDate.date}
                          disabled={
                            finalRequestData.endDate.date === null &&
                            (!allAssignmentsForPage ||
                              !allAssignmentsForPage.list ||
                              !allAssignmentsForPage.list.length)
                              ? true
                              : false
                          }
                          onScrollForLoad={loadMoreItems}
                          onSelect={selectTestName}
                          placeHolderText="Select Test Name"
                        ></AutoCompleteMutiSelect>
                      </div>
                    )}
                  </div>
                  {selectedReportType !== 'Single' ? (
                    <p className="msgText">
                      You can select max. 25 Tests at a time.
                    </p>
                  ) : null}
                </div>
              ) : null}
              {showData.showAll ? (
                <div className="marginBottom">
                  <label>Select Batch Name</label>
                  <div className={classes.selectmultiTestName}>
                    <AutoCompleteMutiSelect
                      dataPassed={
                        finalRequestData.assignmentId === ''
                          ? []
                          : allBatchesForPage
                      }
                      resetValue={finalRequestData.assignmentId}
                      onScrollForLoad={nothingOnLoad}
                      disabled={finalRequestData.assignmentId === ''}
                      onSelect={selectBatches}
                      placeHolderText="Select Batches"
                    ></AutoCompleteMutiSelect>
                  </div>
                </div>
              ) : null}
              {showData.showAll ? (
                <div className="marginBottom">
                  <label>Select Student Name</label>
                  <div className={classes.selectmultiTestName}>
                    <AutoCompleteMutiSelect
                      onScrollForLoad={nothingOnLoad}
                      resetValue={finalRequestData.assignmentId}
                      dataPassed={
                        finalRequestData.assignmentId === ''
                          ? []
                          : { list: studentList, screen: 'student-list' }
                      }
                      disabled={
                        finalRequestData.batchIds.length === 0 ? true : false
                      }
                      onSelect={selectStudents}
                      placeHolderText="Select Students"
                    ></AutoCompleteMutiSelect>
                  </div>
                </div>
              ) : null}
              {showData.showAll ? (
                <div className="marginBottom">
                  <label>Enter Report Name</label>
                  <input
                    type="text"
                    className="reportText"
                    placeholder="Report name"
                    onChange={event =>
                      setRequestData({
                        ...finalRequestData,
                        reportName: event.target.value,
                      })
                    }
                  />
                </div>
              ) : null}
              {showData.showAll ? (
                <div className="buttonField">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={genarateReportFunction}
                    disabled={
                      finalRequestData.targetExams === '' ||
                      finalRequestData.startDate.date === null ||
                      finalRequestData.endDate.date === null ||
                      finalRequestData.assignmentId === '' ||
                      finalRequestData.studentIds.length === 0 ||
                      finalRequestData.batchIds.length === 0 ||
                      finalRequestData.reportName === ''
                    }
                  >
                    Generate
                  </Button>
                </div>
              ) : null}
            </form>
          </div>
        </ReportsContainer>
        <SwipeableTemporaryDrawer
          showDrawer={showDrawer}
          state={drawerState}
          sendFinalDataToApi={sendMail}
          successMessage={drawerMessage}
        ></SwipeableTemporaryDrawer>
        {fillAllDataError != '' ? (
          <SimpleSnackbar
            mode="error"
            onClose={handleOnClose}
            state={fillAllDataError ? true : false}
            message={fillAllDataError}
            autoHideDuration={3000}
          />
        ) : null}
      </CommonScreenBackground>
    </>
  );
};

export default GenarateReportScreen;
