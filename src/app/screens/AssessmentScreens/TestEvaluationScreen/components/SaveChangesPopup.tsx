import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

interface Props {
  open: boolean;
  onClose: () => void;
  progress: number;
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

const DialogEdit = styled(Dialog)`
  .MuiDialog-paperWidthSm {
    max-width: 540px;
    width: 100%;
    padding: 25px;
  }
  .MuiLinearProgress-root {
    border-radius: 10px;
    border: 1px solid #dcdcdc;
    height: 19px;
    margin: 10px 0;
  }

  .MuiLinearProgress-colorPrimary {
    background-color: transparent;
  }

  .MuiLinearProgress-barColorPrimary {
    background-color: #1d7dea;
    margin: 3px;
    border-radius: 15px;
  }
`;

function PublishResultPopup(props: Props) {
  const { open, onClose, progress } = props;

  if (!open) {
    return null;
  }
  return (
    <DialogEdit onClose={onClose} aria-labelledby="publish-result" open={open}>
      <DialogContent>
        <p>
          <img
            width="100"
            src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/save-icon.svg"
          />
        </p>
        <LinearProgress variant="determinate" value={progress} />
        <DialogBodyText>Saving all changes...</DialogBodyText>
      </DialogContent>
      <DialogActions>
        <CTAButton
          autoFocus
          onClick={onClose}
          color="primary"
          variant="contained"
          disabled={progress < 100}
        >
          Done
        </CTAButton>
      </DialogActions>
      <br />
    </DialogEdit>
  );
}

const CTAButton = styled(Button)`
  @media (min-width: 768px) {
    min-width: 140px;
  }
`;

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
  '.MuiButton-contained.Mui-disabled': {
    backgroundColor: '#1d7dea',
    color: '#fff',
    opacity: '0.4',
  },
}))(MuiDialogActions);

export default PublishResultPopup;
