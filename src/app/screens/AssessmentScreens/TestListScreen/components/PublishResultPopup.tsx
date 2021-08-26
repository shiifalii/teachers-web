import React, { useEffect } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const DialogBodyText = styled.div`
  font-size: 16px;
  line-height: 24px;
  color: #666666;
  @media (max-width: 768px) {
    br {
      display: none;
    }
  }
`;

const DialogTitleEdit = styled.div`
  font-weight: normal;
  font-size: 24px;
  line-height: 34px;
  color: #333;
`;

function PublishResultPopup(props: Props) {
  const { open, onClose, onSubmit } = props;

  function publishResult() {
    // Send request to publish the result
    onSubmit();
    // onClose();
  }

  if (!open) {
    return null;
  }
  return (
    <Dialog onClose={onClose} aria-labelledby="publish-result" open={open}>
      <DialogTitle id="customized-dialog-title" onClose={onClose}>
        <DialogTitleEdit> Publish result</DialogTitleEdit>
      </DialogTitle>
      <DialogContent>
        <p>
          <PublishIcon />
        </p>
        <DialogBodyText>
          {' '}
          Are you sure you wish to publish the result for all <br /> students?
        </DialogBodyText>
      </DialogContent>
      <DialogActions>
        <CTAButton onClick={onClose} color="primary" variant="outlined">
          No
        </CTAButton>
        <CTAButton
          autoFocus
          onClick={publishResult}
          color="primary"
          variant="contained"
        >
          Yes
        </CTAButton>
      </DialogActions>
      <br />
    </Dialog>
  );
}

const CTAButton = styled(Button)`
  @media (min-width: 768px) {
    min-width: 140px;
  }
`;

const PublishIcon = () => (
  <svg
    width="90"
    height="90"
    viewBox="0 0 90 90"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M82.89 2.79004H7.11C4.41 2.79004 2.25 4.95004 2.25 7.65004V75.06C2.25 77.76 4.41 79.92 7.11 79.92H34.02C34.65 79.92 35.1 79.47 35.1 78.84V74.7C35.1 74.07 34.65 73.62 34.02 73.62H8.55V27.81H81.45V73.62H56.07C55.44 73.62 54.99 74.07 54.99 74.7V78.84C54.99 79.47 55.44 79.92 56.07 79.92H82.98C85.68 79.92 87.84 77.76 87.84 75.06V7.74004C87.75 4.95004 85.59 2.79004 82.89 2.79004ZM81.45 21.51H8.55V9.09004H81.45V21.51Z"
      fill="#1D7DEA"
    />
    <path
      d="M15.0299 18.1799C16.6205 18.1799 17.9099 16.8905 17.9099 15.2999C17.9099 13.7093 16.6205 12.4199 15.0299 12.4199C13.4393 12.4199 12.1499 13.7093 12.1499 15.2999C12.1499 16.8905 13.4393 18.1799 15.0299 18.1799Z"
      fill="#1D7DEA"
    />
    <path
      d="M23.4 18.1799C24.9906 18.1799 26.28 16.8905 26.28 15.2999C26.28 13.7093 24.9906 12.4199 23.4 12.4199C21.8094 12.4199 20.52 13.7093 20.52 15.2999C20.52 16.8905 21.8094 18.1799 23.4 18.1799Z"
      fill="#1D7DEA"
    />
    <path
      d="M31.6798 18.1799C33.2704 18.1799 34.5598 16.8905 34.5598 15.2999C34.5598 13.7093 33.2704 12.4199 31.6798 12.4199C30.0892 12.4199 28.7998 13.7093 28.7998 15.2999C28.7998 16.8905 30.0892 18.1799 31.6798 18.1799Z"
      fill="#1D7DEA"
    />
    <path
      d="M55.2602 55.7103C55.8002 56.2503 56.6102 56.6103 57.3302 56.6103C58.0502 56.6103 58.8602 56.3403 59.4002 55.7103C60.5702 54.5403 60.5702 52.7403 59.4002 51.5703L47.0702 39.2403C45.9002 38.0703 44.1002 38.0703 42.9302 39.2403L30.6002 51.5703C29.4302 52.7403 29.4302 54.5403 30.6002 55.7103C31.7702 56.8803 33.5702 56.8803 34.7402 55.7103L42.0302 48.4203V84.2403C42.0302 85.8603 43.3802 87.2103 45.0002 87.2103C46.6202 87.2103 47.9702 85.8603 47.9702 84.2403V48.4203L55.2602 55.7103Z"
      fill="#1D7DEA"
    />
  </svg>
);

const styles = () =>
  createStyles({
    root: {
      margin: 0,
      padding: '1rem',
      textAlign: 'center',
    },
    closeButton: {
      position: 'absolute',
      right: '0.5rem',
      top: '0.5rem',
      color: '#666666',
    },
  });

interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(() => ({
  root: {
    padding: '1rem 2rem',
    textAlign: 'center',
  },
}))(MuiDialogContent);

const DialogActions = withStyles(() => ({
  root: {
    margin: 0,
    padding: '0.5rem',
    justifyContent: 'center',
  },
}))(MuiDialogActions);

export default PublishResultPopup;
