import React, { useEffect, useState, useCallback, useMemo } from 'react';
import HeaderComponent from '../../components/common/header.component';
import StudentCardComponent from '../../components/common/studentCard.component';
import {
  Container,
  InputContainer,
  HiddenMobile,
  HiddenDesktop,
  Flex,
} from '../../components';
import styled from 'styled-components';
import {
  getStudents,
  getChapters,
  getTopicsForSubjects,
} from '../../helpers/private.api.helper';
import { getUsersCoursesFromStorage } from '../../helpers/local.storage.helper';
import { useHistory, useParams } from 'react-router-dom';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import InfoToolTip from 'app/components/common/info.tooltip';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import makeStyles from '@material-ui/core/styles/makeStyles';
import SearchIcon from '@material-ui/icons/Search';
import { EmptyState } from '../../components/common/emptyState.component';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { withStyles } from '@material-ui/core/styles';
import {
  filterData,
  IListObj,
  IChapter,
  IStudent,
  isLoading,
  isApiFailed,
  titleCase,
  getNameByOrgType,
} from '../../helpers/comman.helper';
import LoaderWrapper from '../../components/common/loader.wrapper.component';
import { sagaMiddleware } from '../../stores/configure.store';
import {
  fetchChapters,
  fetchStudents,
  fetchTopicsForSubjects,
} from './chapter.sagas';
import { chapterScreenUrlParamInterface } from 'app/types/chapter.screen.types';
import SimpleSnackbar from 'app/components/common/snackbar.component';
import Highlighted from 'app/components/atoms/highlighted';
import {
  CardListing,
  TabHeader,
} from 'app/components/common/common.screen.styles';
import {
  ViewStudentsAnalyticEvent,
  SearchAnalyticEvent,
} from 'app/helpers/analytics.helper';
import { Hidden } from '@material-ui/core';
import ExpandableSearch from 'app/components/common/expandable.search.component';
import GridView from './components/grid-view';
import ListView from './components/list-view';
import FilterDrawer from './components/filter-drawer';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

interface IProps {
  chapters: IListObj;
  students: IListObj;
  topics: IListObj;
  resetChaptersApi: any;
  resetStudentsApi: any;
}

const useStyles = makeStyles({
  '.tabListGridContainer': {
    display: 'grid',
    gridTemplateColumns: '68% 32%',
    marginTop: '-3.5em !important',
    '@media (min-width:770px) and (max-width: 1000px)': {
      gridTemplateColumns: '60% 40%',
    },
  },
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
  filterSearchIcon: {
    background: '#fff',
    textAlign: 'center',
    verticalAlign: 'middle',
    padding: '11px',
    borderRadius: '4px',
    border: '0',
    marginLeft: '14px',
    cursor: 'pointer',
    '& :active': {
      outline: 'none',
    },
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
  labelName: {
    marginLeft: '4px',
    marginRight: '0',
    border: '1px solid #fff',
    borderRadius: '14px',
  },
});

const GreenSwitch = withStyles({
  root: {
    width: 52,
    height: 26,
    padding: 1,
    '@media (max-width: 380px)': {
      transform: 'scale(.7)',
    },
  },
  switchBase: {
    color: '#fff',
    padding: 1,
    '&$checked': {
      color: '#fff',
      transform: 'translateX(27px)',
    },
    '&$checked + $track': {
      backgroundColor: '#1D7DEA',
      opacity: 1,
    },
    '& + $track': {
      opacity: 1,
      backgroundColor: '#ececec',
      borderRadius: '20px',
    },
  },

  thumb: {
    width: 24,
    height: 25,
  },

  checked: {},
  track: {},
})(Switch);

const ChapterScreenBackground = styled.div`
  background-color: #f4f8f9;
  color: #fff;
  /* height: calc(100vh - 70px); */
  /* overflow: scroll; */
  padding-bottom: 2em;
`;

const CardHeader = styled.div`
  /* min-height: 165px; */
  padding-bottom: 4em;
  background-color: var(--brand-color);
  @media (max-width: 768px) {
    min-height: initial;
    padding: 1em 0;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 80% 20%;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    grid-template-columns: 70% 15% 15%;
  }
  @media (min-width: 770px) and (max-width: 1000px) {
    grid-template-columns: 70% 15% 15%;
  }
`;

const ClassCount = styled.div`
  font-size: 1.5em;
  margin-top: 10px;
  display: flex;
  @media (max-width: 768px) {
    font-size: 20px;
    margin-top: initial;
  }
`;

const BackIcon = styled.span`
  cursor: pointer;
  width: 26px;
  height: 21px;
  margin: 0 1em 0 0;
  @media (max-width: 768px) {
    margin: 0 0.3em 0 0;
    transform: scale(0.8);
  }
`;

const HiddenDesktopSpan = styled(HiddenDesktop as any)`
  display: inline;
  margin-right: 5px;
`;
const LabelButton = styled.button`
  display: inline-block;
  margin: 1px 2px;
  background-color: #fff;
  font-size: 14px;
  padding: 4px 12px 0;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #444;
  text-decoration: none;
  cursor: pointer;
  border-radius: 4px;
  border: 0;
  img {
    width: 22px;
  }
  @media (max-width: 768px) {
    height: 34px;
    line-height: 37px;
  }
`;
const SearchIconEdit = styled(SearchIcon)`
  fill: #1d7dea !important;
`;

const InputContainerEdit = styled(InputContainer as any)`
  text-align: left;
`;

function getData({
  isChapterTab,
  data,
  searchText,
  chosenSubject,
  currentMode,
  topicsData,
}: {
  isChapterTab: boolean;
  data: any[];
  searchText: string;
  chosenSubject: string;
  currentMode: string;
  topicsData: IListObj;
}) {
  let finalData: any[] = [];
  if (!isChapterTab) {
    finalData = filterData({
      data: data,
      filter: { key: 'name', value: searchText },
    });
  } else {
    finalData = data.reduce((acc, { subject, chapters }) => {
      if (
        chosenSubject === 'all' ||
        chosenSubject.toLowerCase() === subject.name.toLowerCase()
      ) {
        const filteredChapters = filterData({
          data: currentMode !== 'topic' ? chapters : topicsData,
          filter: { key: 'name', value: searchText },
        });
        if (filteredChapters.length > 0) {
          acc.push({
            subject,
            chapters: filteredChapters,
          });
        }
      }
      return acc;
    }, []);
  }
  return finalData;
}

const Breadcrumb = (
  params: chapterScreenUrlParamInterface,
  history: any,
  classes: any,
) => {
  const { batchName } = params;

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      className={classes.styledBreadcrumbs}
    >
      <Link
        className={classes.link}
        color="inherit"
        onClick={() => history.push('/')}
      >
        Home
      </Link>
      <Link>{getNameByOrgType()}</Link>
    </Breadcrumbs>
  );
};

const ChapterScreen = function(props: IProps) {
  const {
    chapters: chapterList,
    students: studentList,
    topics: topicsList,
    resetChaptersApi,
    resetStudentsApi,
  } = props;
  const isStudentsLoading = isLoading(studentList.apiState);
  const [isChapterTab, setIsChapterTab] = useState(true);
  const [currentExpanded, setCurrentExpanded] = useState(0);
  const [showHeading, setShowHeading] = useState(true);
  const failedApiState = isChapterTab
    ? chapterList.apiState
    : studentList.apiState;
  const isApiError: boolean = isApiFailed(failedApiState);
  const handleApiReset = () =>
    isChapterTab ? resetChaptersApi() : resetStudentsApi();

  const errorMessage: string = isChapterTab
    ? 'Failed to fetch chapter data.'
    : 'Failed to fetch student data';
  const classes = useStyles();
  const history = useHistory();
  const params: chapterScreenUrlParamInterface = useParams();
  const { batchId, parentIds, batchName } = params;
  const courses: any[] = getUsersCoursesFromStorage();
  const [searchText, setSearchText] = useState('');

  const query = new URLSearchParams(history.location.search);
  const chosenSubject = query.get('subject') || 'all';

  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [currentView, setCurrentView] = useState('list');
  const [currentMode, setCurrentMode] = useState('chapter');
  const isChaptersLoading = isLoading(
    currentMode === 'chapter' ? chapterList.apiState : topicsList.apiState,
  );

  useEffect(() => {
    const chapterParams = {
      subjectIds: `parentIds=${parentIds}`,
      batchId,
    };
    sagaMiddleware.run(fetchChapters, getChapters, chapterParams);
    fetchStudentsViaSaga();
  }, []);
  const searchExpandCallback = useCallback(
    (expanded: true) => {
      if (expanded === showHeading) {
        setShowHeading(!expanded);
      }
    },
    [showHeading],
  );
  let subjects: any = [];
  let subjectNameSet = new Set();

  const fetchStudentsViaSaga = () => {
    if (!isStudentsLoading) {
      const studentParams = {
        subjectIds: `subjectIds=${parentIds}`,
        batchId: batchId,
      };
      sagaMiddleware.run(fetchStudents, getStudents, studentParams);
    }
  };

  const handleExpanded = (index: number) => {
    setCurrentExpanded(prevState => {
      if (prevState === index) {
        return -1;
      }
      return index;
    });
    if (currentMode === 'topic' && currentExpanded !== index) {
      fetchAllTopics(index);
    }
  };

  const getDataTopicsWithSearch = () => {
    let dataToPass = [];
    if (currentMode === 'topic') {
      if (searchText) {
        for (let i = 0; i < topicsList.data.length; i++) {
          if (topicsList.data[i].name.includes(searchText)) {
            dataToPass.push(topicsList.data[i]);
          }
        }
      } else {
        dataToPass = topicsList.data;
      }
    }
    return dataToPass;
  };

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
  const chaptersData: IChapter[] = chapterList.data;
  const students: IStudent[] = studentList.data;
  let topicsData: any = topicsList.data;
  let finalData = getData({
    isChapterTab,
    data: isChapterTab ? chaptersData : students,
    searchText,
    chosenSubject,
    currentMode,
    topicsData,
  });
  topicsData = getDataTopicsWithSearch();

  const allChaptersLength = useMemo(() => {
    return chaptersData.reduce((acc, data) => data.chapters.length, 0);
  }, [chaptersData]);

  const filteredChaptersLength = useMemo(() => {
    if (!isChapterTab) {
      return 0;
    }
    return finalData.reduce((acc, data) => acc + data.chapters.length, 0);
  }, [finalData, isChapterTab]);

  const filterDrawerToggle = () => {
    setShowFilterDrawer(false);
    setTimeout(() => {
      setShowFilterDrawer(true);
    }, 500);
  };

  const openView = (e: string) => {
    setCurrentView(e);
  };

  const handleModeChangeSwitch = () => {
    if (currentMode === 'chapter') {
      setCurrentMode('topic');
      fetchAllTopics(0);
    } else {
      topicsData = [];
      setCurrentMode('chapter');
    }
  };

  const fetchAllTopics = (num: any) => {
    let getInitialIds = getIdsOfChapters(num);
    const chapterParams = {
      subjectIds: `parentIds=${getInitialIds}`,
      batchId,
    };
    sagaMiddleware.run(
      fetchTopicsForSubjects,
      getTopicsForSubjects,
      chapterParams,
    );
  };

  const getIdsOfChapters = (num: any) => {
    let dataToLoop = chaptersData[num].chapters;
    let finalData = [];
    for (let i = 0; i < dataToLoop.length; i++) {
      for (let j = 0; j < dataToLoop[i].ids.length; j++) {
        finalData.push(dataToLoop[i].ids[j]);
      }
    }
    return finalData.join(',');
  };

  const setViewResponsive = (str: any) => {
    setCurrentView(str);
  };

  return (
    <>
      <HeaderComponent />
      <ChapterScreenBackground>
        <CardHeader>
          <Container>
            {Breadcrumb(params, history, classes)}
            <Grid>
              <ClassCount>
                <BackIcon>
                  <img
                    src={
                      'https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/back-icon.svg'
                    }
                    alt="back-icon"
                    onClick={() => history.push('/')}
                  />
                </BackIcon>
                {showHeading && (
                  <span>{batchName && decodeURIComponent(batchName)} </span>
                )}
              </ClassCount>
              <HiddenDesktop>
                <LabelButton onClick={filterDrawerToggle}>
                  <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/settingIcon.svg" />
                </LabelButton>
              </HiddenDesktop>
              <HiddenDesktop>
                <ExpandableSearch
                  searchText={searchText}
                  onChange={(el: any) => setSearchText(el.target.value)}
                  callback={searchExpandCallback}
                  placeholder={`Search for ${
                    isChapterTab ? 'chapters' : 'students'
                  }`}
                />
              </HiddenDesktop>
              <div>
                <HiddenMobile>
                  <InputContainerEdit>
                    <FormControl>
                      <Input
                        className={classes.searchBatchStyle}
                        id="adornment-search"
                        placeholder={`Search for ${
                          isChapterTab ? 'chapters' : 'students'
                        }`}
                        type="text"
                        value={searchText || ''}
                        onChange={(el: any) => {
                          setSearchText(el.target.value);
                          // Trigger analytics
                          SearchAnalyticEvent({
                            subject: 'NA',
                            searchText: el.target.value,
                            level: 'Chapter',
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
                    {/* <button
                      className={classes.filterSearchIcon}
                      onClick={filterDrawerToggle}
                    >
                      <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/filterIcon.svg" />
                    </button> */}
                  </InputContainerEdit>
                </HiddenMobile>
              </div>
            </Grid>
          </Container>
        </CardHeader>

        <Container>
          <TabHeader className={classes['.tabListGridContainer']}>
            <div>
              <ul>
                <li className={isChapterTab ? 'active' : ''}>
                  <span
                    onClick={() => {
                      if (!isChapterTab) {
                        setIsChapterTab(true);
                      }
                    }}
                  >
                    Chapters (
                    {isChapterTab ? filteredChaptersLength : allChaptersLength})
                  </span>
                </li>
                <li className={!isChapterTab ? 'active' : ''}>
                  <span
                    onClick={() => {
                      if (isChapterTab) {
                        setIsChapterTab(false);
                        // Trigger analytics
                        ViewStudentsAnalyticEvent({
                          isClicked: 'Yes',
                          class: batchName as string,
                        });
                      }
                    }}
                  >
                    Students (
                    {!isChapterTab ? finalData.length : students.length})
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <div className="viewTypesIcons">
                <div>
                  <label>View Type:</label>
                  {/* Add css for active ="active" */}
                  <span>
                    <img
                      src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/ListViewIcon.svg"
                      className={currentView === 'list' ? 'enable' : ''}
                      onClick={() => openView('list')}
                    />
                  </span>

                  <span>
                    <img
                      src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/gridViewIcon.svg"
                      className={currentView === 'grid' ? 'enable' : ''}
                      onClick={() => openView('grid')}
                    />
                  </span>
                </div>
                <div>
                  <label>
                    Switch to {currentMode === 'chapter' ? 'Topics' : 'Chapter'}{' '}
                    Mode
                  </label>
                  <FormControlLabel
                    className={classes.labelName}
                    control={
                      <GreenSwitch
                        checked={currentMode !== 'chapter' ? true : false}
                        value={currentMode !== 'chapter' ? true : false}
                        onChange={handleModeChangeSwitch}
                      />
                    }
                    label=""
                  />
                </div>
              </div>
            </div>
          </TabHeader>
          <CardListing
            style={{ marginTop: '1em' }}
            // cols={!isChapterTab ? '67% 13% 20%' : ''}
            // responsiveCols={!isChapterTab ? '68% 24% 8%' : ''}
          >
            {isChapterTab && (
              <>
                {finalData.length > 0 && (
                  <div className="listHeader">
                    <span>Subject/Chapter</span>
                    <span className="text-center">
                      Proficiency{' '}
                      <InfoToolTip
                        title={
                          <p>
                            It is the measure of how well concepts are
                            understood and applied by the student(s) to solve
                            problems.
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
                            subject/chapter.
                          </p>
                        }
                      />
                    </span>
                  </div>
                )}

                <LoaderWrapper isLoading={isChaptersLoading}>
                  {currentView === 'list' ? (
                    <ListView
                      finalData={finalData}
                      currentExpanded={currentExpanded}
                      batchId={batchId}
                      parentIds={parentIds}
                      searchText={searchText}
                      batchName={batchName}
                      topicsData={topicsData}
                      currentMode={currentMode}
                      expand={handleExpanded}
                    />
                  ) : (
                    <GridView
                      finalData={finalData}
                      currentExpanded={currentExpanded}
                      batchId={batchId}
                      parentIds={parentIds}
                      searchText={searchText}
                      batchName={batchName}
                      topicsData={topicsData}
                      currentMode={currentMode}
                      expand={handleExpanded}
                    ></GridView>
                  )}
                </LoaderWrapper>
              </>
            )}
            {!isChapterTab && (
              <>
                {finalData.length > 0 && (
                  <div className="listHeader">
                    <span style={{ paddingLeft: '5px' }}>Student</span>
                    <span className="text-center">
                      Proficiency{' '}
                      <InfoToolTip
                        title={
                          <p>
                            It is the measure of how well concepts are
                            understood and applied by the student(s) to solve
                            problems.
                          </p>
                        }
                      />
                    </span>
                    <span className="text-center">Submissions</span>
                  </div>
                )}
                <LoaderWrapper isLoading={isStudentsLoading}>
                  {finalData.map((data: any, index: number) => (
                    <StudentCardComponent
                      initials={data.name && data.name[0]}
                      name={
                        <Highlighted
                          text={titleCase(data.name)}
                          highlight={searchText}
                        />
                      }
                      proficiency={data.proficiency}
                      topic={`${data.submissions.count}/${data.submissions.total}`}
                      batchId={data.id}
                      enrollmentNo={data.enrollmentNo}
                      studentId={data.studentId}
                      index={index}
                    />
                  ))}
                </LoaderWrapper>
              </>
            )}
            {!finalData.length && !(isChaptersLoading || isStudentsLoading) && (
              <EmptyState emptyViaSearch={searchText.length > 0} />
            )}
          </CardListing>
          {isApiError ? (
            <SimpleSnackbar
              mode="error"
              state={isApiError}
              onClose={handleApiReset}
              message={errorMessage}
            />
          ) : null}
        </Container>
        <FilterDrawer
          showDrawer={showFilterDrawer}
          currentView={currentView}
          currentMode={currentMode}
          setCurrentView={setViewResponsive}
          setCurrentMode={handleModeChangeSwitch}
        ></FilterDrawer>
      </ChapterScreenBackground>
    </>
  );
};

export default ChapterScreen;
