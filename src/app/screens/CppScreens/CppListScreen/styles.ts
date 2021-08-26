import makeStyles from '@material-ui/core/styles/makeStyles';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';

export const useStyles = makeStyles(theme => ({
  dialogpaper: {
    minWidth: '500px',
    '@media (max-width: 768px)': {
      minWidth: '400px',
    },
  },
  dialogpaper1: {
    backgroundColor: '#f7f7f7',
    minWidth: '740px',
    '@media (max-width: 768px)': {
      minWidth: '400px',
    },
  },
  dialogpaper2: {
    minWidth: '500px',
    '@media (max-width: 768px)': {
      minWidth: '350px',
    },
  },
  cppList: {
    padding: '20px 0px 0',
    borderRadius: '4px',
    backgroundColor: '#fff',
    color: '#333',
    margin: '8px 0',

    '.editBtn': {
      backgroundColor: 'transparent',
      border: 0,
      fontSize: '14px',
      lineHeight: '12px',
      color: '#1d7dea',
      padding: '12px',
      '& svg': {
        marginRight: '2px',
      },
    },
    '& button': {
      '&:focus': {
        outline: 0,
      },
    },
    '@media (max-width: 768px)': {
      '& button': {
        backgroundColor: 'transparent',
        border: 0,
        cursor: 'pointer',
        '&.assignViewIcon': {
          '& img': {
            width: '28px',
            verticalAlign: 'sub',
          },
        },
      },
      '& .idText': {
        paddingLeft: '15px',
      },
    },
  },
  cppListHeading: {
    padding: '0 20px',
    display: 'grid',
    gridTemplateColumns: '80% 20%',
    '& h5': {
      fontSize: '16px',
      lineHeight: '20px',
      color: '#333',
      fontWeight: 400,
      maxWidth: '96%',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      '& img': {
        marginRight: '12px',
      },
    },
    '& .btnContainer': {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
    '& .menuBtn': {
      padding: '0 10px',
      cursor: 'pointer',
      verticalAlign: 'middle',
      '@media (max-width: 768px)': {
        position: 'absolute',
        right: '4px',
      },
    },
    '& .assignViewIcon': {
      verticalAlign: 'middle',
      '& img': {
        width: '26px',
        // verticalAlign: 'sub',
      },
    },
    '& button': {
      backgroundColor: 'transparent',
      border: 0,
      cursor: 'pointer',
      // marginRight: '20px',
      '&.editBtn': {
        backgroundColor: 'transparent',
        border: 0,
        fontSize: '14px',
        lineHeight: '12px',
        color: '#1d7dea',
        padding: '12px',
        '& svg': {
          marginRight: '2px',
        },
      },
    },
  },
  menuBtn: {},
  switchButton: {
    width: '54px',
    display: 'inline-block',
    verticalAlign: 'super',
    margin: '0 25px',
  },
  Chtext: {
    fontSize: '12px',
    lineHeight: '20px',
    color: '#666',
    padding: '4px 47px',
  },
  quesDetails: {
    padding: '4px 47px',
    '@media (max-width: 768px)': {
      padding: '4px 15px',
    },
    '& span': {
      fontSize: '12px',
      lineHeight: '20px',
      color: '#666',
      paddingRight: '20px',
      '& b': {
        fontWeight: 400,
        color: '#333',
      },
    },
  },

  assignHistory: {
    borderRadius: '0px 0px 3px 3px',
    boxShadow: 'none',

    '&::before': {
      backgroundColor: 'transparent',
    },
    // '@media (max-width: 768px)': {
    //   '& .arrowExpandIcon': {
    //     position: 'absolute',
    //     right: '30px',
    //   },
    //},
  },
  expandIcon: {
    '&.MuiIconButton-edgeEnd': {
      marginRight: '10px',
    },
  },
  expanded: {
    '&.MuiIconButton-edgeEnd': {
      marginRight: '10px',
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
  },
  assignmentsAccordionHeading: {
    background: 'rgba(249, 249, 249, 0.8)',
    paddingLeft: '47px !important',
    '@media (max-width: 768px)': {
      paddingLeft: '1px !important',
      paddingRight: '0',
    },
  },
  accordionHeading: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    '& .menuBtn': {
      padding: '0 10px',
      cursor: 'pointer',
      verticalAlign: 'middle',
      '@media (max-width: 768px)': {
        position: 'absolute',
        right: '4px',
      },
    },
  },

  accordionContainer: {
    margin: '0 34px',
    width: '100%',
    '@media (max-width: 768px)': {
      margin: '0',
    },
    '& li': {
      display: 'grid',
      gridTemplateColumns: '20% 55% 15% 10%',
      alignItems: 'center',
      padding: '10px 0',
      borderBottom: '1px solid #e9e9e9',
      '@media (max-width: 768px)': {
        gridTemplateColumns: '80% 20%',
      },
      '&:last-child': {
        borderBottom: 0,
      },
      '& .editBtn': {
        backgroundColor: 'transparent',
        border: 0,
        fontSize: '14px',
        lineHeight: '12px',
        color: '#1d7dea',
        padding: '12px',
        '& svg': {
          marginRight: '2px',
        },
      },
    },
  },
  batchName: {
    fontSize: '12px',
    lineHeight: '140%',
    color: '#333333',
  },
  testName: {
    fontSize: '12px',
    lineHeight: '140%',
    color: '#333333',
  },
  batchNumber: {
    fontSize: '12px',
    lineHeight: '140%',
    color: '#666',
    '& .viewListBtn': {
      fontSize: '14px',
      lineHeight: '140%',
      color: '#1D7DEA',
      backgroundColor: 'transparent',
      border: 0,
      marginLeft: '6px',
      fontWeight: 600,
    },
  },
  dateDetails: {
    '& span': {
      fontSize: '12px',
      lineHeight: '20px',
      color: '#666',
      paddingRight: '5px',
      '& b': {
        fontWeight: 400,
        color: '#333',
      },
    },
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

  idText: {
    fontSize: '12px',
    lineHeight: '20px',
    color: '#666',
    fontWeight: 500,
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },
  daysText: {
    fontSize: '12px',
    lineHeight: '20px',
    color: '#666',
  },
  searchTestInputStyle: {
    padding: '5px 15px',
    borderRadius: '4px',
    backgroundColor: '#fff',
    border: '1px solid #E9E9E9',
    '@media (max-width: 768px)': {
      backgroundColor: '#fff',
      width: 'calc(100vw - 30px)',
    },
  },
  idDiv: {
    background: 'rgba(249, 249, 249, 0.8)',
    padding: '15px 47px ',
  },
  addCppBtn: {
    backgroundColor: '#FFFFFF',
    border: 0,
    borderRadius: '4px',
    padding: '12px 30px',
    marginLeft: '10px',
    fontSize: '14px',
    lineHeight: '20px',
    marginTop: '16px',
    color: '#1d7dea',
    '@media (max-width: 768px)': {
      padding: '8px 10px',
      marginTop: '0px',
    },
    '& img': {
      marginRight: '4px',
      verticalAlign: 'bottom',
      '@media (max-width: 768px)': {
        marginRight: '0px',
      },
    },
  },
  progressBarText: {
    display: 'inline-block',
    width: '116px',
    marginLeft: '14px',
    '& .progressBarWidth': {
      display: 'inline-block',
      width: '68px',
    },
    '& b': {
      fontSize: '12px',
      lineHeight: '17px',
      color: '#666',
      display: 'inline-block',
      marginRight: '4px',
      fontWeight: 400,
    },
  },
  studentDrawer: {
    width: '550px',
  },
  dialogLayoutStyle: {},
  DialogBody: {},
  DialogContentList: {
    '@media (max-width: 768px)': {
      padding: '8px',
    },
  },
  dialogFooter1: {
    background: '#FFFFFF',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.12)',
  },
  detailListContainer: {
    '& li': {
      background: '#FFFFFF',
      borderRadius: '4px',
      padding: '16px',
      marginBottom: '12px',
      '@media (max-width: 768px)': {
        padding: '8px',
      },
      '& p': {
        fontSize: '12px',
        lineHeight: '20px',
        color: '#666',
        display: 'flex',
        alignItems: 'center',
        '& b': {
          fontSize: '16px',
          lineHeight: '20px',
          color: '#000',
          fontWeight: '400',
        },
        '& svg': {
          margin: '0 6px',
        },
      },
      '& h6': {
        fontWeight: '400',
        fontSize: '12px',
        lineHeight: '14px',
        color: '#333',
        margin: '14px 0 4px',
      },
      '& .tagChapterName': {
        fontSize: '14px',
        lineHeight: '140%',
        color: '#666',
        border: '0.5px solid #DADADA',
        borderRadius: '4px',
        padding: '4px 12px',
        margin: '4px 6px 0 0',
        display: 'inline-block',
      },
    },
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
  DialogHeaderDetails: {
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.12)',
    backgroundColor: '#fff',
    '@media (max-width: 768px)': {
      padding: '15px',
    },

    '& img': {
      width: '40px',
      marginRight: '6px',
      '@media (max-width: 768px)': {
        width: '28px',
        marginRight: '6px',
        verticalAlign: 'top',
      },
    },
  },

  DialogContent: {
    borderTop: '1px solid #e9e9e9',
  },
  DialogContent1: {
    textAlign: 'center',
    '& p': {
      fontWeight: 'normal',
      fontSize: '16px',
      lineHeight: '24px',
      color: '#666',
    },
  },
  dialogFooter: {
    justifyContent: 'center',
    paddingBottom: '30px',
  },
  ListHeading: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #e9e9e9',
    padding: '16px 0 24px',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
    },
    '& h5': {
      fontWeight: 500,
      fontSize: '18px',
      lineHeight: '150%',
      color: '#333',
      marginRight: '55px',
    },
    '& span': {
      fontWeight: 'normal',
      fontSize: '13px',
      lineHeight: '150%',
    },
  },
  BatchList: {
    '& li': {
      borderBottom: '1px solid #e9e9e9',
      '&:last-child': {
        borderBottom: 0,
      },
      '& h3': {
        fontWeight: 500,
        fontSize: '16px',
        lineHeight: '20px',
        color: '#333',
        padding: '18px 0 10px',
        '& span': {
          color: '#666',
        },
      },
      '& p': {
        fontSize: '14px',
        lineHeight: '20px',
        color: '#666',
        marginBottom: '10px',
        '& span': {
          fontSize: '12px',
          lineHeight: '14px',
          color: '#999',
        },
      },
    },
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
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
    '& .batchList': {
      '& .studentListContainer': {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '& .studentName': {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          '& h4': {
            fontWeight: '400',
            fontSize: '14px',
            lineHeight: '22px',
            color: '#333333',
            paddingLeft: '8px',
          },
          '& p': {
            fontWeight: '400',
            fontSize: '12px',
            lineHeight: '14px',
            color: '#999',
            paddingLeft: '8px',
          },
        },
        '& i': {
          fontSize: '14px',
          lineHeight: '14px',
          color: '#999',
        },
      },
      '& li': {
        borderBottom: '1px solid #e9e9e9',
        padding: '8px 0 15px',
        '&:last-child': {
          borderBottom: '0',
        },
        '& .batchname': {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          '& .batchnameText': {
            fontSize: '16px',
            lineHeight: '20px',
            color: '#333',
            '@media (max-width: 768px)': {
              fontSize: '14px',
              lineHeight: '16px',
            },
          },
          '& .studentCount': {
            fontSize: '14px',
            lineHeight: '20px',
            color: '#333',
          },
          '& .studentList': {
            fontWeight: '400',
            fontSize: '14px',
            lineHeight: '20px',
            color: '#1d7dea',
            cursor: 'pointer',
            '& svg': {
              marginLeft: '12px',
            },
          },
        },
      },
    },
    '& .selectAllText': {
      fontSize: '14px',
      lineHeight: '14px',
      color: '#666',
    },
    '& .selectAll': {
      fontSize: '12px',
      lineHeight: '14px',
      color: '#666',
    },
    '& h3': {
      fontSize: '20px',
      lineHeight: '140%',
      textAlign: 'center',
      fontWeight: '400',
      color: '#333',
      marginTop: '15px',
      marginBottom: '30px',
      '@media (max-width: 768px)': {
        fontSize: '14px',
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
    '& .emailText': {
      border: '1px solid #E9E9E9',
      borderRadius: 4,
      width: '100%',
      height: 40,
      padding: '14px',
    },
    '& .is-danger': {
      color: '#f44336',
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.66,
    },
    '& .crossIcon': {
      position: 'absolute',
      right: '10px',
      top: '8px',
      cursor: 'pointer',
    },
    '& .successfullContainer': {
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& img': {
        padding: '15px 0 30px 0',
      },
      '& p': {
        fontSize: 16,
        lineHeight: '19px',
        width: '60%',
        color: '#666',
      },
    },
  },
  Batchlisting: {},
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
  calenderDate: {
    display: 'flex',
    width: '70%',
    // @media (max-width: 768px) {
    //   width: 100%;
    // }
    // span {
    //   color: #333;
    //   margin: 8px 10px;
    // }
  },
  dropdownMenuList: {
    marginLeft: '25px',
    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
    marginTop: '10px',
    zIndex: 1,
    overflow: 'initial',
    '& ul': {
      background: '#FFFFFF',
      padding: '14px 12px',
      borderRadius: '4px',
      width: '110px',
      '@media (max-width: 768px)': {
        padding: '0px 8px',
      },
      '& li': {
        fontSize: '14px',
        lineHeight: '16px',
        color: '#666',
        padding: '6px 0',
        borderBottom: '1px solid #e9e9e9',
        '&:last-child': {
          borderBottom: 0,
        },
      },
    },
    '&::after': {
      content: "''",
      position: 'absolute',
      display: 'block',
      width: 0,
      zIndex: 99,
      borderStyle: 'solid',
      borderColor: '#fff transparent',
      borderWidth: '0 10px 13px',
      top: '-11px',
      right: '15px',
      marginLeft: '-20px',
      '@media (max-width: 768px)': {
        left: '94px',
      },
    },
  },
  headingContainer: {
    display: 'inline-block',
  },
  typographyHeading: {
    display: 'flex',
  },

  detailsHeading: {
    display: 'flex',
    alignItems: 'center',
    '@media (max-width: 768px)': {
      display: 'inline-block',
    },
    '& h5': {
      fontSize: '24px',
      lineHeight: '20px',
      fontWeight: 400,
      color: '#333',
      '@media (max-width: 768px)': {
        fontSize: '16px',
      },
    },
  },
  circularProgressBarContainer: {
    textAlign: 'center',
    paddingTop: '10px',
  },
}));
export const GoalHeading = styled.h5`
  font-size: 20px;
  line-height: 24px;
  font-weight: 400;
`;
export const CppListContainer = styled.div`
  margin-left: 16px;
  @media (max-width: 768px) {
    margin-left: 0px;
  }
`;
export const SearchImg = styled.div`
  padding: 40px 0px;
`;
export const Heading = styled.span`
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;
export const Grid1 = styled.div`
  display: grid;
  grid-template-columns: 60% 25% 15%;
  justify-content: center;
  align-items: center;
  margin-top: 1.2em;
  @media (max-width: 768px) {
    margin-top: 0px;
    padding-top: 10px;
  }
`;
export const SearchIconEdit = styled(SearchIcon)`
  fill: #1d7dea !important;
`;
