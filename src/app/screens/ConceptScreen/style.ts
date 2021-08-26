import makeStyles from '@material-ui/core/styles/makeStyles';
export const useStyles = makeStyles({
  assignViewIcon: {
    border: 0,
    cursor: 'pointer',
    backgroundColor: 'transparent',
  },
  assignHistory: {
    borderRadius: '0px 0px 3px 3px',
    boxShadow: 'none',
    '&::before': {
      backgroundColor: 'transparent',
    },
  },
  historyBtn: {
    fontSize: '14px',
    lineHeight: '12px',
    color: '#1D7DEA',
    backgroundColor: 'transparent',
    border: 0,
    '@media (max-width: 768px)': {
      fontSize: '12px',
    },
    '&:focus': {
      outline: 0,
    },
  },
  editbtn: {
    '& span': {
      '& svg': {
        marginLeft: '6px',
      },
    },
  },
  accordionHeading1: {
    background: 'rgba(249, 249, 249, 0.8)',
    paddingLeft: '47px',
    minHeight: '48px !important',
    '& .MuiAccordionSummary-content': {
      justifyContent: 'flex-end',
      margin: '12px 0px',
    },
  },
  assignHistoryList: {
    display: 'grid',
    gridTemplateColumns: '15% 65% 10% 10%',
    alignItems: 'center',
    margin: '0 40px',
    borderBottom: '1px solid #e9e9e9',
    padding: '10px 0',
    '&:last-child': {
      borderBottom: 0,
    },
    '@media (max-width: 768px)': {
      margin: '0',
      gridTemplateColumns: '26% 55% 10%',
    },
  },
  testWindow: {
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '12px',
    color: '#666',
    '@media (max-width: 768px)': {
      lineHeight: '20px',
    },
    '& b': {
      fontWeight: '400',
      color: '#999',
    },
  },
  batchName: {
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '20px',
    color: '#333',
  },
  publishText: {
    background: '#E6F1FE',
    borderRadius: '4px',
    fontWeight: 500,
    fontSize: '11px',
    lineHeight: '10px',
    padding: '4px 10px',
    color: '#1D7DEA',
    margin: '0px 10px',
    letterSpacing: '-0.02em',
    '@media (max-width: 768px)': {
      margin: '0px 4px 0 0',
    },
  },
  UpcomingText: {
    background: '#FFF8E6',
    borderRadius: '4px',
    fontWeight: 500,
    fontSize: '11px',
    lineHeight: '10px',
    padding: '4px 10px',
    color: '#FFB906',
    margin: '0px 10px',
    letterSpacing: '-0.02em',
  },
  LiveText: {
    background: 'rgba(48, 190, 118, 0.1)',
    borderRadius: '4px',
    fontWeight: 500,
    fontSize: '11px',
    lineHeight: '10px',
    padding: '4px 10px',
    color: '#30BE76',
    margin: '0px 10px',
    letterSpacing: '-0.02em',
  },
  PastText: {
    background: '#FFF5F5',
    borderRadius: '4px',
    fontWeight: 500,
    fontSize: '11px',
    lineHeight: '10px',
    padding: '4px 10px',
    color: '#F21D1D',
    margin: '0px 10px',
    letterSpacing: '-0.02em',
  },
  drawerList: {
    width: '500px',
    '@media (max-width: 768px)': {
      width: '100vw',
    },
  },
  drawerFullList: {
    width: 'auto',
  },
  drawerHeader: {
    padding: '14px',
    fontWeight: 500,
    fontSize: '20px',
    lineHeight: '24px',
    textAlign: 'center',
    color: '#666',
    '@media (max-width: 768px)': {
      fontSize: '16px',
      fontWeight: 400,
    },
    '& .backIcon': {
      background: 'transparent',
      border: 0,
      position: 'absolute',
      left: '32px',
    },
    '& .closeButton': {
      background: 'transparent',
      border: 0,
      position: 'absolute',
      right: '10px',
      cursor: 'pointer',
    },
  },
  drawerBody: {
    padding: '15px 30px',
    maxHeight: 'calc(100vh - 126px)',
    overflow: 'auto',
    '@media (max-width: 768px)': {
      padding: '15px',
    },
    '& .disabled': {
      opacity: '0.4',
    },
    '& .testWindow': {
      display: 'flex',
      justifyContent: 'space-between',
      color: '#6666',
      marginBottom: '26px',
      alignItems: 'center',
    },
    '& .calenderDatetimeContainer': {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '50px',
    },
    '& .selectAllTextList': {
      borderBottom: '1px solid #e9e9e9',
      padding: '16px 0px',
    },
    '$ .batchListHeading': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    '& .batchList': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid #e9e9e9',
      padding: '6px 0',
      '@media (max-width: 768px)': {
        fontSize: '12px',
      },
      '& h3': {
        fontWeight: 'normal',
        fontSize: '18px',
        lineHeight: '20px',
        '@media (max-width: 768px)': {
          fontSize: '14px',
        },
      },
      '&:last-child': {
        borderBottom: 0,
      },
      '&:first-child': {
        borderBottom: 0,
      },
    },

    '& label': {
      fontSize: '18px',
      lineHeight: '20px',
      color: '#333',
      width: '100%',
      display: 'block',
      marginBottom: '20px',
      '@media (max-width: 768px)': {
        fontSize: '14px',
        fontWeight: 400,
        marginBottom: '10px',
      },
    },
  },
  drawerfooter: {
    position: 'absolute',
    bottom: 0,
    boxShadow: '0px -5px 8px rgba(212, 212, 212, 0.5)',
    width: '100%',
    padding: 15,
    textAlign: 'center',
    '& button': {
      padding: '8px 45px',
      margin: '0 4px',
    },
  },

  dialogpaper: {
    minWidth: '500px',
    '@media (max-width: 768px)': {
      minWidth: '400px',
    },
  },
  DialogBody: {},
  DialogContentList: {
    '@media (max-width: 768px)': {
      padding: '8px',
    },
  },
  dialogFooter: {
    justifyContent: 'center',
    paddingBottom: '30px',
  },
  DialogHeader: {
    textAlign: 'center',
    '& .header-title': {
      fontWeight: '400',
      fontSize: '24px',
      lineHeight: '34px',
      color: '#333',
    },
  },
  closeButton: {
    position: 'absolute',
    right: '10px',
    top: '8px',
    color: 'grey',
  },
  DialogContent1: {
    textAlign: 'center',
    '& p': {
      fontWeight: 'normal',
      fontSize: '16px',
      lineHeight: '24px',
      color: '#666',
      marginBottom: '20px',
    },
  },
  DialogContent: {
    borderTop: '1px solid #e9e9e9',
  },
  ListHeading: {
    padding: '16px 0 24px',
    '& h5': {
      fontWeight: 500,
      fontSize: '18px',
      lineHeight: '150%',
      color: '#333',
      marginRight: '55px',
      '& b': {
        color: '#999',
        fontWeight: 500,
      },
    },
  },
  batchList: {
    '& h3': {
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: '20px',
    },
    '& li': {
      borderBottom: '1px solid #e9e9e9',
      padding: '14px 0',
      '&:last-child': {
        borderBottom: 0,
      },
    },
  },
});
