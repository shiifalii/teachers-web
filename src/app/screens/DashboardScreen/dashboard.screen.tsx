import React, { useEffect, useState } from 'react';
import HeaderComponent from '../../components/common/header.component';
import CommonListCardComponent from '../../components/common/common.list.card.component';
import styled from 'styled-components';
import Input from '@material-ui/core/Input';
import makeStyles from '@material-ui/core/styles/makeStyles';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import InfoToolTip from 'app/components/common/info.tooltip';
import LoaderWrapper from '../../components/common/loader.wrapper.component';
import {
  Container,
  InputContainer,
  Right,
  HiddenMobile,
  HiddenDesktop,
} from '../../components';
import { getClasses } from '../../helpers/private.api.helper';
import { getUsersCoursesFromStorage } from '../../helpers/local.storage.helper';
import { EmptyState } from '../../components/common/emptyState.component';
import { CardListing } from 'app/components/common/common.screen.styles';
import Highlighted from 'app/components/atoms/highlighted';
import {
  filterData,
  IBatch,
  IListObj,
  isLoading,
  isApiFailed,
  getNameByOrgType,
} from '../../helpers/comman.helper';
import { useHistory } from 'react-router-dom';
import { sagaMiddleware } from '../../stores/configure.store';
import { fetchClasses } from './dashboard.sagas';
import SimpleSnackbar from 'app/components/common/snackbar.component';
import {
  ClickedClassAnalyticEvent,
  SearchAnalyticEvent,
} from 'app/helpers/analytics.helper';
import Hidden from '@material-ui/core/Hidden';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Box } from '@material-ui/core';
import { AssignedCPPTestCountState } from 'app/types/assessment.screens.types';

interface IProps {
  classes: IListObj;
  resetClassesApi: any;
  notifications: any;
  resetNotificationsApi: any;
  resetAssignedCPPTestCountApi: any;
  fetchAssignedCPPTestCount: any;
  assignedCPPTestCount: AssignedCPPTestCountState;
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
  grid-template-columns: 70% 15% 15% 10%;
  padding: 15px 20px;
  border-bottom: 1px solid #e9e9e9;
  @media (max-width: 768px) {
    display: none;
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

function getListingData(
  batches: any[],
  selectedSubject: string,
  searchText: string,
) {
  let finalBatchData: any[] = [];
  batches.forEach((batch: any) => {
    const batchCopy: any = { ...batch };
    batchCopy._subjects = batch.subjects.filter((subject: any) => {
      return subject.name.toLowerCase() === selectedSubject.toLowerCase();
    });
    const subjectIds: string[] = [];
    batchCopy._subjects.forEach((subject: { ids: string[] }) =>
      subject.ids.forEach((id: string) => subjectIds.push(id)),
    );
    if (batchCopy._subjects.length > 0) {
      finalBatchData.push({
        id: batchCopy.id,
        batch: batchCopy.name.toUpperCase(),
        subjectIds: subjectIds,
        proficiency: batchCopy._subjects[0].proficiency,
        topics:
          batchCopy._subjects[0].topics.unlocked +
          '/' +
          batchCopy._subjects[0].topics.total,
      });
    }
  });
  finalBatchData = filterData({
    data: finalBatchData,
    filter: { key: 'batch', value: searchText },
  });
  return finalBatchData;
}

const DashboradScreen = function(props: IProps) {
  const {
    classes: classList,
    resetClassesApi,
    resetNotificationsApi,
    notifications,
    assignedCPPTestCount,
    fetchAssignedCPPTestCount,
    resetAssignedCPPTestCountApi,
  } = props;
  const isClassesLoading: boolean = isLoading(classList.apiState);
  const isApiError: boolean =
    isApiFailed(classList.apiState) ||
    isApiFailed(notifications.apiState) ||
    isApiFailed(assignedCPPTestCount.apiState);
  const history = useHistory();
  const classes = useStyles();
  const courses: any[] = getUsersCoursesFromStorage();
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    sagaMiddleware.run(fetchClasses, getClasses, null);
    fetchAssignedCPPTestCount();
  }, [fetchAssignedCPPTestCount]);

  const handleApiReset = () => {
    if (isApiFailed(classList.apiState)) {
      resetClassesApi();
    }
    if (isApiFailed(notifications.apiState)) {
      resetNotificationsApi();
    }
    if (isApiFailed(assignedCPPTestCount.apiState)) {
      resetAssignedCPPTestCountApi();
    }
  };
  const getSnackBarMessage = () => {
    if (isApiFailed(classList.apiState)) {
      return 'Failed to fetch class data.';
    }
    if (isApiFailed(notifications.apiState)) {
      return 'Failed to fetch notifications';
    }
    if (isApiFailed(assignedCPPTestCount.apiState)) {
      return 'Failed to fetch subjective tests';
    }
  };

  function navigateToTestList() {
    history.push('/assessments/testList');
  }

  let subjects: any = [];
  let subjectNameSet = new Set();
  courses.forEach((course: any) => {
    course.subjects.forEach((subject: any) => {
      //@ts-ignore
      if (!subjectNameSet.has(subject.name.toLowerCase())) {
        subjects.push(subject);
        //@ts-ignore
        subjectNameSet.add(subject.name.toLowerCase());
      }
    });
  });

  const batches: IBatch[] = classList.data;
  let finalBatchData = getListingData(batches, selectedSubject, searchText);

  return (
    <>
      <HeaderComponent />
      <DashboradBackground>
        <CardHeader>
          <Container>
            <Grid>
              <ClassCount>Home</ClassCount>
              <div>
                <InputContainerEdit>
                  <select
                    value={selectedSubject}
                    onChange={(e: any) => {
                      setSelectedSubject(e.target.value);
                    }}
                  >
                    <option value="all">All Subjects</option>
                    {subjects.map((subject: any) => (
                      <option value={subject.name.toLowerCase()}>
                        {subject.name}
                      </option>
                    ))}
                  </select>
                </InputContainerEdit>

                <Hidden only={['sm', 'xs']}>
                  <InputContainerEdit>
                    <div>
                      <FormControl>
                        <Input
                          className={classes.searchBatchStyle}
                          id="adornment-search"
                          placeholder={`Search for ${getNameByOrgType()}`}
                          type="text"
                          value={searchText || ''}
                          onChange={(el: any) => {
                            setSearchText(el.target.value);
                            // Trigger analytics
                            SearchAnalyticEvent({
                              subject: selectedSubject,
                              searchText: el.target.value,
                              level: 'Class',
                            });
                          }}
                          disableUnderline={true}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton aria-label="search icon">
                                <SearchIconEdit />
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </div>
                  </InputContainerEdit>
                </Hidden>
              </div>
            </Grid>

            <CustomHidden>
              <InputContainerEdit>
                <div>
                  <FormControl>
                    <Input
                      className={classes.searchBatchStyle}
                      id="adornment-search"
                      placeholder={`Search for ${getNameByOrgType()}`}
                      type="text"
                      value={searchText || ''}
                      onChange={(el: any) => {
                        setSearchText(el.target.value);
                        // Trigger analytics
                        SearchAnalyticEvent({
                          subject: selectedSubject,
                          searchText: el.target.value,
                          level: 'Class',
                        });
                      }}
                      disableUnderline={true}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton aria-label="search icon">
                            <SearchIconEdit />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </div>
              </InputContainerEdit>
            </CustomHidden>
          </Container>
        </CardHeader>
        <Container>
          <CardListing>
            <Title>
              My {getNameByOrgType()} ({finalBatchData.length})
            </Title>
            {finalBatchData.length > 0 && (
              <ClassesHeader>
                <span>Class List</span>
                <span className="text-center">
                  Proficiency{' '}
                  <InfoToolTip
                    title={
                      <p>
                        It is the measure of how well concepts are understood
                        and applied by the student(s) to solve problems.
                      </p>
                    }
                  />
                </span>
                <span className="text-center">
                  Topics Unlocked{' '}
                  <InfoToolTip
                    title={
                      <p>
                        Total number of topics unlocked under the respective
                        batch/class.
                      </p>
                    }
                  />
                </span>
              </ClassesHeader>
            )}
            <LoaderWrapper isLoading={isClassesLoading}>
              {finalBatchData.length ? (
                finalBatchData.map((batchData: any, index: number) => (
                  <CommonListCardComponent
                    onCardClick={() => {
                      const batchId = batchData.id;
                      const parentIds = batchData.subjectIds
                        .map((id: any) => id)
                        .join(',');
                      const batchName = batchData.batch;
                      // Trigger analytics
                      ClickedClassAnalyticEvent({ name: batchName });
                      history.push(
                        `/chapters/${batchId}/${parentIds}/${batchName}?subject=${selectedSubject}`,
                        { batchData },
                      );
                    }}
                    // classes={batchData.batch}
                    classes={
                      <Highlighted
                        text={batchData.batch}
                        highlight={searchText}
                      />
                    }
                    proficiency={batchData.proficiency}
                    topic={batchData.topics}
                    sNo={index + 1}
                    key={batchData.id}
                    hidesNoOnMobile={true}
                  />
                ))
              ) : (
                <EmptyState emptyViaSearch={searchText.length > 0} />
              )}
            </LoaderWrapper>
            <HiddenMobile>
              <Title>Test</Title>
              <LoaderWrapper
                isLoading={isLoading(assignedCPPTestCount.apiState)}
              >
                {assignedCPPTestCount.data.totalCount === undefined && (
                  <p style={{ margin: '1rem' }}>
                    Failed to fetch assigned CPPs data
                  </p>
                )}
                {assignedCPPTestCount.data.totalCount !== undefined && (
                  <AssignedTestBlock onClick={navigateToTestList}>
                    <Box display="flex" alignItems="center">
                      <img
                        src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/assigned-test-icon.svg"
                        alt=""
                      />{' '}
                      <span> Subjective Tests</span>
                    </Box>
                    <span>
                      {assignedCPPTestCount.data.totalCount}{' '}
                      {assignedCPPTestCount.data.totalCount === 1
                        ? 'Test'
                        : 'Tests'}
                    </span>
                    <Right>
                      <ChevronRightIcon />
                    </Right>
                  </AssignedTestBlock>
                )}
              </LoaderWrapper>
            </HiddenMobile>

            <HiddenDesktop>
              <Title>Test</Title>
              <LoaderWrapper
                isLoading={isLoading(assignedCPPTestCount.apiState)}
              >
                {assignedCPPTestCount.data.totalCount !== undefined && (
                  <AssignedTestBlock onClick={navigateToTestList}>
                    <span>
                      <img
                        src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/assigned-test-icon.svg"
                        alt=""
                      />
                    </span>
                    <Box display="flex" flexDirection="column">
                      <span> Subjective Tests </span>
                      <AssignedTestCount>
                        {assignedCPPTestCount.data.totalCount}{' '}
                        {assignedCPPTestCount.data.totalCount === 1
                          ? 'Test'
                          : 'Tests'}
                      </AssignedTestCount>
                    </Box>

                    <Right>
                      <ChevronRightIcon />
                    </Right>
                  </AssignedTestBlock>
                )}
              </LoaderWrapper>
            </HiddenDesktop>
          </CardListing>
          {isApiError ? (
            <SimpleSnackbar
              mode="error"
              state={isApiError}
              onClose={handleApiReset}
              message={getSnackBarMessage()}
            />
          ) : null}
        </Container>
      </DashboradBackground>
    </>
  );
};

export default DashboradScreen;
