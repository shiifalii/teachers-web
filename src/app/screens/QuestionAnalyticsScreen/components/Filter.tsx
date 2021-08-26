import React, { useState, useEffect } from 'react';
import { FilterContainer } from 'app/components/common/common.screen.styles';
import { Center, Flex, Left } from 'app/components/atoms';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {
  SortType,
  FilterState,
  SortableFields,
} from '../questionAnalytics.screen';
import styled from 'styled-components';

const LeftEdit = styled(Left)`
  margin-bottom: 10px;
`;

interface FilterProps {
  appliedFilters: FilterState;
  close: () => void;
  applyFilters: (filters: FilterState) => void;
}

function Filter(props: FilterProps) {
  const [candidateFilters, setCandidateFilters] = useState<FilterState>({
    sortBy: {
      field: '',
      type: SortType.DESCENDING,
    },
  });

  const modifySortBy = (field: SortableFields, type: SortType) => {
    setCandidateFilters(prevState => ({
      ...prevState,
      sortBy: { ...prevState.sortBy, field, type },
    }));
  };

  const handleClick = () => {
    applyFilters(candidateFilters);
    close();
  };

  const { appliedFilters, close, applyFilters } = props;

  useEffect(() => {
    setCandidateFilters(appliedFilters);
  }, [appliedFilters]);

  const { sortBy } = candidateFilters;

  return (
    <FilterContainer>
      <div>
        <LeftEdit>
          <h3>Sort By</h3>
        </LeftEdit>
      </div>
      <hr />
      <div className="filterOptions-container">
        <h3>Accuracy Rate</h3>
        <div className="filterOption questionFilter">
          <FormControlLabel
            control={<Radio />}
            label="High to Low"
            checked={
              sortBy.field === 'avgAccuracy' &&
              sortBy.type === SortType.DESCENDING
            }
            onChange={() => modifySortBy('avgAccuracy', SortType.DESCENDING)}
          />
          <FormControlLabel
            control={<Radio />}
            checked={
              sortBy.field === 'avgAccuracy' &&
              sortBy.type === SortType.ASCENDING
            }
            label="Low to High"
            onChange={() => modifySortBy('avgAccuracy', SortType.ASCENDING)}
          />
        </div>
      </div>
      <hr />
      <div className="filterOptions-container">
        <h3>Attempt Rate</h3>
        <div className="filterOption questionFilter">
          <FormControlLabel
            control={<Radio />}
            label="High to Low"
            checked={
              sortBy.field === 'attemptCount' &&
              sortBy.type === SortType.DESCENDING
            }
            onChange={() => modifySortBy('attemptCount', SortType.DESCENDING)}
          />
          <FormControlLabel
            control={<Radio />}
            checked={
              sortBy.field === 'attemptCount' &&
              sortBy.type === SortType.ASCENDING
            }
            label="Low to High"
            onChange={() => modifySortBy('attemptCount', SortType.ASCENDING)}
          />
        </div>
      </div>
      <hr />
      <div className="filterOptions-container">
        <h3>Avg. Time Taken</h3>
        <div className="filterOption questionFilter">
          <FormControlLabel
            control={<Radio />}
            label="High to Low"
            checked={
              sortBy.field === 'avgTimeTaken' &&
              sortBy.type === SortType.DESCENDING
            }
            onChange={() => modifySortBy('avgTimeTaken', SortType.DESCENDING)}
          />
          <FormControlLabel
            control={<Radio />}
            checked={
              sortBy.field === 'avgTimeTaken' &&
              sortBy.type === SortType.ASCENDING
            }
            label="Low to High"
            onChange={() => modifySortBy('avgTimeTaken', SortType.ASCENDING)}
          />
        </div>
      </div>
      <footer className="footer">
        <Flex justify="space-evenly">
          <Button
            size="large"
            variant="outlined"
            color="primary"
            onClick={close}
          >
            Cancel
          </Button>
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={handleClick}
          >
            Apply
          </Button>
        </Flex>
      </footer>
    </FilterContainer>
  );
}

export default Filter;
