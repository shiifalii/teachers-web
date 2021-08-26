import React, { useEffect, useState, useCallback } from 'react';
import HeaderComponent from '../../components/common/header.component';
import ConceptCardComponent from '../../components/common/concept.card.component';
import {
  Container,
  InputContainer,
  HiddenDesktop,
  HiddenMobile,
} from '../../components';
import styled from 'styled-components';
import {
  getConcept,
  fetchChapterTestForTopics,
} from '../../helpers/private.api.helper';
import {
  getUsersCoursesFromStorage,
  getOrgTypeInStorage,
} from '../../helpers/local.storage.helper';
import { useHistory, useParams } from 'react-router-dom';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import makeStyles from '@material-ui/core/styles/makeStyles';
import SearchIcon from '@material-ui/icons/Search';
import InfoToolTip from 'app/components/common/info.tooltip';
import LoaderWrapper from '../../components/common/loader.wrapper.component';
import { EmptyState } from '../../components/common/emptyState.component';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { CardListing } from 'app/components/common/common.screen.styles';
import Highlighted from 'app/components/atoms/highlighted';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {
  filterData,
  IListObj,
  isLoading,
  isApiFailed,
  getNameByOrgType,
  titleCase,
} from '../../helpers/comman.helper';
import { sagaMiddleware } from '../../stores/configure.store';
import { fetchConcepts, fetchChapterTests } from './concept.sagas';
import { conceptScreenUrlParamInterface } from 'app/types/concept.screen.types';
import SimpleSnackbar from 'app/components/common/snackbar.component';
import { SearchAnalyticEvent } from 'app/helpers/analytics.helper';
import ExpandableSearch from 'app/components/common/expandable.search.component';
import AllChapterTest from './all-chapter-test';
interface IProps {
  concepts: IListObj;
  resetConceptsApi: any;
  chapterTests: any;
}

const useStyles = makeStyles({
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
});

const ConceptScreenBackground = styled.div`
  background-color: #f4f8f9;
  color: #fff;
  padding-bottom: 2em;
  min-height: calc(100vh - 70px);
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
  grid-template-columns: 75% 25%;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    grid-template-columns: 80% 20%;
  }
`;

const ClassCount = styled.div`
  font-size: 1.5em;
  margin-top: 30px;
  display: flex;
  @media (max-width: 768px) {
    margin: initial;
  }

  span:nth-of-type(2) {
    font-size: 1em;
    @media (max-width: 768px) {
      font-size: 20px;
    }
  }

  span:nth-of-type(3) {
    text-indent: 50px;

    font-size: 16px;
    max-width: 100%;
    display: block;
    @media (max-width: 768px) {
      text-indent: initial;
      max-width: 350px;
      font-size: 14px;
      padding-left: 2.5em;
    }
  }
`;

const BackIcon = styled.span`
  cursor: pointer;
  width: 26px;
  height: 21px;
  margin: 0 1em 0 0;
  @media (max-width: 768px) {
    margin: 0 0.3em 0 0;
  }
`;

const ListHeader = styled.div`
  display: grid;
  grid-template-columns: 85% 15%;
  padding: 15px;
  border-bottom: 1px solid #e9e9e9;
  @media (max-width: 768px) {
    display: none;
  }
`;

function getData(data: any[], searchText: string) {
  const orgType = getOrgTypeInStorage();
  let finalData: any[] = data.filter(
    ({ hasTests }) => orgType === 'institute' || hasTests,
  );

  finalData = filterData({
    data: finalData,
    filter: { key: 'name', value: searchText },
  });
  return finalData;
}

function getDataChapterTest(data: any[], searchText: string) {
  let finalData = filterData({
    data: data,
    filter: { key: 'name', value: searchText },
  });
  return finalData;
}

const Breadcrumb = (
  params: conceptScreenUrlParamInterface,
  history: any,
  classes: any,
) => {
  const { batchId, batchName, parentIds } = params;

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

      <Link className={classes.lastBread}>Chapter</Link>
    </Breadcrumbs>
  );
};

const ConceptScreen = function(props: IProps) {
  const { concepts: conceptList, resetConceptsApi } = props;
  const isConceptsLoading: boolean = isLoading(conceptList.apiState);
  const isApiError: boolean = isApiFailed(conceptList.apiState);
  const classes = useStyles();
  const history = useHistory();
  const [showHeading, setShowHeading] = useState(true);
  const params: conceptScreenUrlParamInterface = useParams();
  const { batchId, chapterIds, chapterName, batchName, parentIds } = params;
  const courses: any[] = getUsersCoursesFromStorage();
  const [searchText, setSearchText] = useState('');
  useEffect(() => {
    const conceptParams = {
      chapterIds: `parentIds=${chapterIds}`,
      batchId: batchId,
    };
    sagaMiddleware.run(fetchConcepts, getConcept, conceptParams);
    sagaMiddleware.run(fetchChapterTests, fetchChapterTestForTopics, {
      batchId: batchId,
      chapterIds: chapterIds,
    });
  }, []);

  const fetchChapTestAgain = () => {
    finalChapterTestsData = [];
    sagaMiddleware.run(fetchChapterTests, fetchChapterTestForTopics, {
      batchId: batchId,
      chapterIds: chapterIds,
    });
  };

  const searchExpandCallback = useCallback(
    (expanded: true) => {
      if (expanded === showHeading) {
        setShowHeading(!expanded);
      }
    },
    [showHeading],
  );
  const handleApiReset = () => resetConceptsApi();
  let subjects: any = [];
  let subjectNameSet = new Set();
  courses.forEach((course: any) => {
    course.subjects.forEach((subject: any) => {
      if (!subjectNameSet.has(subject.name.toLowerCase())) {
        subjects.push(subject);
        subjectNameSet.add(subject.name.toLowerCase());
      }
    });
  });
  const concepts = conceptList.data;
  let finalData = getData(concepts, searchText);
  let finalChapterTestsData = [];
  finalChapterTestsData = getDataChapterTest(
    props.chapterTests.data,
    searchText,
  );
  return (
    <>
      <HeaderComponent />
      <ConceptScreenBackground>
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
                    onClick={() => history.goBack()}
                  />
                </BackIcon>
                {/* <span>{chapterName} </span> */}
                {showHeading && (
                  <span>{chapterName && decodeURIComponent(chapterName)} </span>
                )}
              </ClassCount>

              <HiddenDesktop>
                <ExpandableSearch
                  searchText={searchText}
                  onChange={(el: any) => setSearchText(el.target.value)}
                  callback={searchExpandCallback}
                  placeholder={'Search for topics'}
                />
              </HiddenDesktop>

              <div>
                <div>
                  <HiddenMobile>
                    <InputContainer>
                      <FormControl>
                        <Input
                          className={classes.searchBatchStyle}
                          id="adornment-search"
                          placeholder={'Search for topics'}
                          type="text"
                          value={searchText || ''}
                          onChange={(el: any) => {
                            setSearchText(el.target.value);
                            // Trigger analytics
                            SearchAnalyticEvent({
                              subject: 'NA',
                              searchText: el.target.value,
                              level: 'Topic',
                            });
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
                  </HiddenMobile>
                </div>
              </div>
            </Grid>
          </Container>
        </CardHeader>
        <Container>
          <CardListing>
            {finalData.length > 0 && (
              <ListHeader>
                <span>
                  <img
                    style={{ marginRight: '8px', verticalAlign: 'middle' }}
                    src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/topics_icon.svg"
                  />
                  Topics
                </span>
                <span className="text-center">
                  Lock/Unlock{' '}
                  <InfoToolTip
                    title={
                      <p>
                        Lock/Unlock concept tests under the respective topic.
                      </p>
                    }
                  />
                </span>
              </ListHeader>
            )}
            <LoaderWrapper isLoading={isConceptsLoading}>
              {finalData.length > 0 ? (
                finalData.map((data: any, index: any) => (
                  <ConceptCardComponent
                    key={index}
                    classes={
                      <Highlighted
                        text={titleCase(data.name)}
                        highlight={searchText}
                      />
                    }
                    conceptData={data}
                    chapterName={chapterName}
                    batchName={batchName}
                    index={index}
                    fromScreen={'concepts'}
                    openAssignDrawer={() => {}}
                    handleClick={() => {
                      const url = `/tests/${batchId}/${data.ids.join(
                        ',',
                      )}/${encodeURIComponent(data.name)}/${
                        data.isLocked
                      }/${batchName}/${parentIds}/${chapterIds}/${chapterName}`;
                      history.push(url);
                    }}
                  />
                ))
              ) : (
                <EmptyState emptyViaSearch={searchText.length > 0} />
              )}
            </LoaderWrapper>
          </CardListing>
          {/* {finalChapterTestsData && finalChapterTestsData.length > 0 ? ( */}
          <AllChapterTest
            chapterTestData={finalChapterTestsData}
            searchText={searchText}
            apiState={props.chapterTests.apiState}
            fetchChapterTestOnSucess={fetchChapTestAgain}
          ></AllChapterTest>
          {/* ) : null} */}
          {isApiError ? (
            <SimpleSnackbar
              mode="error"
              state={isApiError}
              onClose={handleApiReset}
              message={'Failed to fetch concept data.'}
            />
          ) : null}
        </Container>
      </ConceptScreenBackground>
    </>
  );
};

export default ConceptScreen;
