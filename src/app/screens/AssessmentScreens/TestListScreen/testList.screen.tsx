import React, { useMemo, useEffect, useState, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import { EmptyState } from 'app/components/common/emptyState.component';
import HeaderComponent from 'app/components/common/header.component';
import LoaderWrapper from 'app/components/common/loader.wrapper.component';
import Highlighted from 'app/components/atoms/highlighted';
import ExpandableSearch from 'app/components/common/expandable.search.component';
import SimpleSnackbar from 'app/components/common/snackbar.component';
import { Container, InputContainer } from 'app/components';
import { publishTestResult } from 'app/helpers/private.api.helper';
import InfoToolTip from 'app/components/common/info.tooltip';
import {
  Flex,
  HiddenDesktop,
  HiddenMobile,
  Center,
  Left,
} from 'app/components/atoms';

import {
  CardListing,
  CommonScreenBackground,
  Grid,
  ClassCount,
  BackIcon,
  CardHeader,
} from 'app/components/common/common.screen.styles';
import PublishResultPopup from './components/PublishResultPopup';
import {
  useStyles,
  TestListHeader,
  TestListContainer,
  ContainerEdit,
  StudentHeading,
} from './styles';
import {
  AssignedCPPTestListState,
  AssignedCPPTest,
} from 'app/types/assessment.screens.types';
import {
  isApiFailed,
  isLoading,
  getSearchedData,
} from 'app/helpers/comman.helper';
import TestListItem from './components/TestListItem';
import PublishSuccessPopup from './components/PublishSuccessPopup';

export type TestStatus = 'Past' | 'Upcoming' | 'Live';

interface TestListProps {
  fetchAssignedCPPTestList: any;
  resetTestListApi: any;
  testList: AssignedCPPTestListState;
}

function TestListScreen(props: TestListProps) {
  const [searchText, setSearchText] = useState('');
  const [showHeading, setShowHeading] = useState(true);
  const [publishingFailed, setPublishingFailed] = useState(false);
  const [selectedTest, setSelectedTest] = useState<any>({});
  const [openPublishPopup, setOpenPublishPopup] = useState(false);
  const [openSuccessPopup, setOpenSuccessPopup] = useState(false);

  const { fetchAssignedCPPTestList, testList, resetTestListApi } = props;
  const history = useHistory();
  const routeParams: any = useParams();
  const classes = useStyles();

  function navigateToStudentList(
    testData: AssignedCPPTest,
    isPublishResult?: boolean,
  ) {
    const {
      assignmentId,
      assignmentInfo: { testName },
      subjectiveAssignmentStatsId: {
        checked = undefined,
        submissions = undefined,
      } = {},
    } = testData;
    if (isPublishResult) {
      setSelectedTest(testData);
      setOpenPublishPopup(true);
    } else {
      const testQueryData = encodeURIComponent(
        JSON.stringify({
          testName,
          submissions,
          checked,
        }),
      );
      history.push(
        `/assessments/studentList?assignmentId=${assignmentId}&testData=${testQueryData}`,
      );
    }
  }

  useEffect(() => {
    fetchAssignedCPPTestList();
  }, [fetchAssignedCPPTestList]);

  const searchExpandCallback = useCallback(
    (expanded: true) => {
      if (expanded === showHeading) {
        setShowHeading(!expanded);
      }
    },
    [showHeading],
  );

  const {
    data: { assignedTest = [] },
  } = testList;

  let finalData = getSearchedData(
    assignedTest,
    ['assignmentInfo', 'testName'],
    searchText,
  );

  async function onSubmit() {
    const { assignmentId } = selectedTest;
    try {
      await publishTestResult({ assignmentId });
      setOpenPublishPopup(false);
      setOpenSuccessPopup(true);
    } catch (error) {
      console.log(error);
      setOpenPublishPopup(false);
      setPublishingFailed(true);
    }
  }

  return (
    <>
      <HeaderComponent />
      <CommonScreenBackground>
        <CardHeader>
          <ContainerEdit>
            <Grid>
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
                <span>
                  {showHeading && (
                    <StudentHeading>
                      Subjective Tests&nbsp;(
                      {assignedTest && assignedTest.length})
                    </StudentHeading>
                  )}
                </span>
              </ClassCount>
              <HiddenDesktop>
                <Flex justify="flex-end">
                  <ExpandableSearch
                    searchText={searchText}
                    onChange={(el: any) => setSearchText(el.target.value)}
                    callback={searchExpandCallback}
                    placeholder={'Search for tests'}
                  />
                </Flex>
              </HiddenDesktop>

              <HiddenMobile>
                <Flex justify="flex-end">
                  <InputContainer style={{ marginTop: 0 }}>
                    <FormControl>
                      <Input
                        className={classes.searchBatchStyle}
                        id="adornment-search"
                        placeholder={'Search for tests'}
                        type="text"
                        value={searchText || ''}
                        onChange={(el: any) => {
                          setSearchText(el.target.value);
                        }}
                        disableUnderline={true}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton aria-label="search icon">
                              <SearchIcon />
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </InputContainer>
                </Flex>
              </HiddenMobile>
            </Grid>
          </ContainerEdit>
        </CardHeader>
        <Container>
          <CardListing>
            <HiddenMobile>
              <TestListContainer>
                <LoaderWrapper isLoading={isLoading(testList.apiState)}>
                  {finalData.length > 0 && (
                    <TestListHeader>
                      <Left>Test List</Left>
                      <Center>Submissions</Center>
                      <Center>Checked</Center>
                      <Center>Avg. Score</Center>
                      <Center>
                        Due Date{' '}
                        <InfoToolTip
                          title={
                            <p>
                              Checking will be enabled 15 mins after the due
                              date
                            </p>
                          }
                        />
                      </Center>
                      <div></div>
                    </TestListHeader>
                  )}
                  {finalData.map((test: AssignedCPPTest) => (
                    <TestListItem
                      key={test._id}
                      data={test}
                      highlightedName={
                        <Highlighted
                          text={test.assignmentInfo.testName}
                          highlight={searchText}
                        />
                      }
                      setOpenPublishPopup={setOpenPublishPopup}
                      navigateToStudentList={navigateToStudentList}
                    />
                  ))}
                  {finalData.length === 0 && (
                    <EmptyState emptyViaSearch={searchText.length > 0} />
                  )}
                </LoaderWrapper>
              </TestListContainer>
            </HiddenMobile>

            <HiddenDesktop>
              <TestListContainer>
                <LoaderWrapper isLoading={isLoading(testList.apiState)}>
                  {finalData.map((test: AssignedCPPTest) => (
                    <TestListItem
                      key={test._id}
                      data={test}
                      setOpenPublishPopup={setOpenPublishPopup}
                      navigateToStudentList={navigateToStudentList}
                      highlightedName={
                        <Highlighted
                          text={test.assignmentInfo.testName}
                          highlight={searchText}
                        />
                      }
                    />
                  ))}
                  {finalData.length === 0 && (
                    <EmptyState emptyViaSearch={searchText.length > 0} />
                  )}
                </LoaderWrapper>
              </TestListContainer>
            </HiddenDesktop>
          </CardListing>
        </Container>
      </CommonScreenBackground>
      <SimpleSnackbar
        mode="error"
        state={isApiFailed(testList.apiState) || publishingFailed}
        onClose={
          publishingFailed ? () => setPublishingFailed(false) : resetTestListApi
        }
        message={
          publishingFailed
            ? 'Failed to publish the result.'
            : 'Unable to fetch subjective tests list.'
        }
      />
      <PublishResultPopup
        open={openPublishPopup}
        onSubmit={onSubmit}
        onClose={() => setOpenPublishPopup(false)}
      />
      <PublishSuccessPopup
        open={openSuccessPopup}
        onClose={() => {
          setOpenSuccessPopup(false);
          //@ts-ignore
          window.location = '/assessments/testList';
        }}
      />
    </>
  );
}

export default TestListScreen;
