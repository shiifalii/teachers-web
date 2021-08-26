import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
const useStyles = makeStyles({
  list: {
    width: 500,
    '@media (max-width: 768px)': {
      width: '100vw',
    },
  },
  fullList: {
    width: 'auto',
  },
  drawerHeader: {
    padding: '14px',
    fontWeight: 400,
    fontSize: '20px',
    lineHeight: '24px',
    textAlign: 'left',
    color: '#666',
    '& .closeButton': {
      position: 'absolute',
      background: 'transparent',
      border: 0,
      right: '15px',
    },
  },
  drawerBody: {
    padding: '15px',
    '& .filterList': {
      fontSize: '14px',
      lineHeight: '140%',
      fontWeight: 'normal',
      color: '#666',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      '@media (max-width: 768px)': {
        fontSize: '14px',
      },
      '& b': {
        fontSize: '16px',
        fontWeight: 'normal',
        marginBottom: '10px',
      },
    },
    '& label': {
      display: 'flex',
      fontSize: '14px',
      fontWeight: 'normal',
      color: '#666666',
      width: '90%',
      textAlign: 'left',
      '&.active': {
        fontWeight: '500',
      },
    },
    '& p': {
      width: '40px',
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
  drawerfooter: {
    position: 'absolute',
    bottom: 0,
    boxShadow: '0px -5px 8px rgba(212, 212, 212, 0.5)',
    width: '100%',
    padding: 15,
    display: 'flex',
    justifyContent: 'space-around',
    '& button': {
      padding: '8px 45px',
    },
  },
});

interface DrawerProps {
  showDrawer: boolean;
  currentView: string;
  currentMode: string;
  setCurrentView: any;
  setCurrentMode: any;
}

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function FilterDrawer(props: DrawerProps) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  useEffect(() => {
    setState({ ...state, right: props.showDrawer });
  }, [props.showDrawer]);

  const anchor: Anchor = 'right';

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, right: open });
  };

  const changeView = (str: string) => {
    if (str !== props.currentView) {
      props.setCurrentView(str);
    }
  };

  const changeMode = (str: string) => {
    if (str !== props.currentMode) {
      props.setCurrentMode(str);
    }
  };

  const list = (anchor: Anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className={classes.drawerHeader}>
        Setting
        <button className="closeButton" onClick={toggleDrawer(anchor, false)}>
          <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/cross-mark.svg" />
        </button>
      </div>
      <br />
      <div className={classes.drawerBody}>
        <div className="filterList">
          <b>View Type</b>
        </div>
        <div className="filterList">
          <label className="active">List View</label>
          <p>
            <Radio
              color="primary"
              checked={props.currentView === 'list'}
              onClick={() => changeView('list')}
            />
          </p>
        </div>
        <Divider />
        <div className="filterList">
          <label className="active">Grid View</label>
          <p>
            <Radio
              color="primary"
              checked={props.currentView !== 'list'}
              onClick={() => changeView('grid')}
            />
          </p>
        </div>
        <br />
        <br />
        <div className="filterList">
          <b>Switch to</b>
        </div>
        <div className="filterList">
          <label className="active">Chapter Mode</label>
          <p>
            <Radio
              color="primary"
              checked={props.currentMode === 'chapter'}
              onClick={() => changeMode('chapter')}
            />
          </p>
        </div>
        <Divider />
        <div className="filterList">
          <label className="active">Topic Mode</label>
          <p>
            <Radio
              color="primary"
              checked={props.currentMode !== 'chapter'}
              onClick={() => changeMode('topic')}
            />
          </p>
        </div>
      </div>
      <div className={classes.drawerfooter}>
        <Button variant="outlined" color="primary" style={{ width: '150px' }}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" style={{ width: '150px' }}>
          Done
        </Button>
      </div>
    </div>
  );

  return (
    <div>
      {/* {(['left', 'right', 'top', 'bottom'] as Anchor[]).map((anchor) => ( */}
      <React.Fragment key={anchor}>
        {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
        <SwipeableDrawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
          onOpen={toggleDrawer(anchor, true)}
        >
          {list(anchor)}
        </SwipeableDrawer>
      </React.Fragment>
      {/* ))} */}
    </div>
  );
}
