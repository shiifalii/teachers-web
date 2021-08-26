import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles({
  list: {
    width: 500,
    '@media (max-width: 768px)': {
      width: '100%',
    },
  },
  fullList: {
    width: 'auto',
  },
  drawerHeader: {
    padding: '14px',
    fontWeight: 500,
    fontSize: '20px',
    lineHeight: '24px',
    textAlign: 'center',
    color: '#666',
    '& .closeButton': {
      background: 'transparent',
      border: 0,
      position: 'absolute',
      right: '10px',
      cursor: 'pointer',
    },
  },
  drawerBody: {
    padding: '15px',
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
      fontSize: '12px',
      lineHeight: '20px',
      color: '#666666',
      width: '100%',
      display: 'block',
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
  drawerfooter: {
    position: 'absolute',
    bottom: 0,
    boxShadow: '0px -5px 8px rgba(212, 212, 212, 0.5)',
    width: '100%',
    padding: 15,
    textAlign: 'center',
    '& button': {
      padding: '8px 45px',
    },
  },
});

interface DrawerProps {
  showDrawer: boolean;
  state: string;
  sendFinalDataToApi: any;
  successMessage: string;
}

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function SwipeableTemporaryDrawer(props: DrawerProps) {
  const classes = useStyles();
  const [email, setEmail] = React.useState('');
  const [errors, setErrors] = React.useState({
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
    }
  }, [errors.email]);

  const captureEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const emptyEmail = () => {
    setEmail('');
    setErrors({ email: '' });
    setIsSubmitting(false);
  };

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

  function validate(values: any) {
    let errors = {
      email: '',
    };
    if (!values) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(values)) {
      errors.email = 'Email address is invalid';
    } else {
      props.sendFinalDataToApi(email);
    }
    return errors;
  }

  const sendMail = () => {
    if (props.state === 'enterEmail') {
      setErrors(validate(email));
      setIsSubmitting(true);
    } else {
      setState({ ...state, right: false });
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
        {props.state === 'enterEmail' ? 'Add email' : 'Successfully sent'}
        <button className="closeButton" onClick={toggleDrawer(anchor, false)}>
          <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/cross-mark.svg" />
        </button>
      </div>
      <Divider />
      <div className={classes.drawerBody}>
        {props.state === 'enterEmail' ? (
          <div>
            <h3>
              Please enter the Email ID where you want to receive this report
            </h3>
            <label>Email ID</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                className="emailText"
                placeholder="Enter your email ID"
                onChange={captureEmail}
                value={email}
              />
              {email !== '' ? (
                <span className="crossIcon" onClick={emptyEmail}>
                  <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/closeIcon.svg" />
                </span>
              ) : null}
            </div>
            {errors.email && <p className="help is-danger">{errors.email}</p>}
          </div>
        ) : (
          <div className="successfullContainer">
            <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/successful-icon.svg" />
            <p>{props.successMessage}</p>
          </div>
        )}
      </div>
      <div className={classes.drawerfooter}>
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={sendMail}
        >
          {props.state === 'enterEmail' ? 'Send Mail' : 'Ok, Got it'}
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
