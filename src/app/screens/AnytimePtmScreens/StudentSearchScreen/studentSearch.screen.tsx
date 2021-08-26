import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
} from '@material-ui/core';
import { Container } from 'app/components';
import {
  BackIcon,
  CardHeader,
  CardListing,
  ClassCount,
  CommonScreenBackground,
  Grid,
} from 'app/components/common/common.screen.styles';
import HeaderComponent from 'app/components/common/header.component';
import debounce from 'app/helpers/debounce.helper';
import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useHistory, useParams } from 'react-router-dom';

import SearchList from './components/SearchList/SearchList';
import { Heading, SearchIconEdit, SearchImg, useStyles } from './styles';

interface StudentSearchProps {
  fetchStudentRecentSearchList: any;
  fetchStudentSearchResults: any;
  addStudentSearchEvent: any;
  resetStudentSearchResultsApi: any;
  studentList: any;
  recentSearch: any;
}

function StudentSearchScreen({
  fetchStudentRecentSearchList,
  fetchStudentSearchResults,
  addStudentSearchEvent,
  resetStudentSearchResultsApi,
  studentList,
  recentSearch,
}: StudentSearchProps) {
  const history = useHistory();
  const routeParams: any = useParams();

  const classes = useStyles();

  const [searchQuery, setSearchQuery] = useState('');
  // const [searchInProgress, setSearchInProgress] = useState(false);
  // const [searchResults, setSearchResults] = useState([]);
  const [searchBoxFocusState, setSearchBoxFocusState] = useState(false);
  const recentSearchList = recentSearch.data.map(({ meta }: any) => meta);

  const searchListRef = useRef() as MutableRefObject<HTMLDivElement>;
  const searchInputRef = useRef() as MutableRefObject<HTMLInputElement>;

  const onSearchQueryChange = (event: any) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (!query) {
      // setSearchResults([]);
      return;
    }
    // setSearchInProgress(true);
  };

  useEffect(() => {
    fetchStudentRecentSearchList({});
  }, []);

  useEffect(() => {
    if (searchQuery) {
      fetchQuerySearchResultsCallback(searchQuery);
    }
  }, [searchQuery]);

  const fetchQuerySearchResultsCallback = useCallback(
    debounce((query: string) => {
      if (query && query.length > 0) {
        // setSearchResults([]);
        fetchStudentSearchResults({ query });
      }
    }, 500),
    [studentList],
  );

  const submitQuery = () => {
    if (searchQuery === '') return;
    history.push(`/anytime-ptm/student-search/${searchQuery}`);
    resetStudentSearchResultsApi();
  };

  const handleKeyboardSubmit = ({ key }: any) => {
    if (key === 'Enter') submitQuery();
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleListOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleListOutsideClick);
    };
  }, []);

  const handleListOutsideClick = (event: any) => {
    if (event.target.parentElement === null) return;
    const isInside =
      searchListRef?.current?.contains(event.target) ||
      searchInputRef?.current?.contains(event.target);
    setSearchBoxFocusState(isInside);
  };

  const handleSearchItemClick = (id: string) => {
    const studentMeta = studentList.data.find((item: any) => item._id === id);
    if (studentMeta && searchQuery.length > 0) {
      addStudentSearchEvent({ searchTerm: searchQuery, meta: studentMeta });
    }
    history.push(`/anytime-ptm/student-profile/${id}`);
  };

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
                  {/* <img
                    src={
                      'https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/back-icon.svg'
                    }
                    alt="back-icon"
                    onClick={() => history.goBack()}
                  /> */}
                </BackIcon>
                <span>
                  <Heading>Anytime PTM</Heading>
                </span>
              </ClassCount>
            </Grid>
          </Container>
        </CardHeader>
        <Container>
          <CardListing
            cols="82% 13% 5%"
            responsiveCols="68% 24% 8%"
            className={classes.searchStudentContainerStyle}
          >
            <div className={classes.SearchContainer}>
              <SearchImg>
                <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/frame-search.svg" />
              </SearchImg>

              <FormControl>
                <Input
                  className={classes.searchStudentStyle}
                  id="adornment-search"
                  placeholder="Search students by name or enrollment no."
                  type="text"
                  autoComplete="off"
                  value={searchQuery || ''}
                  onChange={onSearchQueryChange}
                  onFocus={() => setSearchBoxFocusState(true)}
                  disableUnderline={true}
                  onKeyUp={handleKeyboardSubmit}
                  ref={searchInputRef}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={submitQuery}
                        aria-label="search icon"
                      >
                        <SearchIconEdit />
                      </IconButton>
                    </InputAdornment>
                  }
                />

                {searchBoxFocusState &&
                  (studentList.data?.length !== 0 ||
                    (searchQuery === '' && recentSearchList.length !== 0)) && (
                    <SearchList
                      ref={searchListRef}
                      studentList={
                        searchQuery === '' ? recentSearchList : studentList.data
                      }
                      handleClick={handleSearchItemClick}
                    />
                  )}
              </FormControl>
            </div>
          </CardListing>
        </Container>
      </CommonScreenBackground>
      {/*       
      <SimpleSnackbar
        mode="error"
        state={isApiFailed(studentListData.apiState)}
        onClose={resetStudentSearchResultsApi}
        message={'Unable to fetch student list for the test.'}
      /> */}
    </>
  );
}

export default StudentSearchScreen;
