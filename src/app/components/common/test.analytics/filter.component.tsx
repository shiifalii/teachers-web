import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { Center, Left } from 'app/components/atoms';
import { TestDetailsListItem } from 'app/types/testDetails.screen.types';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import { intersection } from 'app/helpers/comman.helper';

const Container = styled.div`
  max-width: 80vw;
  min-width: 450px;
  height: 100%;
  padding: 2rem 1rem 0.5rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 768px) {
    min-width: 300px;
    width: 100vw;
    max-width: 100%;
  }
  .validation {
    margin-top: auto;
  }
  .footer {
    display: flex;
    justify-content: space-evenly;
    box-shadow: 0px -1px 4px rgba(198, 198, 198, 0.5);
    padding: 10px;
    margin-right: -15px;
    margin-left: -15px;

    button {
      flex-basis: 40%;
    }
  }
  .filterOptions-container {
    margin-top: 2rem;
  }
  .filterOption {
    padding: 0.8rem 0;
    font-size: 14px;
    /* display: flex;
    flex-direction: column; */

    &:not(:last-of-type) {
      border-bottom: 1px solid #222;
    }
  }
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  font-size: 24px;
`;

const TextMuted = styled.div`
  font-size: 14px;
  text-align: center;
  color: #666666;
`;

const TextMutedEdit = styled(TextMuted)`
  font-size: 14px;
  text-align: center;
  color: #666666;
  display: inline;
`;

interface AnalyticsFilterProps {
  setCurrentAnalyticBatches: any;
  allBatchesData: TestDetailsListItem[];
  close: any;
  currentAnalyticBatches: TestDetailsListItem[];
}

function AnalyticsFilter(props: AnalyticsFilterProps) {
  const [filters, setFilters] = useState<{ ids: string[] }>({ ids: [] });

  const {
    setCurrentAnalyticBatches,
    allBatchesData,
    close,
    currentAnalyticBatches,
  } = props;

  const allBatchesIds = useMemo(() => allBatchesData.map(({ id }) => id), [
    allBatchesData,
  ]);

  useEffect(() => {
    setFilters({ ids: currentAnalyticBatches.map(({ id }) => id) });
  }, [currentAnalyticBatches]);

  const filteredBatches = useMemo(() => {
    return allBatchesData.filter(({ id }) => {
      return filters.ids.includes(id);
    });
  }, [filters, allBatchesData]);

  const handleClick = () => {
    if (filteredBatches.length > 0) {
      setCurrentAnalyticBatches(filteredBatches);
    }
    close();
  };

  const addToFilters = (batchId: string) => {
    if (!filters.ids.includes(batchId)) {
      setFilters(prevState => ({ ids: [...prevState.ids, batchId] }));
    } else {
      setFilters(prevState => {
        let newIds = prevState.ids.filter(id => id !== batchId);
        return {
          ...prevState,
          ids: newIds,
        };
      });
    }
  };

  const toggleAllBatches = () => {
    if (
      intersection(filters.ids, allBatchesIds).length === allBatchesIds.length
    ) {
      setFilters({ ids: [] });
    } else {
      setFilters({ ids: allBatchesIds });
    }
  };

  const allBatchesSelected =
    intersection(filters.ids, allBatchesIds).length === allBatchesIds.length;

  return (
    <Container>
      <main>
        <Left>
          <Title>Batches</Title>
        </Left>
        <div className="filterOptions-container">
          <Flex className="filterOption">
            <TextMuted>Assigned Batches</TextMuted>
            <div>
              <TextMutedEdit>Select All</TextMutedEdit>
              <Checkbox
                checked={allBatchesSelected}
                onChange={toggleAllBatches}
                inputProps={{ 'aria-label': 'checkbox select-all' }}
              />
            </div>
          </Flex>
          {allBatchesData.map(batch => (
            <Flex key={batch.id} className="filterOption">
              <label>{batch.name}</label>
              <Checkbox
                checked={filters.ids.includes(batch.id)}
                onChange={() => addToFilters(batch.id)}
                inputProps={{ 'aria-label': `checkbox ${batch.name}` }}
              />
            </Flex>
          ))}
        </div>
      </main>
      {filters.ids.length === 0 && (
        <Center className="validation">
          *Please select at least one batch
        </Center>
      )}
      <footer className="footer">
        <Button size="large" variant="outlined" color="primary" onClick={close}>
          Cancel
        </Button>
        <Button
          size="large"
          variant="contained"
          color="primary"
          disabled={filters.ids.length === 0}
          onClick={handleClick}
        >
          Apply
        </Button>
      </footer>
    </Container>
  );
}

export default AnalyticsFilter;
