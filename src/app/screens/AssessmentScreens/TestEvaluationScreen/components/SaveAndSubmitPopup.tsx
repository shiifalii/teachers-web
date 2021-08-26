import React from 'react';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';

interface Props {
  open: boolean;
}

const DialogBodyText = styled.div`
  font-size: 24px;
  color: #333;
  font-weight: 400;
  line-height: 24px;
  @media (max-width: 768px) {
    font-size: 14px;
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

const Img = styled.img`
  width: 200px;
  @media (max-width: 768px) {
    width: 100px;
  }
`;

function SaveAndSubmitPopup(props: Props) {
  const { open } = props;

  if (!open) {
    return null;
  }
  return (
    <DialogEdit
      onClose={() => {}}
      aria-labelledby="saving and publishing result"
      open={open}
    >
      <DialogContent>
        <p>
          <Img
            src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/saving-uploading.gif"
            alt="saving and submitting"
          />
        </p>
        <DialogBodyText>Saving and submitting...</DialogBodyText>
      </DialogContent>

      <br />
    </DialogEdit>
  );
}

const DialogContent = withStyles(() => ({
  root: {
    padding: '1rem 2rem',
    textAlign: 'center',
  },
}))(MuiDialogContent);

export default SaveAndSubmitPopup;
