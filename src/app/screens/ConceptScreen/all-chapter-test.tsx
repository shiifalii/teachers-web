import React, { useState, useRef, useEffect } from 'react';
import {
  Container,
  InputContainer,
  HiddenDesktop,
  HiddenMobile,
} from '../../components';
import { CardListing } from 'app/components/common/common.screen.styles';
import LoaderWrapper from '../../components/common/loader.wrapper.component';
import styled from 'styled-components';
import ChapterTestCard from './chapterTestCard';
import Highlighted from 'app/components/atoms/highlighted';
import { sagaMiddleware } from '../../stores/configure.store';
import { fetchChapterTests } from './concept.sagas';
import { useHistory, useParams } from 'react-router-dom';
import { EmptyState } from '../../components/common/emptyState.component';
import ChapTestDrawer from './assignChapTestDrawer';
import ActionDialog from './ActionDialog';
import {
  filterData,
  IListObj,
  isLoading,
  isApiFailed,
  getNameByOrgType,
  titleCase,
} from '../../helpers/comman.helper';

const ListHeader = styled.div`
  display: grid;
  grid-template-columns: 85% 15%;
  padding: 15px;
  border-bottom: 1px solid #e9e9e9;
  @media (max-width: 768px) {
    display: none;
  }
`;

interface IProps {
  chapterTestData: any;
  searchText: string;
  fetchChapterTestOnSucess: any;
  apiState: any;
}

export interface chapterTestsParams {
  batchId?: string;
  chapterIds?: string;
  parentIds?: string;
  batchName?: string;
  chapterName?: string;
}

function AllChapterTest(props: IProps) {
  const params: chapterTestsParams = useParams();
  const history = useHistory();
  const { batchId, chapterIds, chapterName, batchName, parentIds } = params;

  // let dataToIterate = props.chapterTestData.data;
  const [openDrawer, setOpenDrawer] = useState(false);
  const [targetExam, setTargetExamForAssignTest] = useState('');
  const [assignmentAssignedCount, setCount] = useState(0);
  const [testInfo, setTestInfo] = useState({
    testName: '',
    testId: '',
    duration: 0,
  });
  const [openActionDialog, setOpenActionDialog] = useState(false);
  const [drawerType, setDrawerType] = useState('');
  const [testStatus, setTestStatus] = useState('');
  const [actionDialogType, setActionDialogType] = useState('');
  const [editDataForDrawer, setEditDataForDrawer] = useState();
  const [viewBatchData, setViewBatchData] = useState({});

  let dataToIterate = [];
  if (props.chapterTestData && props.chapterTestData.length > 0) {
    dataToIterate = JSON.parse(JSON.stringify(props.chapterTestData));
    dataToIterate = dataToIterate.map((item: any) => ({
      ...item,
      hasTests: true,
      isLocked: !item.isAssinged,
    }));
  }
  const assignChapTest = (
    data: any,
    val: string,
    status: string,
    editData: any,
  ) => {
    setDrawerType(val);
    setTargetExamForAssignTest(data.courseId);
    setEditDataForDrawer(editData);
    setCount(data.assignmentsHistory.length);
    setTestInfo({
      testName: data.name,
      testId: data.testId,
      duration: data.duration,
    });
    setOpenDrawer(true);
    setTestStatus(status);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const closeActionDialog = () => {
    setOpenActionDialog(false);
  };

  const openDialog = (val: string) => {
    props.fetchChapterTestOnSucess();
    setActionDialogType(val);
    setOpenActionDialog(true);
  };

  const lockTest = (status: any) => {
    if (status !== 'Past') {
      setActionDialogType('locktest');
      setOpenActionDialog(true);
    } else {
    }
  };

  const viewBatchList = (data: any) => {
    setActionDialogType('viewbatch');
    setOpenActionDialog(true);
    setViewBatchData(data);
  };

  return (
    <>
      <Container
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: '60px',
          borderRadius: '4px',
          background: '#FFFFFF',
          boxShadow: '0px 2px 8px rgba(202, 202, 202, 0.25)',
          padding: '0',
        }}
      >
        <CardListing>
          {dataToIterate.length > 0 && (
            <ListHeader>
              <span>
                <img
                  style={{ marginRight: '8px', verticalAlign: 'middle' }}
                  src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/testPaper.svg"
                />{' '}
                Tests on this Chapter ({dataToIterate.length})
              </span>
            </ListHeader>
          )}
          <LoaderWrapper isLoading={isLoading(props.apiState)}>
            {dataToIterate.length > 0 ? (
              dataToIterate.map((data: any, index: any) => (
                <ChapterTestCard
                  key={index}
                  classes={
                    <Highlighted
                      text={titleCase(data.name)}
                      highlight={props.searchText}
                    />
                  }
                  fromScreen={'chapterTests'}
                  conceptData={data}
                  chapterName={chapterName}
                  batchName={batchName}
                  index={index}
                  lockTest={lockTest}
                  viewBatchList={viewBatchList}
                  openAssignDrawer={(
                    val: any,
                    testStatus: any,
                    editData: any,
                  ) => assignChapTest(data, val, testStatus, editData)}
                  handleClick={() => {
                    history.push(
                      `/tests/details/${batchId}/${'chapTest'}/${data.name}/${
                        data.isLocked
                      }/${batchName}/${parentIds}/${chapterIds}/${chapterName}/${encodeURIComponent(
                        JSON.stringify(data).replace(/%/g, '~~pct~~'),
                      )}?tab=Details`,
                    );
                  }}
                />
              ))
            ) : (
              <EmptyState emptyViaSearch={props.searchText.length > 0} />
            )}
          </LoaderWrapper>
        </CardListing>
        {/* {isApiError ? (
            <SimpleSnackbar
              mode="error"
              state={isApiError}
              onClose={handleApiReset}
              message={'Failed to fetch concept data.'}
            />
          ) : null} */}
        {openDrawer ? (
          <ChapTestDrawer
            targetExam={targetExam}
            openDrawer={openDrawer}
            assignedCount={assignmentAssignedCount}
            handleClose={handleDrawerClose}
            testInfo={testInfo}
            assignedSuccess={(val: string) => openDialog(val)}
            drawerType={drawerType}
            testStatus={testStatus}
            editDataForDrawer={editDataForDrawer}
          ></ChapTestDrawer>
        ) : null}
        <ActionDialog
          open={openActionDialog}
          onClose={closeActionDialog}
          type={actionDialogType}
          viewBatchData={viewBatchData}
          count={assignmentAssignedCount}
        />
      </Container>
    </>
  );
}

export default AllChapterTest;
