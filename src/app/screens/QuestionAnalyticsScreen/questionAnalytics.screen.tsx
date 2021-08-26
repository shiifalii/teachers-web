import React, { useMemo, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';

import { EmptyState } from '../../components/common/emptyState.component';
import HeaderComponent from '../../components/common/header.component';
import LoaderWrapper from '../../components/common/loader.wrapper.component';

import { Container } from '../../components';
import { NoWrap, Flex } from 'app/components/atoms';
import BreadCrumbStyles from 'app/components/common/breadcrumbs.styles';
import {
  questionAnalyticsDataInterface,
  QuestionAnalyticsListItem,
} from 'app/types/questionAnalytics.screen.types';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import SimpleSnackbar from 'app/components/common/snackbar.component';
import ToolTipWrapper from 'app/components/common/tool.tip.wrapper.component copy';
import Filter from './components/Filter';
import QuestionsListing from './components/QuestionsListing';
import {
  isLoading,
  isApiFailed,
  getNameByOrgType,
} from '../../helpers/comman.helper';
import {
  CommonScreenBackground,
  CardHeader,
  Grid,
  ClassCount,
  BackIcon,
} from 'app/components/common/common.screen.styles';
import { Page, FilterIcon } from './styles';

interface StudentAnalyticsProps {
  questionAnalytics: questionAnalyticsDataInterface;
  fetchQuestionAnalytics: any;
}

export enum SortType {
  ASCENDING,
  DESCENDING,
}

export type SortableFields =
  | 'avgAccuracy'
  | 'attemptCount'
  | 'avgTimeTaken'
  | '';
export interface FilterState {
  sortBy: {
    field: SortableFields;
    type: SortType;
  };
}

function QuestionAnalyticsScreen(props: StudentAnalyticsProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    sortBy: {
      field: '',
      type: SortType.DESCENDING,
    },
  });
  const history = useHistory();
  const routeParams: any = useParams();
  const { assignmentIds, testData } = routeParams;
  const { questionAnalytics, fetchQuestionAnalytics } = props;

  const { testName } = JSON.parse(decodeURIComponent(testData));

  useEffect(() => {
    const ids = assignmentIds.split(',');
    if (ids.length > 0) {
      fetchQuestionAnalytics({ assignmentIds: ids });
    }
  }, [assignmentIds, fetchQuestionAnalytics]);

  const applyFilters = (candidateFilters: FilterState) => {
    setFilters(candidateFilters);
  };

  const finalData = useMemo(() => {
    const { sortBy } = filters;
    return sortData(questionAnalytics.data, sortBy);
  }, [questionAnalytics.data, filters]);

  const isFailedOrError = isApiFailed(questionAnalytics.apiState);

  return (
    <>
      <HeaderComponent />
      <CommonScreenBackground>
        <CardHeader>
          <Container>
            {Breadcrumb(routeParams, history)}
            <Grid className="QuestionHeader">
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
                {/* <NoWrap>Questions ({questionAnalytics.data.length})</NoWrap> */}
                <span className="TestName">
                  Questions ({questionAnalytics.data.length})
                </span>
              </ClassCount>
              <Flex justify="flex-end">
                {!isFailedOrError && (
                  <FilterIcon onClick={() => setShowFilters(true)}>
                    <img
                      src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/filter-icon.svg"
                      alt="Filter"
                    />
                  </FilterIcon>
                )}
              </Flex>
            </Grid>
          </Container>
        </CardHeader>
        <Container>
          <Page>
            <LoaderWrapper isLoading={isLoading(questionAnalytics.apiState)}>
              <QuestionsListing
                data={finalData}
                filters={filters}
                applyFilters={applyFilters}
              />
              {finalData.length === 0 && <EmptyState />}
            </LoaderWrapper>
          </Page>
        </Container>
        <Drawer
          anchor="right"
          open={showFilters}
          onClose={() => setShowFilters(false)}
        >
          <Filter
            appliedFilters={filters}
            close={() => setShowFilters(false)}
            applyFilters={applyFilters}
          />
        </Drawer>
        <SimpleSnackbar
          mode="error"
          state={isFailedOrError}
          onClose={() => {}}
          message={questionAnalytics.error}
        />
      </CommonScreenBackground>
    </>
  );
}

const sortData = (
  data: QuestionAnalyticsListItem[],
  sortBy: {
    field: SortableFields;
    type: SortType;
  },
) => {
  const { field, type } = sortBy;
  if (field === '') {
    return data;
  }
  return [...data].sort((a, b) => {
    if (a.summary[field] < b.summary[field]) {
      return type === SortType.ASCENDING ? -1 : 1;
    } else if (a.summary[field] > b.summary[field]) {
      return type === SortType.ASCENDING ? 1 : -1;
    }
    return 0;
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
      <Link>Questions</Link>
    </Breadcrumbs>
  );
};

export default QuestionAnalyticsScreen;
