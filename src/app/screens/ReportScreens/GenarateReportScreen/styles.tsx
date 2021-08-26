import styled from 'styled-components';
import makeStyles from '@material-ui/core/styles/makeStyles';
export const useStyles = makeStyles({
  svgIcon: {
    '&>:first-child': {
      backgroundImage:
        'url(https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/arrow-down.svg)',
      height: 10,
      width: 16,
      backgroundRepeat: 'no-repeat',
      '& svg': {
        display: 'none',
      },
    },
  },
  customCheckbox: {
    marginLeft: '0px',
  },
  listingElement: {
    fontSize: '14px',
    padding: '6px 0px',
    color: '#666666',
    '& :[data-focus="true"]': {
      backgroundColor: 'transparent',
    },
    '&>:first-child': {
      '& :hover': {
        backgroundColor: 'transparent',
      },
    },
  },
  selectTestName: {
    width: '70%',
    backgroundImage:
      'url(https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/arrow-down.svg)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '98% 12px',
    '@media (max-width: 768px)': {
      width: '100%',
    },
    '& svg': {
      display: 'none',
    },
    '&>:first-child': {
      fontSize: '14px',
      paddingLeft: '14px',
      lineHeight: '24px',
      minHeight: '24px',
    },
    '&::before': {
      border: '1px solid #E9E9E9',
      borderRadius: '4px',
      width: '100%',
      height: '36px',
    },
    '&:hover(.Mui-disabled):before': {
      borderBottom: '0px',
    },
    '&:hover:not(.Mui-disabled):before': {
      borderBottom: '1px solid #E9E9E9',
    },
  },
  selectmultiTestName: {
    width: '70%',
    borderRadius: '4px',
    '@media (max-width: 768px)': {
      width: '100%',
    },
    '&>:first-child': {
      '&>:first-child': {
        '&>:first-child': {
          padding: '0 48px 0 0',
          '& fieldset': {
            borderColor: '#E9E9E9',
          },
          '& input': {
            paddingLeft: '14px',
            // width: '100%',
          },
        },
      },
    },
  },
  inputColor: {
    color: '#f00',
  },
  inputRoot: {},
  svgCalenderIcon: {},
});
