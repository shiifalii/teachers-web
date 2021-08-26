import React, { useMemo, useEffect, useState, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Drawer from '@material-ui/core/Drawer';

import { sagaMiddleware } from '../../stores/configure.store';
import { fetchTestDetails } from 'app/screens/TestDetails/test.details.sagas';
import { getTestDetails } from 'app/helpers/private.api.helper';
import { EmptyState } from '../../components/common/emptyState.component';
import HeaderComponent from '../../components/common/header.component';
import Highlighted from 'app/components/atoms/highlighted';
import LoaderWrapper from '../../components/common/loader.wrapper.component';
import ExpandableSearch from 'app/components/common/expandable.search.component';
import { Container, InputContainer } from '../../components';
import {
  NoWrap,
  Flex,
  HiddenDesktop,
  HiddenMobile,
} from 'app/components/atoms';
import BreadCrumbStyles from 'app/components/common/breadcrumbs.styles';
import {
  studentAnalyticsDataInterface,
  StudentAnalyticsListItem,
} from 'app/types/studentAnalytics.screen.types';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import SimpleSnackbar from 'app/components/common/snackbar.component';
import ToolTipWrapper from 'app/components/common/tool.tip.wrapper.component copy';
import { testDetailsDataInterface } from 'app/types/testDetails.screen.types';
import StudentListing from './components/StudentListing';
import Filter from './components/Filter';
import MarksDescriptionToolTip from './components/MarksDescriptionToolTip';
import { CardListing } from 'app/components/common/common.screen.styles';
import {
  isLoading,
  isApiFailed,
  getSearchedData,
  getNameByOrgType,
} from '../../helpers/comman.helper';
import {
  StudentAnalyticsScreenBackground,
  CardHeader,
  Grid,
  ClassCount,
  BackIcon,
  useStyles,
  FilterIcon,
  SearchContainer,
  Inputstyle,
  LabelButton,
  GlassIcon,
  StudentHeading,
} from './styles';
import styled from 'styled-components';

interface StudentAnalyticsProps {
  studentAnalytics: studentAnalyticsDataInterface;
  fetchStudentAnalytics: any;
  testDetails: testDetailsDataInterface;
}

export enum SortType {
  ASCENDING,
  DESCENDING,
}

export interface FilterState {
  assignmentIds: string[];
  sortBy: {
    field: 'name' | 'marksScored';
    type: SortType;
  };
}

const StudentlistHeader = styled.div`
  @media (max-width: 600px) {
    display: flex !important;
    justify-content: space-between;
  }
`;

const toggleSortType = (sortType: SortType) => {
  if (sortType === SortType.ASCENDING) {
    return SortType.DESCENDING;
  } else {
    return SortType.ASCENDING;
  }
};

function StudentAnalyticsScreen(props: StudentAnalyticsProps) {
  const [searchText, setSearchText] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showHeading, setShowHeading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    assignmentIds: [],
    sortBy: { field: 'marksScored', type: SortType.DESCENDING },
  });
  const history = useHistory();
  const routeParams: any = useParams();
  const { assignmentIds, testData, conceptIds } = routeParams;
  const { studentAnalytics, fetchStudentAnalytics, testDetails } = props;
  const classes = useStyles();

  const { testId, testName } = JSON.parse(decodeURIComponent(testData));

  useEffect(() => {
    if (filters.assignmentIds.length > 0) {
      fetchStudentAnalytics({ assignmentIds: filters.assignmentIds });
    }
  }, [filters.assignmentIds, fetchStudentAnalytics]);

  useEffect(() => {
    const ids = assignmentIds.split(',');
    setFilters(prevState => ({ ...prevState, assignmentIds: ids }));
  }, [assignmentIds]);

  useEffect(() => {
    if (!testDetails.data || testDetails.data.length === 0) {
      sagaMiddleware.run(fetchTestDetails, getTestDetails, {
        testId,
        conceptIds,
      });
    }
  }, [conceptIds, testId, testDetails.data.length]);

  const applyFilters = (candidateFilters: FilterState) => {
    setFilters(candidateFilters);
  };
  const searchExpandCallback = useCallback(
    (expanded: true) => {
      if (expanded === showHeading) {
        setShowHeading(!expanded);
      }
    },
    [showHeading],
  );
  const toggleSortBy = (newSortField: 'name' | 'marksScored') => {
    const {
      sortBy: { field, type },
    } = filters;
    if (newSortField === field) {
      setFilters({
        ...filters,
        sortBy: { field: newSortField, type: toggleSortType(type) },
      });
    } else {
      setFilters({
        ...filters,
        sortBy: { field: newSortField, type: SortType.ASCENDING },
      });
    }
  };

  const sortedData = useMemo(() => {
    const { sortBy } = filters;
    return sortData(studentAnalytics.data, sortBy);
  }, [studentAnalytics.data, filters]);

  const finalData = getSearchedData(sortedData, 'name', searchText);

  const isFailedOrError =
    isApiFailed(testDetails.apiState) || isApiFailed(studentAnalytics.apiState);

  const noOfAttemptedStudents = finalData.reduce((acc, item) => {
    if (item.attempted) {
      acc += 1;
    }
    return acc;
  }, 0);

  const {
    sortBy: { field: sortByField, type: sortByType },
  } = filters;

  return (
    <>
      <HeaderComponent />
      <StudentAnalyticsScreenBackground>
        <CardHeader>
          <Container>
            <br />
            {conceptIds && conceptIds !== 'chapTest'
              ? Breadcrumb(routeParams, history)
              : null}
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
                      Students ({noOfAttemptedStudents}/{finalData.length})
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
                    placeholder={'Search for students'}
                  />

                  {showHeading &&
                    !isFailedOrError &&
                    conceptIds &&
                    conceptIds !== 'chapTest' && (
                      <FilterIcon onClick={() => setShowFilters(true)}>
                        <img
                          src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/filter-icon.svg"
                          alt="Filter"
                        />
                      </FilterIcon>
                    )}
                </Flex>
              </HiddenDesktop>

              <HiddenMobile>
                <Flex justify="flex-end">
                  <InputContainer style={{ marginTop: 0 }}>
                    <FormControl>
                      <Input
                        className={classes.searchBatchStyle}
                        id="adornment-search"
                        placeholder={'Search for students'}
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
                  {!isFailedOrError && conceptIds && conceptIds !== 'chapTest' && (
                    <FilterIcon onClick={() => setShowFilters(true)}>
                      <img
                        src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/filter-icon.svg"
                        alt="Filter"
                      />
                    </FilterIcon>
                  )}
                </Flex>
              </HiddenMobile>
            </Grid>
          </Container>
        </CardHeader>
        <Container>
          <CardListing cols="82% 13% 5%" responsiveCols="68% 24% 8%">
            {finalData.length > 0 && (
              <>
                <HiddenMobile>
                  <StudentlistHeader className="listHeader">
                    <span
                      onClick={() => toggleSortBy('name')}
                      className="clickable"
                      style={{ paddingLeft: '8px' }}
                    >
                      Students
                      <IconButton className="only-desktop">
                        {sortByField === 'name' &&
                        sortByType === SortType.DESCENDING ? (
                          <ArrowUpwardIcon
                            fontSize="small"
                            color={
                              sortByField === 'name' ? 'primary' : 'inherit'
                            }
                          />
                        ) : (
                          <ArrowDownwardIcon
                            fontSize="small"
                            color={
                              sortByField === 'name' ? 'primary' : 'inherit'
                            }
                          />
                        )}
                      </IconButton>
                    </span>
                    <span
                      onClick={() => toggleSortBy('marksScored')}
                      className="text-center clickable"
                    >
                      <IconButton className="only-desktop">
                        {sortByField === 'marksScored' &&
                        sortByType === SortType.DESCENDING ? (
                          <ArrowUpwardIcon
                            fontSize="small"
                            color={
                              sortByField === 'marksScored'
                                ? 'primary'
                                : 'inherit'
                            }
                          />
                        ) : (
                          <ArrowDownwardIcon
                            fontSize="small"
                            color={
                              sortByField === 'marksScored'
                                ? 'primary'
                                : 'inherit'
                            }
                          />
                        )}
                      </IconButton>
                      Marks <MarksDescriptionToolTip />
                    </span>
                  </StudentlistHeader>
                </HiddenMobile>

                <HiddenDesktop>
                  <StudentlistHeader className="listHeader">
                    <span className="clickable" style={{ paddingLeft: '8px' }}>
                      Students
                    </span>
                    <span className="text-center clickable">
                      Marks <MarksDescriptionToolTip />
                    </span>
                  </StudentlistHeader>
                </HiddenDesktop>
              </>
            )}
            <LoaderWrapper
              isLoading={
                isLoading(studentAnalytics.apiState) ||
                isLoading(testDetails.apiState)
              }
            >
              {finalData.map((student, i) => (
                <StudentListing
                  student={student}
                  highlightedName={
                    <Highlighted text={student.name} highlight={searchText} />
                  }
                  key={i}
                  testName={testName}
                />
              ))}
              {finalData.length === 0 && (
                <EmptyState emptyViaSearch={searchText.length > 0} />
              )}
            </LoaderWrapper>
          </CardListing>
        </Container>
        <Drawer
          anchor="right"
          open={showFilters}
          onClose={() => setShowFilters(false)}
        >
          <Filter
            allBatchesData={testDetails.data}
            appliedFilters={filters}
            close={() => setShowFilters(false)}
            applyFilters={applyFilters}
          />
        </Drawer>
        <SimpleSnackbar
          mode="error"
          state={isFailedOrError}
          onClose={() => {}}
          message={testDetails.error || studentAnalytics.error}
        />
      </StudentAnalyticsScreenBackground>
    </>
  );
}

const sortData = (
  data: StudentAnalyticsListItem[],
  sortBy: { field: 'name' | 'marksScored'; type: SortType },
) => {
  return [...data].sort((a, b) => {
    if (sortBy.field === 'name') {
      if (a.name < b.name) {
        return sortBy.type === SortType.ASCENDING ? -1 : 1;
      } else if (a.name >= b.name) {
        return sortBy.type === SortType.ASCENDING ? 1 : -1;
      }
    } else {
      if (a.marksScored !== undefined) {
        if (b.marksScored === undefined) {
          return -1;
        } else if (a.marksScored < b.marksScored) {
          return sortBy.type === SortType.ASCENDING ? -1 : 1;
        } else if (a.marksScored > b.marksScored) {
          return sortBy.type === SortType.ASCENDING ? 1 : -1;
        }
      } else if (b.marksScored !== undefined) {
        return 1;
      }
    }

    return 1;
  });
};

const Breadcrumb = (
  // TODO add interface later
  params: any,
  history: any,
) => {
  const classes = BreadCrumbStyles();
  const {
    batchId,
    conceptIds,
    conceptName,
    isConceptLocked,
    chapterName,
    batchName,
    parentIds,
    testData,
    chapterIds,
  } = params;

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      className={classes.styledBreadcrumbs}
    >
      <Link className={classes.link} onClick={() => history.push('/')}>
        Home
      </Link>
      <Link
        className={classes.link}
        onClick={() =>
          history.push(`/chapters/${batchId}/${parentIds}/${batchName}`)
        }
      >
        {getNameByOrgType()}
      </Link>
      <Link
        className={classes.link}
        onClick={() => {
          history.push(
            `/concepts/${batchId}/${parentIds}/${chapterIds}/${batchName}/${chapterName}`,
          );
        }}
      >
        Chapter
      </Link>
      <Link
        className={classes.link}
        onClick={() =>
          history.push(
            `/tests/${batchId}/${conceptIds}/${conceptName}/${isConceptLocked}/${batchName}/${parentIds}/${chapterIds}/${chapterName}`,
          )
        }
      >
        Topic
      </Link>
      <Link
        className={classes.link}
        onClick={() =>
          history.push(
            `/tests/details/${batchId}/${conceptIds}/${conceptName}/${isConceptLocked}/${batchName}/${parentIds}/${chapterIds}/${chapterName}/${testData}?tab=Analytics`,
          )
        }
      >
        Test (Analytics)
      </Link>
      <Link>Students</Link>
    </Breadcrumbs>
  );
};

export default StudentAnalyticsScreen;
