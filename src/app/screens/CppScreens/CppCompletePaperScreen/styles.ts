import makeStyles from '@material-ui/core/styles/makeStyles';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';

export const useStyles = makeStyles(theme => ({
  questionListing: {
    background: '#FFFFFF',
    boxShadow: '0px 2px 8px rgba(202, 202, 202, 0.25)',
    borderRadius: '4px',
    padding: '25px',
    '& .questionsettingHeading': {
      fontWeight: 'normal',
      fontSize: '16px',
      lineHeight: '20px',
      color: '#333',
      marginBottom: '18px',
    },
    '& p': {
      fontSize: '14px',
      lineHeight: '18px',
      color: '#999',
    },
    '& .subSectionContainer': {
      background: '#FFFFFF',
      border: '1px solid #E9E9E9',
      borderRadius: '4px',
      '& .subSectionAccordion': {
        margin: 0,
        '& .MuiAccordionSummary-content': {
          display: 'flex',
          flexDirection: 'column',
        },
        '& .questionPaperAccordionHeading': {
          borderBottom: '1px solid #e9e9e9',
          '& h3': {
            fontSize: '14px',
            lineHeight: '20px',
            color: '#333',
            fontWeight: 400,
          },
          '& p': {
            fontSize: '12px',
            lineHeight: '16px',
            color: '#999',
          },
        },
      },
    },
    '& .selectAnswer': {
      fontWeight: 300,
      fontSize: '14px',
      lineHeight: '17px',
      color: '#999',
      marginBottom: '24px',
      '& b': {
        color: '#333',
        marginRight: '6px',
        '& span': {
          color: '#FF4800',
        },
      },
    },
    '& .accordionDetails': {
      flexDirection: 'column',
    },
    '& .answerOption': {
      '& span': {
        background: '#FFFFFF',
        border: '1px solid #DDDDDD',
        borderRadius: '4px',
        fontSize: '16px',
        lineHeight: '19px',
        color: '#666',
        padding: '10px 26px',
        position: 'relative',
        cursor: 'pointer',
        marginRight: '10px',
        '&.active': {
          background: '#30BE76',
          borderRadius: '4px',
          color: '#fff',
          border: '1px solid #30BE76',
          '& img': {
            position: 'absolute',
            top: '4px',
            right: '4px',
          },
        },
      },
    },
    '& .secListContainer': {
      display: 'flex',
      justifyContent: 'space-between',
      borderBottom: '1px solid #E9E9E9',
      '& .upload-btn-wrapper': {
        position: 'relative',
        overflow: 'hidden',
        // display: "inline-block",
        display: 'flex',
        alignItems: 'center',
        paddingRight: '15px',
        cursor: 'pointer',
        '& svg': {
          marginRight: '5px',
        },
      },

      '& .btn': {
        color: '#1d7dea',
        backgroundColor: 'transparent',
        padding: '8px 20',
        fontSize: '14px',
        fontWeight: 400,
        border: '0',
      },

      '& .upload-btn-wrapper input[type=file]': {
        fontSize: '100px',
        position: 'absolute',
        left: 0,
        top: 0,
        opacity: 0,
      },
    },
    '& .secList': {
      display: 'flex',

      '& li': {
        padding: '14px 22px',
        cursor: 'pointer',
        '& span': {
          color: '#000',
          fontWeight: 500,
          fontSize: '14px',
          lineHeight: '17px',
        },
        '&.active': {
          '& span': {
            color: '#1d7dea',
            borderBottom: '1px solid #1d7dea',
          },
        },
      },
    },
  },
  pageInfoListing: {},
}));

export const Heading = styled.span`
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const Grid1 = styled.div`
  display: grid;
  grid-template-columns: 60% 20% 20%;
  justify-content: center;
  align-items: center;
  margin-top: 1.2em;
  @media (max-width: 768px) {
    margin-top: 0px;
    padding-top: 10px;
  }
`;
