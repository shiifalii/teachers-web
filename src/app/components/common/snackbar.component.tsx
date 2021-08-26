import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import styled from '@material-ui/core/styles/styled';

interface snackBarProps {
  message?: string;
  mode?: 'error' | 'warning' | 'success';
  state?: boolean;
  onClose?: () => void;
  autoHideDuration?: number;
}

const Message = styled('span')({
  display: 'flex',
  alignItems: 'center',
});

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SimpleSnackbar = (props: snackBarProps) => {
  const { message, state, mode, onClose, autoHideDuration = 5000 } = props;

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={Boolean(state)}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
    >
      <Alert severity={mode} onClose={handleClose}>
        <Message>{message}</Message>
      </Alert>
    </Snackbar>
  );
};

export default SimpleSnackbar;
