import React, { useEffect, useState, useCallback } from 'react';
import HeaderComponent from '../../components/common/header.component';

import {
  Container,
  InputContainer,
  Button,
  Right,
  HiddenDesktop,
  HiddenMobile,
} from '../../components';

import styled from 'styled-components';
import { getTests, handleTestAssign } from '../../helpers/private.api.helper';
import { useHistory, useParams } from 'react-router-dom';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Highlighted from 'app/components/atoms/highlighted';
import SearchIcon from '@material-ui/icons/Search';
import LoaderWrapper from '../../components/common/loader.wrapper.component';
import { EmptyState } from '../../components/common/emptyState.component';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {
  filterData,
  IListObj,
  extractAttemptsAndTotal,
  getNameByOrgType,
} from '../../helpers/comman.helper';
import { sagaMiddleware } from '../../stores/configure.store';
import { fetchTests } from './test.sagas';
import SimpleSnackbar from 'app/components/common/snackbar.component';
import TestListCardComponent from 'app/components/common/test.list.card.component';
import LockIcon from '@material-ui/icons/Lock';
import { getUserNameFromStorage } from 'app/helpers/local.storage.helper';
import { CardListing } from 'app/components/common/common.screen.styles';
import { CircularProgress } from '@material-ui/core';
import { API_STATE } from 'app/stores/api.reducer';
import InfoToolTip from 'app/components/common/info.tooltip';
import EmptyStateWrapper from 'app/components/common/empty.state.wrapper.component';
import ToolTipWrapper from 'app/components/common/tool.tip.wrapper.component copy';
import TopicLockModal from 'app/components/common/topicLock.component';
import { testsDataInterface, testInterface } from 'app/types/test.screen.types';
import {
  TopicUnlockAnalyticEvent,
  SearchAnalyticEvent,
} from 'app/helpers/analytics.helper';
import ExpandableSearch from 'app/components/common/expandable.search.component';

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
  /* min-height: 190px; */
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
`;

const TopicName = styled.span`
  font-size: 16px;
  @media (max-width: 768px) {
    text-indent: 35px;
    font-size: 12px;
    display: inline-block;
  }
`;
const ClassCount = styled.div`
  font-size: 1.5em;
  margin-top: 30px;
  display: flex;
  @media (max-width: 768px) {
    margin: initial;
    font-size: 20px;
  }

  span:nth-of-type(3) {
    text-indent: 50px;
    font-size: 16px;
    display: block;
    max-width: 100%;
    @media (max-width: 768px) {
      padding-left: 2em;
      text-indent: initial;
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
    transform: scale(0.8);
  }
`;

const FixedFooterContainer = styled.div`
  margin-bottom: 4em;
`;

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.15);
  padding: 10px;
`;

const ButtonEdit = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  @media (max-width: 768px) {
    margin: 0 auto;
  }
`;

const Breadcrumb = (
  // TODO add interface later
  params: any,
  history: any,
  classes: any,
) => {
  const { batchId, batchName, chapterName, parentIds, chapterIds } = params;

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
      <Link className={classes.lastBread}>Topic</Link>
    </Breadcrumbs>
  );
};

interface IProps {
  tests: testsDataInterface;
}

const TestScreen = function(props: IProps) {
  const history = useHistory();
  const classes = useStyles();
  const [showHeading, setShowHeading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [topicLockModalOpen, setTopicLockModalOpen] = useState(false);
  const routeParams: any = useParams();

  const {
    batchId,
    conceptIds,
    isConceptLocked,
    conceptName,
    chapterName,
    batchName,
    parentIds,
    chapterIds,
  } = routeParams;

  useEffect(() => {
    sagaMiddleware.run(fetchTests, getTests, {
      batchId,
      conceptIds,
      mode: 'data',
    });
  }, [batchId, conceptIds]);

  const searchExpandCallback = useCallback(
    (expanded: true) => {
      if (expanded === showHeading) {
        setShowHeading(!expanded);
      }
    },
    [showHeading],
  );
  const { tests } = props;

  const filterTests = filterData({
    data: tests.data,
    filter: { key: 'name', value: searchText },
  });
  const handleLock = async function() {
    setIsLoading(true);
    if (batchId && conceptIds) {
      const queryParams = {
        batchId,
        type: 'concept',
        typeId: conceptIds,
        teacherName: getUserNameFromStorage(),
        testTypeId: '5dad558756f1b60f71781562',
        newLockValue: isConceptLocked == 'true' ? false : true,
      };
      const response: any = await handleTestAssign(queryParams);
      if (response.data.code === 200) {
        sagaMiddleware.run(fetchTests, getTests, {
          batchId,
          conceptIds,
          mode: 'data',
        });
        history.replace(
          `/tests/${batchId}/${conceptIds}/${conceptName}/${queryParams.newLockValue}/
          ${batchName}/${parentIds}/${chapterIds}/${chapterName}`,
        );
      } else {
        //setErrorMessage(response.data.message);
      }
      if (!queryParams.newLockValue) {
        // Trigger analytics
        TopicUnlockAnalyticEvent({
          topicName: conceptName as string,
          chapterName: chapterName as string,
          className: batchName as string,
        });
      }
      setIsLoading(false);
    }
  };
  return (
    <>
      <HeaderComponent />
      <ConceptScreenBackground>
        <CardHeader>
          <Container>
            {Breadcrumb(routeParams, history, classes)}
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
                {/* <span>Test ({filterTests.length}) </span> */}
                {/* <span>
                  {conceptName ? (
                    <ToolTipWrapper content={decodeURIComponent(conceptName)} />
                  ) : (
                    ''
                  )}
                </span> */}
                {showHeading && (
                  <span>{conceptName && decodeURIComponent(conceptName)} </span>
                )}
              </ClassCount>

              <HiddenDesktop>
                <ExpandableSearch
                  searchText={searchText}
                  onChange={(el: any) => setSearchText(el.target.value)}
                  callback={searchExpandCallback}
                  placeholder={'Search for test'}
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
                          placeholder={'Search for test'}
                          type="text"
                          value={searchText || ''}
                          onChange={(el: any) => {
                            setSearchText(el.target.value);
                            // Trigger analytics
                            SearchAnalyticEvent({
                              subject: 'NA',
                              searchText: el.target.value,
                              level: 'Test',
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
        <FixedFooterContainer>
          <Container>
            <CardListing cols="60% 17% 18% 5%" responsiveCols="50% 17% 18% 5%">
              {filterTests.length > 0 && (
                <div className="listHeader">
                  <span>Test</span>
                  <span className="text-center">Submissions</span>
                  <span className="text-center">
                    Avg. Score{' '}
                    <InfoToolTip
                      title={
                        <p>
                          Total marks obtained by students per total marks for
                          the respective test.
                        </p>
                      }
                    />
                  </span>
                </div>
              )}
              <LoaderWrapper isLoading={tests.apiState === API_STATE.LOADING}>
                <EmptyStateWrapper
                  isEmpty={filterTests.length === 0}
                  fallback={
                    <EmptyState emptyViaSearch={searchText.length > 0} />
                  }
                >
                  {filterTests.map((test: testInterface, index: any) => {
                    const testData = {
                      testName: test.name,
                      testId: test.id,
                      duration: test.duration,
                      syllabus: test.syllabus.slice(0, 250),
                      courseId: test.courseId,
                    };
                    return (
                      <TestListCardComponent
                        sNo={index + 1}
                        key={test.name + index}
                        mode="data"
                        highlightedName={
                          <Highlighted
                            text={test ? test.name : ''}
                            highlight={searchText}
                          />
                        }
                        test={test}
                        conceptName={conceptName}
                        handleClick={() => {
                          history.push(
                            `/tests/details/${batchId}/${conceptIds}/${conceptName}/${isConceptLocked}/${batchName}/${parentIds}/${chapterIds}/${chapterName}/${encodeURIComponent(
                              JSON.stringify(testData),
                            )}?tab=Details`,
                          );
                        }}
                      />
                    );
                  })}
                </EmptyStateWrapper>
              </LoaderWrapper>
            </CardListing>
            <SimpleSnackbar
              mode="error"
              state={
                tests.apiState === API_STATE.FAILED ||
                tests.apiState === API_STATE.ERROR
              }
              onClose={() => {}}
              message={tests.error}
            />
          </Container>
        </FixedFooterContainer>
        <TopicLockModal
          isOpen={topicLockModalOpen}
          onClose={() => setTopicLockModalOpen(false)}
          handleLock={handleLock}
          newLockValue={isConceptLocked == 'true' ? false : true}
          data={extractAttemptsAndTotal(tests.data)}
        />
        <Footer
          style={{ display: filterTests.length === 0 ? 'none' : 'block' }}
        >
          <Container>
            <Right>
              <LoaderWrapper
                isLoading={isLoading}
                fallback={<CircularProgress />}
              >
                <ButtonEdit onClick={() => setTopicLockModalOpen(true)}>
                  <LockIcon />
                  &nbsp;{isConceptLocked == 'true' ? 'Unlock' : 'Lock'} Topic
                </ButtonEdit>
              </LoaderWrapper>
            </Right>
          </Container>
        </Footer>
      </ConceptScreenBackground>
    </>
  );
};

export default TestScreen;
