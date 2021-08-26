import React from 'react';
import {
  DialogTitle,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { useStyles } from './style';
interface IActionDialog {
  onClose: any;
  open: any;
  type: any;
  viewBatchData: any;
  count: any;
}

export default function ActionDialogChapterTest({
  onClose,
  open,
  type,
  viewBatchData,
  count,
}: IActionDialog) {
  const handleClose = () => {
    onClose();
  };
  const classes = useStyles();

  const monthNames = [
    'Jan',
    'Feb',
    'March',
    'April',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];

  const getDisplayDate = (date: any) => {
    const convertedDate = new Date(date);
    return (
      convertedDate.getDate() +
      ' ' +
      monthNames[convertedDate.getMonth()] +
      ' ' +
      convertedDate.getFullYear()
    );
  };

  const getDisplayTime = (date: any) => {
    const convertedDate = new Date(date);
    return (
      (convertedDate.getHours() % 12) +
      ':' +
      (convertedDate.getMinutes() > 9
        ? convertedDate.getMinutes()
        : '0' + convertedDate.getMinutes()) +
      ' ' +
      (convertedDate.getHours() > 11 ? 'PM' : 'AM')
    );
  };

  return (
    <>
      {type !== 'viewbatch' ? (
        <Dialog
          classes={{ paper: classes.dialogpaper }}
          className={classes.DialogBody}
          onClose={handleClose}
          open={open}
        >
          <DialogTitle className={classes.DialogHeader}>
            <Typography className="header-title">
              {type === 'lockTest'
                ? 'Attention'
                : type === 'assignedsuccess'
                ? 'Assigned'
                : 'Update'}
            </Typography>
            <IconButton
              aria-label="close"
              onClick={onClose}
              className={classes.closeButton}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent className={classes.DialogContent1}>
            {type === 'assignedsuccess' ? (
              <div id="alert-dialog-description">
                <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/assignedIcon.svg" />
                <p>Test has been assigned sucessfully.</p>
              </div>
            ) : null}

            {type === 'editsuccess' ? (
              <div id="alert-dialog-description">
                <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/assignedIcon.svg" />
                <p>Test has been Updated sucessfully.</p>
              </div>
            ) : null}

            {/* Attention */}
            {type === 'locktest' ? (
              <div id="alert-dialog-description">
                <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/attentionIcon.svg" />
                <p>
                  You can’t lock the test before the Test Window expires. Change
                  the due date to reduce the duration of the Test Window.
                </p>
              </div>
            ) : null}
          </DialogContent>
          <DialogActions
            style={{ justifyContent: 'center', paddingBottom: '30px' }}
          >
            <Button
              onClick={handleClose}
              variant="contained"
              color="primary"
              style={{ width: '100px' }}
            >
              {type === 'assignedsuccess' ? 'Confirm' : 'Done'}
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        <Dialog
          classes={{ paper: classes.dialogpaper }}
          className={classes.DialogBody}
          onClose={handleClose}
          open={open}
        >
          <DialogTitle className={classes.DialogHeader}>
            <Typography className="header-title">View List</Typography>
            <IconButton
              aria-label="close"
              onClick={onClose}
              className={classes.closeButton}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent className={classes.DialogContent}>
            <div tabIndex={-1}>
              <div className={classes.ListHeading}>
                <h5>
                  <b>Assigned On</b> :{' '}
                  {getDisplayDate(viewBatchData.assignedDate)} at{' '}
                  {getDisplayTime(viewBatchData.assignedDate)}
                </h5>
              </div>
              <ul className={classes.batchList}>
                <li>
                  <h3>Batch List</h3>
                </li>
                {viewBatchData.batches &&
                  viewBatchData.batches.length > 0 &&
                  viewBatchData.batches.map((batchData: any, index: any) => (
                    <li key={index}>{batchData.name}</li>
                  ))}
              </ul>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
