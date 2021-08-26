import makeStyles from '@material-ui/core/styles/makeStyles';
import styled from 'styled-components';

export const useStyles = makeStyles({
  searchBatchStyle: {
    padding: '5px 15px',
    borderRadius: '4px',
    backgroundColor: '#fff',
    border: '1px solid #E9E9E9',
    '@media (max-width: 768px)': {
      backgroundColor: '#fff',
      width: 'calc(100vw - 30px)',
    },
  },
  rightArrowIcon: {
    display: 'flex',
    alignItems: 'center',
    '& span': {
      height: '16px',
    },
  },
  dotIcon: {
    margin: '0 6px',
    height: '6px',
    width: '4px',
  },
  styledBreadcrumbs: {
    padding: '1em 0 0 0',
    fontSize: '12px',
    color: '#fff',
    '@media (max-width: 768px)': {
      display: 'none',
    },
    '& .MuiBreadcrumbs-separator': {
      margin: 0,
    },
    '& .MuiTypography-colorPrimary': {
      color: '#fff',
    },
    '& .MuiLink-underlineHover': {
      '&:hover': {
        textDecoration: 'none',
      },
    },
  },
  link: {
    cursor: 'pointer',
  },
  selectList: {
    WebkitAppearance: 'initial',
    backgroundImage:
      'url(https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/angle-down-bold.svg)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '94% 18px',
    minWidth: '135px',
    width: '100%',
    maxWidth: '94%',
    paddingRight: '50px',
    border: '1px solid #e6e6e6',
    borderRadius: '4px',
    height: '44px',
    padding: '0 1em',
    fontSize: '1em',
    backgroundColor: '#fff',
    '&:focus': {
      outline: 0,
    },
  },
  rankScoreContainer: {
    border: '1px solid #ECECEC',
    borderRadius: '4px',
    padding: '24px 18px',
    display: 'grid',
    gridTemplateColumns: '20% 30% 20% 30%',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '50% 50%',
      padding: '0px',
      border: '0px',
    },
    '&>:last-child': {
      borderRight: '0px',
    },
  },
  categoryIcon: {
    display: 'flex',
    borderRight: '1px solid #E9E9E9',
    paddingLeft: '30px',
    '@media (max-width: 768px)': {
      borderRight: '0px',
      paddingLeft: '0px',
    },
    '& img': {
      marginRight: '6px',
      '@media (max-width: 768px)': {
        marginRight: '2px',
        height: '36px',
      },
    },
    '&>:nth-child(2)': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    '& h3': {
      fontWeight: '500',
      fontSize: '16px',
      lineHeight: '140%',
      color: '#666',
      '@media (max-width: 768px)': {
        fontSize: '12px',
      },
    },
    '& p': {
      fontSize: '14px',
      lineHeight: '140%',
      color: '#666',
      '@media (max-width: 768px)': {
        fontSize: '10px',
      },
    },
  },
  graphContainer: {},
  graphHeading: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '40px',
    '& h4': {
      fontWeight: '500',
      fontSize: '20px',
      lineHeight: '140%',
      color: '#333',
      '@media (max-width: 768px)': {
        fontSize: '14px',
      },
    },
    '& select': {
      WebkitAppearance: 'initial',
      backgroundImage:
        'url(https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/angle-down-bold.svg)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '94% 18px',
      minWidth: '135px',
      width: '100%',
      maxWidth: '180px',
      paddingRight: '50px',
      border: '1px solid #e6e6e6',
      borderRadius: '4px',
      height: '44px',
      padding: '0 1em',
      fontSize: '1em',
      backgroundColor: '#fff',
      '&:focus': {
        outline: 0,
      },
      '@media (max-width: 768px)': {
        backgroundPosition: '94% 14px',
        height: '36px',
        padding: '0 .5em',
        fontSize: '0.8em',
        maxWidth: '150px',
      },
    },
  },

  tabsContainer: {
    '& li': {
      background: '#FFFFFF',
      border: '1px solid #E9E9E9',
      boxShadow: '0px 2px 8px rgba(202, 202, 202, 0.25)',
      borderRadius: '4px',
      padding: '15px',
      marginTop: '20px',
      display: 'grid',
      gridTemplateColumns: '86% 14%',
      '@media (max-width: 768px)': {
        padding: '6px',
        gridTemplateColumns: '100%',
      },
      '& .pastTag': {
        background: 'rgba(242, 29, 29, 0.1)',
        borderRadius: '4px',
        color: '#F21D1D',
        fontSize: '12px',
        lineHeight: '12px',
        padding: '4px 10px',
        marginRight: '20px',
      },
      '& .liveTag': {
        background: 'rgba(48, 190, 118, 0.1)',
        borderRadius: '4px',
        color: '#30BE76',
        fontSize: '12px',
        lineHeight: '12px',
        padding: '4px 10px',
        marginRight: '20px',
      },
      '& .testName': {
        color: '#215184',
        fontSize: '14px',
        lineHeight: '14px',
      },
      '& h3': {
        color: '#333',
        fontSize: '20px',
        lineHeight: '22px',
        fontWeight: '400',
        marginTop: '12px',
        '@media (max-width: 768px)': {
          fontSize: '14px',
          lineHeight: '18px',
        },
      },
      '& h4': {
        color: '#333',
        fontSize: '16px',
        lineHeight: '22px',
        fontWeight: '400',
      },
      '& p': {
        marginTop: '7px',
      },
      '& .dateText': {
        color: '#999',
        fontSize: '14px',
        lineHeight: '20px',
        fontWeight: '400',
        marginRight: '30px',
        '@media (max-width: 768px)': {
          fontSize: '12px',
          lineHeight: '16px',
          marginRight: '8px',
        },
        '& b': {
          fontWeight: '400',
          color: '#333',
          marginBottom: '20px',
        },
      },
      '& .nameText': {
        color: '#999',
        fontSize: '14px',
        lineHeight: '20px',
        fontWeight: '400',
        marginRight: '30px',
        '@media (max-width: 768px)': {
          fontSize: '12px',
          lineHeight: '16px',
          marginRight: '10px',
          display: 'block',
        },
        '& b': {
          fontWeight: '400',
          color: '#333',
          marginBottom: '20px',
        },
      },
      '& .rateText': {
        '@media (max-width: 768px)': {
          display: 'flex',
          justifyContent: 'space-between',
        },
      },
      '& .nameText1': {
        color: '#999',
        fontSize: '14px',
        lineHeight: '20px',
        fontWeight: '400',
        marginRight: '30px',
        '& br': {
          display: 'none',
          '@media (max-width: 768px)': {
            display: 'block',
          },
        },
        '@media (max-width: 768px)': {
          fontSize: '11px',
          lineHeight: '16px',
          marginRight: '2px',
          textAlign: 'center',
        },
        '& b': {
          fontWeight: '400',
          color: '#333',
          marginBottom: '20px',
        },
      },
      '& .marksScore': {
        display: 'flex',
        flexDirection: 'column',
        '@media (max-width: 768px)': {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: '12px',
          alignItems: 'center',
        },
        '& p': {
          color: '#999',
          fontSize: '10px',
          lineHeight: '20px',
          marginTop: '0',
        },
        '& b': {
          color: '#666',
          fontSize: '24px',
          lineHeight: '20px',
          fontWeight: '500',
          marginBottom: '20px',
          paddingLeft: '12px',
        },
        '& a': {
          color: 'var(--brand-color)',
          fontSize: '16px',
          lineHeight: '16px',
          textDecoration: 'none',
          '& img': {
            verticalAlign: 'bottom',
          },
          '& svg': {
            marginLeft: '24px',
            '@media (max-width: 768px)': {
              marginLeft: '12px',
              height: '14px',
            },
          },
        },
      },
      '& .marksScoreConceptList': {
        display: 'flex',
        flexDirection: 'column',
        '@media (max-width: 768px)': {
          flexDirection: 'row',

          marginTop: '12px',
          alignItems: 'center',
        },
        '& p': {
          color: '#999',
          fontSize: '10px',
          lineHeight: '20px',
          marginTop: '0',
        },
        '& b': {
          color: '#666',
          fontSize: '24px',
          lineHeight: '20px',
          fontWeight: '500',
          '@media (max-width: 768px)': {
            fontSize: '14px',
            marginLeft: '8px',
          },
        },
        '& .scoreProgressBar': {
          marginTop: '25px',
          '@media (max-width: 768px)': {
            width: '30%',
            marginTop: '0',
            marginLeft: '10px',
          },
        },
      },
    },
  },
  circularProgressBarContainer: {
    textAlign: 'center',
    paddingTop: '10px',
  },
});

export const ConceptScreenBackground = styled.div`
  background-color: #f4f8f9;
  color: #fff;
  padding-bottom: 2em;
  min-height: calc(100vh - 70px);
`;

export const CardHeader = styled.div`
  /* min-height: 165px; */
  padding-bottom: 4em;
  background-color: var(--brand-color);
  @media (max-width: 768px) {
    min-height: initial;
    padding: 1em 0;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 75% 25%;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    grid-template-columns: 80% 20%;
  }
`;

export const ClassCount = styled.div`
  font-size: 1.5em;
  margin-top: 30px;
  display: flex;
  @media (max-width: 768px) {
    margin: initial;
  }

  span:nth-of-type(2) {
    font-size: 1em;
    @media (max-width: 768px) {
      font-size: 20px;
    }
  }

  span:nth-of-type(3) {
    text-indent: 50px;

    font-size: 16px;
    max-width: 100%;
    display: block;
    @media (max-width: 768px) {
      text-indent: initial;
      max-width: 350px;
      font-size: 14px;
      padding-left: 2.5em;
    }
  }
`;

export const BackIcon = styled.span`
  cursor: pointer;
  width: 26px;
  height: 21px;
  margin: 0 1em 0 0;
  @media (max-width: 768px) {
    margin: 0 0.3em 0 0;
  }
`;

export const ListHeader = styled.div`
  display: grid;
  grid-template-columns: 85% 15%;
  padding: 15px;
  border-bottom: 1px solid #e9e9e9;
  @media (max-width: 768px) {
    display: none;
  }
`;

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
    grid-template-columns: 90% 10%;
  }
  .filterIcon {
    background: transparent;
    border: 0;
    cursor: pointer;
  }
`;

export const TabHeaderContainer = styled.div`
  margin-top: 0;
  @media (max-width: 768px) {
    margin-top: 0;
    box-shadow: 0px 4px 4px rgba(141, 141, 141, 0.25);
    margin-left: -15px;
    margin-right: -15px;
  }
  ul {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid #e9e9e9;
    li {
      margin-right: 2em;
      opacity: 0.5;
      cursor: pointer;
      font-weight: 500;
    }

    @media (max-width: 768px) {
      display: grid;
      grid-template-columns: 50% 50%;
      text-align: center;
      color: var(--brand-color);
      margin-top: 0.5em;
    }
  }

  .active {
    border-bottom: 2px solid var(--brand-color);
    color: var(--brand-color);
    opacity: 1;
    line-height: 40px;
    pointer-events: none;
  }
`;
export const NoData = styled.div`
  text-align: center;
  padding: 5em 0;
  img {
    max-width: 120px;
    width: 100%;
  }
  p {
    padding-top: 20px;
  }
`;
