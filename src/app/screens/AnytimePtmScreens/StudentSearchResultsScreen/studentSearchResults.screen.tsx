import React, { useCallback, useEffect, useState } from 'react';
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
} from '@material-ui/core';
import {
  Container,
  HiddenDesktop,
  HiddenMobile,
  InputContainer,
} from 'app/components';
import Highlighted from 'app/components/atoms/highlighted';
import {
  BackIcon,
  CardHeader,
  CardListing,
  ClassCount,
  CommonScreenBackground,
  Grid,
} from 'app/components/common/common.screen.styles';
import { EmptyState } from './components/EmptyState';
import ExpandableSearch from 'app/components/common/expandable.search.component';
import HeaderComponent from 'app/components/common/header.component';
import LoaderWrapper from 'app/components/common/loader.wrapper.component';

import { isLoading, titleCase } from 'app/helpers/comman.helper';
import debounce from 'app/helpers/debounce.helper';
import { useHistory, useParams } from 'react-router-dom';

import { SearchIconEdit } from '../StudentSearchScreen/styles';
import { Heading, useStyles } from './styles';
import StudentListItem from './components/StudentListItem';

interface IStudentSearchResultsScreen {
  fetchStudentSearchResults: any;
  addStudentSearchEvent: any;
  studentList: any;
}

function StudentSearchResultsScreen({
  fetchStudentSearchResults,
  addStudentSearchEvent,
  studentList,
}: IStudentSearchResultsScreen) {
  const history = useHistory();
  const routeParams: any = useParams();
  const { query } = routeParams;

  const [showHeading, setShowHeading] = useState(true);
  const [searchText, setSearchText] = useState(query);

  const classes = useStyles();

  const searchExpandCallback = useCallback(
    (expanded: true) => {
      if (expanded === showHeading) {
        setShowHeading(!expanded);
      }
    },
    [showHeading],
  );

  useEffect(() => {
    history.push(`/anytime-ptm/student-search/${searchText}`);
    if (searchText) {
      fetchQuerySearchResultsCallback(searchText);
    }
  }, [searchText]);

  const fetchQuerySearchResultsCallback = useCallback(
    debounce((query: string) => {
      if (query) {
        // setSearchResults([]);
        fetchStudentSearchResults({ query });
      }
    }, 300),
    [studentList],
  );

  const handleSearchItemClick = (id: string) => {
    const studentMeta = studentList.data.find((item: any) => item._id === id);
    if (studentMeta && searchText.length > 0) {
      addStudentSearchEvent({ searchTerm: searchText, meta: studentMeta });
    }
    history.push(`/anytime-ptm/student-profile/${id}`);
  };

  // !!!
  // TODO - add useMemo for list rendering

  return (
    <>
      <HeaderComponent />
      <CommonScreenBackground>
        <CardHeader>
          <Container>
            <br />
            <Grid>
              <ClassCount>
                <BackIcon>
                  <img
                    src={
                      'https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/back-icon.svg'
                    }
                    alt="back-icon"
                    onClick={() => history.push('/anytime-ptm/student-search')}
                  />
                </BackIcon>
                <span>{showHeading && <Heading>Anytime PTM</Heading>}</span>
              </ClassCount>

              <HiddenDesktop>
                <ExpandableSearch
                  searchText={searchText}
                  onChange={(el: any) => setSearchText(el.target.value)}
                  callback={searchExpandCallback}
                  placeholder={'Search students'}
                />
              </HiddenDesktop>

              <div>
                <div>
                  <HiddenMobile>
                    <InputContainer>
                      <FormControl>
                        <Input
                          className={classes.searchBatchStyle}
                          placeholder={'Search students'}
                          type="text"
                          value={searchText || ''}
                          onChange={(el: any) => setSearchText(el.target.value)}
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
                    </InputContainer>
                  </HiddenMobile>
                </div>
              </div>
            </Grid>
          </Container>
        </CardHeader>
        <Container>
          <CardListing>
            <>
              {studentList.data.length > 0 && !isLoading(studentList.apiState) && (
                <div className="listHeader">
                  <span style={{ paddingLeft: '5px' }}>
                    Search Results ({studentList.data.length})
                  </span>
                  <span className="text-center"></span>
                  <span className="text-center"></span>
                </div>
              )}
              <LoaderWrapper isLoading={isLoading(studentList.apiState)}>
                {studentList.data.map(
                  ({ _id, name, enrollmentNo, batchName }: any) => (
                    <StudentListItem
                      key={_id}
                      initials={name && name[0]}
                      name={
                        <Highlighted
                          text={titleCase(name)}
                          highlight={searchText}
                        />
                      }
                      studentId={_id}
                      enrollmentNo={enrollmentNo}
                      batchName={batchName}
                      handleClick={handleSearchItemClick}
                    />
                  ),
                )}
              </LoaderWrapper>
            </>
            {!studentList.data?.length && !isLoading(studentList.apiState) && (
              <EmptyState
                query={searchText}
                emptyViaSearch={searchText.length > 0}
              />
            )}
          </CardListing>
        </Container>
      </CommonScreenBackground>
      {/*       
            <SimpleSnackbar
                mode="error"
                state={isApiFailed(studentListData.apiState)}
                onClose={resetStudentListApi}
                message={'Unable to fetch student list for the test.'}
            /> */}
    </>
  );
}

export default StudentSearchResultsScreen;
