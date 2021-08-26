import React, { useState } from 'react';
import styled from 'styled-components';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useParams } from 'react-router-dom';
import { handleTestAssign } from '../../helpers/private.api.helper';
import { getUserNameFromStorage } from '../../helpers/local.storage.helper';
import {
  titleCase,
  extractAttemptsAndTotal,
} from '../../helpers/comman.helper';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { conceptScreenUrlParamInterface } from 'app/types/concept.screen.types';
import SimpleSnackbar from './snackbar.component';
import { sagaMiddleware } from '../../stores/configure.store';
import { fetchConcepts } from '../../screens/ConceptScreen/concept.sagas';
import { getConcept, getTests } from '../../helpers/private.api.helper';
import TopicLockModal from 'app/components/common/topicLock.component';
import { TopicUnlockAnalyticEvent } from 'app/helpers/analytics.helper';

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

export interface CardProps {
  classes: string | JSX.Element;
  conceptData: any;
  index: number;
  handleClick: any;
  chapterName?: string;
  batchName?: string;
  fromScreen: string;
  openAssignDrawer: any;
}

const Listing = styled.ul`
  border-bottom: 1px solid #eee;
  &:hover {
    background-color: #f5f5f5;
    transition: all 0.4s ease-in-out;
  }
  &:last-child() {
    border: none;
  }

  li {
    display: grid;
    grid-template-columns: 90% 8% 2%;
    padding: 1em;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 768px) {
      grid-template-columns: 75% 15% 5%;
    }
    div:nth-of-type(1) p:nth-of-type(1) {
      @media (max-width: 320px) {
        font-size: 13px;
      }
    }
  }
`;

const Proficiency = styled.p`
  font-size: 12px;
  color: #666666;
  display: flex;
`;

const ListingIndex = styled.span`
  margin-right: 5px;
`;

const Clickable = styled.div`
  font-size: 22px;
  cursor: pointer;
`;

const Placeholder = styled.div`
  height: 100%;
  width: 100%;
  align-items: center;
  display: flex;
`;

const ConceptCardComponent = function(props: CardProps) {
  const {
    classes,
    conceptData,
    index,
    handleClick,
    chapterName,
    batchName,
    fromScreen,
    openAssignDrawer,
  } = props;
  const { proficiency } = conceptData;
  const params: conceptScreenUrlParamInterface = useParams();
  const { batchId, chapterIds } = params;
  const [isLocked, setIsLocked] = useState(conceptData.isLocked);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [topicLockModalOpen, setTopicLockModalOpen] = useState(false);
  const [testAttemptData, setTestAttemptData] = useState({
    totalCount: 0,
    attempted: 0,
  });

  const handleOnClose = () => {
    setIsError(false);
    setIsSuccess(false);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleToggle = async () => {
    setIsLoading(true);
    if (batchId) {
      const queryParams = {
        batchId,
        type: 'concept',
        typeId: conceptData.ids.join(','),
        teacherName: getUserNameFromStorage(),
        testTypeId: '5dad558756f1b60f71781562',
        newLockValue: !isLocked,
      };
      const response: any = await handleTestAssign(queryParams);
      if (response.data.code === 200) {
        if (!response.data.data.data.isLocked) {
          setSuccessMessage('Test has been assigned to the students');
          setIsSuccess(true);
        }
        const conceptParams = {
          chapterIds: `parentIds=${chapterIds}`,
          batchId: batchId,
        };
        sagaMiddleware.run(fetchConcepts, getConcept, conceptParams);
        setIsLocked(!isLocked);
      } else {
        setErrorMessage(response.data.message);
        setIsError(true);
      }
      if (!queryParams.newLockValue) {
        // Trigger analytics - Event name = topic_unlock
        TopicUnlockAnalyticEvent({
          topicName: titleCase(conceptData.name) as string,
          chapterName: chapterName as string,
          className: batchName as string,
        });
      }
      setIsLoading(false);
    }
  };

  const handleTopicLockModalOpen = async () => {
    try {
      if (fromScreen === 'concepts') {
        setTopicLockModalOpen(true);
        const response = await getTests({
          batchId: batchId as string,
          conceptIds: conceptData.ids.join(','),
          mode: isLocked == 'true' ? 'list' : 'data',
        });
        if (response.data.code === 200) {
          setTestAttemptData(extractAttemptsAndTotal(response.data.data.list));
        }
      } else {
        openAssignDrawer();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onClickHandler = () => {
    if (conceptData.hasTests) {
      localStorage.removeItem('chapterTestAssignmentData');
      handleClick();
    } else {
      setIsError(true);
      setErrorMessage('Concept Test for this concept is coming soon');
    }
  };

  return (
    <div>
      <TopicLockModal
        isOpen={topicLockModalOpen}
        onClose={() => setTopicLockModalOpen(false)}
        handleLock={handleToggle}
        newLockValue={!isLocked}
        data={testAttemptData}
      />
      <Listing>
        <li>
          <div style={{ cursor: 'pointer' }} onClick={onClickHandler}>
            <p style={{ display: 'flex', paddingLeft: '8px' }}>
              <ListingIndex>{index + 1}. </ListingIndex>
              <span>
                {classes}
                {/* <HiddenDesktop> */}
                <Proficiency>Proficiency {proficiency}</Proficiency>
                {/* </HiddenDesktop> */}
              </span>
            </p>
            {/* <HiddenMobile>
              <Proficiency>Proficiency {proficiency}</Proficiency>
            </HiddenMobile> */}
          </div>
          <Placeholder>
            {isLoading ? (
              /*
              TODO - tell ui guy to fix and make it global 
              */
              <div
                style={{
                  position: 'fixed',
                  padding: '300px 48%',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'rgba(50, 75, 99, .4)',
                  zIndex: 100,
                }}
              >
                <CircularProgress />
              </div>
            ) : conceptData.hasTests ? (
              <FormControlLabel
                control={
                  <GreenSwitch
                    checked={!isLocked}
                    value={!isLocked}
                    onChange={handleTopicLockModalOpen}
                  />
                }
                label=""
              />
            ) : (
              <Placeholder onClick={onClickHandler}></Placeholder>
            )}
          </Placeholder>

          {conceptData.hasTests ? (
            <Clickable onClick={handleClick}>&gt;</Clickable>
          ) : (
            <Placeholder onClick={onClickHandler}></Placeholder>
          )}
        </li>
      </Listing>
      <SimpleSnackbar
        mode={'error'}
        onClose={handleOnClose}
        message={errorMessage}
        state={isError}
      />
      <SimpleSnackbar
        mode={'success'}
        onClose={handleOnClose}
        message={successMessage}
        state={isSuccess}
      />
    </div>
  );
};

export default ConceptCardComponent;
