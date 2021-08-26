import React from 'react';
import { Dialog, DialogContent, DialogContentText } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import { Theme, withStyles } from '@material-ui/core/styles';
import { Styles } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import classes from '*.module.css';
import { useStyles } from '../styles';
import LoaderWrapper from 'app/components/common/loader.wrapper.component';
import { isLoading } from 'app/helpers/comman.helper';
const styles: Styles<Theme, any, string> = (theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    width: '540px',
    '@media (max-width: 768px)': {
      minWidth: '400px',
    },
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props: any) => {
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

interface IStudentListDialog {
  onClose: any;
  open: any;
  dataPassed: any;
}

export default function BatchStudentListDialog({
  onClose,
  open,
  dataPassed,
}: IStudentListDialog) {
  const handleClose = () => {
    onClose();
  };

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

  const getDate = (date: string) => {
    const convertedDate = new Date(date);
    return (
      convertedDate.getDate() +
      ' ' +
      monthNames[convertedDate.getMonth()] +
      ' ' +
      convertedDate.getFullYear()
    );
  };

  const getTime = (date: string) => {
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

  const classes = useStyles();
  return (
    <Dialog
      className={classes.DialogBody}
      open={open}
      onClose={handleClose}
      scroll="paper"
      classes={{ paper: classes.dialogpaper2 }}
    >
      <LoaderWrapper isLoading={isLoading(dataPassed.apiState)}>
        <DialogTitle className={classes.DialogHeader} onClose={handleClose}>
          View List
        </DialogTitle>
        <DialogContent className={classes.DialogContent}>
          <div tabIndex={-1}>
            <div className={classes.ListHeading}>
              <h5>Batch & Students List</h5>
              {dataPassed && dataPassed.data && dataPassed.data.assignments ? (
                <span>
                  Assigned On :{' '}
                  {getDate(dataPassed.data.assignments.assignedDate)} at{' '}
                  {getTime(dataPassed.data.assignments.assignedDate)}
                </span>
              ) : null}
            </div>
            <ul className={classes.BatchList}>
              {dataPassed &&
              dataPassed.data &&
              dataPassed.data.assignments &&
              dataPassed.data.assignments.batches &&
              dataPassed.data.assignments.batches.length > 0
                ? dataPassed.data.assignments.batches.map((dataShow: any) => (
                    <li key={dataShow.id}>
                      <h3>
                        {dataShow.name}
                        <span>
                          {' '}
                          ({dataShow.studentCount}/{dataShow.students.length})
                        </span>
                      </h3>
                      {dataShow.students && dataShow.students.length > 0
                        ? dataShow.students.map((student: any) => (
                            <p key={student._id}>
                              {student.name}
                              <br />
                              <span>ID : {student.enrollmentNo}</span>
                            </p>
                          ))
                        : null}
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </DialogContent>
      </LoaderWrapper>
    </Dialog>
  );
}
