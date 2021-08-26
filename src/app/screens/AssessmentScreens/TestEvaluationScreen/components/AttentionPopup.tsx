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
  onConfirm: () => void;
  title: string;
  body: string;
  negativeCTAText?: string;
  positiveCTAText: string;
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

function AttentionPopup(props: Props) {
  const {
    open,
    onClose,
    onConfirm,
    title,
    body,
    negativeCTAText,
    positiveCTAText,
  } = props;

  if (!open) {
    return null;
  }
  return (
    <Dialog onClose={onClose} aria-labelledby="publish-result" open={open}>
      <DialogTitle id="customized-dialog-title" onClose={onClose}>
        <DialogTitleEdit>{title}</DialogTitleEdit>
      </DialogTitle>
      <DialogContent>
        <p>
          <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/attention-rounded-icon.svg" />
        </p>
        <DialogBodyText>{body}</DialogBodyText>
      </DialogContent>
      <DialogActions>
        <CTAButton onClick={onClose} color="primary" variant="outlined">
          {negativeCTAText || `No, Cancel`}
        </CTAButton>
        <CTAButton
          autoFocus
          onClick={onConfirm}
          color="primary"
          variant="contained"
        >
          {positiveCTAText}
        </CTAButton>
      </DialogActions>
      <br />
    </Dialog>
  );
}

const CTAButton = styled(Button)`
  text-transform: capitalize;
  @media (min-width: 768px) {
    min-width: 140px;
  }
`;

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

export default AttentionPopup;
