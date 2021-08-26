import React, { useState, useEffect, useMemo } from 'react';
import { FilterContainer } from 'app/components/common/common.screen.styles';
import {
  Left,
  Center,
  Flex,
  HiddenMobile,
  HiddenDesktop,
} from 'app/components/atoms';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { TestDetailsListItem } from 'app/types/testDetails.screen.types';
import Checkbox from '@material-ui/core/Checkbox';
import { SortType, FilterState } from '../studentAnalytics.screen';
import { intersection } from 'app/helpers/comman.helper';

interface FilterProps {
  allBatchesData: TestDetailsListItem[];
  appliedFilters: FilterState;
  close: () => void;
  applyFilters: (filters: FilterState) => void;
}

function Filter(props: FilterProps) {
  const [candidateFilters, setCandidateFilters] = useState<FilterState>({
    assignmentIds: [],
    sortBy: { field: 'marksScored', type: SortType.DESCENDING },
  });

  const { allBatchesData, appliedFilters, close, applyFilters } = props;

  useEffect(() => {
    setCandidateFilters(appliedFilters);
  }, [appliedFilters]);

  const modifySortBy = (field: 'name' | 'marksScored', type: SortType) => {
    setCandidateFilters(prevState => ({
      ...prevState,
      sortBy: { ...prevState.sortBy, field, type },
    }));
  };

  const modifyIds = (assignmentId: string) => {
    if (!candidateFilters.assignmentIds.includes(assignmentId)) {
      setCandidateFilters(prevState => ({
        ...prevState,
        assignmentIds: [...prevState.assignmentIds, assignmentId],
      }));
    } else {
      setCandidateFilters(prevState => {
        let newIds = prevState.assignmentIds.filter(id => id !== assignmentId);
        return {
          ...prevState,
          assignmentIds: newIds,
        };
      });
    }
  };

  const handleClick = () => {
    if (candidateFilters.assignmentIds.length > 0) {
      applyFilters(candidateFilters);
    }
    close();
  };

  const {
    allBatchesAssignmentIds,
    totalAttempted,
    totalStudents,
  } = useMemo(() => {
    let allBatchesAssignmentIds: string[] = [];
    let totalAttempted = 0;
    let totalStudents = 0;
    allBatchesData.forEach(({ assignment, students }) => {
      allBatchesAssignmentIds.push(assignment.id);
      totalAttempted += students.attempted;
      totalStudents += students.total;
    });

    return { allBatchesAssignmentIds, totalAttempted, totalStudents };
  }, [allBatchesData]);

  const allBatchesSelected =
    intersection(candidateFilters.assignmentIds, allBatchesAssignmentIds)
      .length === allBatchesAssignmentIds.length;

  const toggleAllBatches = () => {
    let assignmentIds = allBatchesAssignmentIds;
    if (allBatchesSelected) {
      assignmentIds = [];
    }
    setCandidateFilters(prevState => ({
      ...prevState,
      assignmentIds,
    }));
  };

  const { sortBy } = candidateFilters;

  return (
    <FilterContainer>
      <div>
        <HiddenDesktop>
          <Left>
            <h3 className="filterHeading">Sort</h3>
          </Left>
        </HiddenDesktop>
        <HiddenMobile>
          <Center>
            <h3 className="filterHeading">Filter</h3>
          </Center>
        </HiddenMobile>
      </div>
      <div className="filterOptions-container mobile-only">
        <h3>Score</h3>
        <div className="filterOption studentFilter">
          <FormControlLabel
            control={<Radio />}
            label="High to Low"
            checked={
              sortBy.field === 'marksScored' &&
              sortBy.type === SortType.DESCENDING
            }
            onChange={() => modifySortBy('marksScored', SortType.DESCENDING)}
          />
          <FormControlLabel
            control={<Radio />}
            checked={
              sortBy.field === 'marksScored' &&
              sortBy.type === SortType.ASCENDING
            }
            label="Low to High"
            onChange={() => modifySortBy('marksScored', SortType.ASCENDING)}
          />
        </div>
      </div>
      <div className="filterOptions-container mobile-only">
        <h3>Alphabetically</h3>
        <div className="filterOption studentFilter">
          <FormControlLabel
            control={<Radio />}
            label="A-Z"
            checked={
              sortBy.field === 'name' && sortBy.type === SortType.ASCENDING
            }
            onChange={() => modifySortBy('name', SortType.ASCENDING)}
          />
          <FormControlLabel
            control={<Radio />}
            checked={
              sortBy.field === 'name' && sortBy.type === SortType.DESCENDING
            }
            label="Z-A"
            onChange={() => modifySortBy('name', SortType.DESCENDING)}
          />
        </div>
      </div>
      <div className="filterOptions-container filter-by-batch">
        <h3>Filter by Batch</h3>
        <div>
          <Flex
            justify="space-between"
            align="center"
            className="filterOption "
          >
            <label>
              All Batches ({totalAttempted}/{totalStudents})
            </label>
            <Checkbox
              checked={allBatchesSelected}
              onChange={toggleAllBatches}
              inputProps={{ 'aria-label': 'checkbox select-all' }}
            />
          </Flex>
          {allBatchesData.map(batch => (
            <Flex
              key={batch.assignment.id}
              justify="space-between"
              align="center"
              className="filterOption"
            >
              <label>
                {batch.name} ({batch.students.attempted}/{batch.students.total})
              </label>
              <Checkbox
                checked={candidateFilters.assignmentIds.includes(
                  batch.assignment.id,
                )}
                onChange={() => modifyIds(batch.assignment.id)}
                inputProps={{ 'aria-label': `checkbox ${batch.name}` }}
              />
            </Flex>
          ))}
        </div>
      </div>
      <footer className="footer">
        {candidateFilters.assignmentIds.length === 0 && (
          <Center className="validation">
            *Please select at least one batch
          </Center>
        )}
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
            disabled={candidateFilters.assignmentIds.length === 0}
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
