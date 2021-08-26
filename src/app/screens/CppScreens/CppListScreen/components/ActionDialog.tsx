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
import { useStyles } from '../styles';
interface IActionDialog {
  onClose: any;
  open: any;
  type: string;
  dialogBody?: string;
  payload?: any;
  handleActionButtonLeft?: (...args: any) => void;
  handleActionButtonRight?: (...args: any) => void;
}

export default function ActionDialog({
  onClose,
  open,
  type,
  dialogBody,
  payload,
  handleActionButtonLeft = () => {},
  handleActionButtonRight = () => {},
}: IActionDialog) {
  const handleClose = () => {
    onClose();
  };
  const classes = useStyles();
  let typoGraphyHeading;
  switch (type) {
    case 'delete':
      typoGraphyHeading = 'Delete Test';
      break;
    case 'assignment-update-success':
      typoGraphyHeading = 'Updated';
      break;
    case 'cpp-assign-review':
      typoGraphyHeading = 'Review Assignment Details';
      break;
    case 'cpp-reassign-review':
      typoGraphyHeading = 'Review Assignment Details';
      break;
    case 'cpp-unassign-all':
      typoGraphyHeading = 'Attention';
      break;
  }

  return (
    <Dialog
      classes={{ paper: classes.dialogpaper }}
      className={classes.DialogBody}
      onClose={handleClose}
      open={open}
    >
      <DialogTitle className={classes.DialogHeader}>
        <Typography className="header-title">{typoGraphyHeading}</Typography>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.DialogContent1}>
        {/* delete Text */}
        {type === 'nodelete' ? (
          <div id="alert-dialog-description">
            <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/deleteWarningIcon.svg" />
            <p>
              You cannot delete this CPP as it has already been <br />
              assigned to the students.
            </p>
          </div>
        ) : null}

        {/* for delete */}
        {type === 'delete' ? (
          <div>
            <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/deleteIcon.svg" />
            <p>
              Do you want to delete this test?
              <br />
              This step cannot be undone
            </p>
          </div>
        ) : null}

        {/* For Assignment timeslot edit successful */}
        {type === 'assignment-update-success' && (
          <div>
            <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/assignedIcon.svg" />
            <p>CPP Test Window has been updated sucessfully.</p>
          </div>
        )}

        {/* Review */}
        {(type === 'cpp-assign-review' || type === 'cpp-reassign-review') && (
          <div>
            <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/reviewIcon.svg" />
            <p></p>
            <p>{dialogBody}</p>
          </div>
        )}
        {type === 'cpp-assign-success' && (
          <div>
            <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/assignedIcon.svg" />
            <p>CPP has been assigned sucessfully.</p>
          </div>
        )}

        {type === 'cpp-unassign-all' && (
          <div>
            <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/attentionIcon.svg" />
            <p>
              You can’t lock the test before the Test Window expires. Change
              <br /> the due date to reduce the duration of the Test Window.
            </p>
          </div>
        )}

        {/* attention Text */}
        {/* <DialogContentText>
          <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/attentionIcon.svg"/>
        <p>You can’t lock the test before the Test Window expires. Change<br/> the due date to reduce the duration of the Test Window.</p>
        </DialogContentText> */}

        {/* Review */}
        {/* <DialogContentText>
          <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/reviewIcon.svg"/>
       <p>Test '{'Test Name'}' is scheduled from '{'Start date and time'}' to <br/> '{'due date and time'}' and assigned to 216 Students in 12 batches.</p>
        </DialogContentText>
      </DialogContent> */}

        {/* Assigned */}
        {/* <DialogContentText>
          <img src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/assignedIcon.svg" />
          <p>CPP has been assigned sucessfully.</p>
        </DialogContentText> */}
      </DialogContent>
      <DialogActions className={classes.dialogFooter}>
        {type === 'nodelete' ? (
          <Button
            onClick={onClose}
            variant="contained"
            color="primary"
            style={{ width: '100px' }}
          >
            Got it
          </Button>
        ) : null}

        {/* for delete */}
        {type === 'delete' ? (
          <>
            <Button
              onClick={handleClose}
              variant="outlined"
              color="primary"
              style={{ width: '100px' }}
            >
              No
            </Button>
            <Button
              onClick={() => handleActionButtonRight('delete')}
              variant="contained"
              color="primary"
              style={{ width: '100px' }}
            >
              Yes
            </Button>
          </>
        ) : null}

        {/* For assesment update timeslot */}
        {type === 'assignment-update-success' && (
          <Button
            onClick={handleClose}
            variant="contained"
            color="primary"
            style={{ width: '100px' }}
          >
            Done
          </Button>
        )}

        {type === 'cpp-assign-review' && (
          <>
            <Button
              onClick={() => handleActionButtonLeft(type)}
              variant="outlined"
              color="primary"
              style={{ width: '100px' }}
            >
              Back
            </Button>
            <Button
              onClick={() => handleActionButtonRight(type, payload)}
              variant="contained"
              color="primary"
              style={{ width: '100px' }}
            >
              Confirm
            </Button>
          </>
        )}
        {type === 'cpp-assign-success' && (
          <Button
            onClick={handleClose}
            variant="contained"
            color="primary"
            style={{ width: '100px' }}
          >
            Done
          </Button>
        )}
        {type === 'cpp-reassign-review' && (
          <Button
            onClick={() => handleActionButtonRight(type, payload)}
            variant="contained"
            color="primary"
            style={{ width: '100px' }}
          >
            Confirm
          </Button>
        )}

        {type === 'cpp-unassign-all' && (
          <Button
            onClick={handleClose}
            variant="contained"
            color="primary"
            style={{ width: '100px' }}
          >
            Done
          </Button>
        )}

        {/* attention Text */}
        {/* <Button onClick={handleClose} variant="contained" color="primary" style={{width:'100px'}}>
          Done
        </Button> */}

        {/* Review */}
        {/* <Button onClick={handleClose} variant="outlined" color="primary" style={{width:'100px'}}>
          Back
        </Button>
        <Button onClick={handleClose} variant="contained" color="primary" style={{width:'100px'}}>
          Confirm
        </Button> */}

        {/* Assigned */}
        {/* <Button
          onClick={handleClose}
          variant="contained"
          color="primary"
          style={{ width: '100px' }}
        >
          Done
        </Button> */}
      </DialogActions>
    </Dialog>
  );
}
