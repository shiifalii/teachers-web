import React, { useState } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { InputContainer, Button, Center } from '../atoms';
import { forgetPasswordRequest } from '../../helpers/public.api.helper';
import FormControl from '@material-ui/core/FormControl';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { ErrorMsgEdit } from 'app/components/common/login.styled.components';

export interface ModalProps {
  onClose?: () => void;
  userId: any;
  setUserId: any;
}

const useStyles = makeStyles({
  title: {
    fontSize: '24px',
    fontWeight: 'normal',
    textAlign: 'center',
    fontFamily: 'rubik',
    color: '#666666',
  },
});

const ForgetPasswordContainer = styled.div`
  padding: 2em;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const ButtonEdit = styled(Button as any)`
  margin-top: 20px;
`;

const ForgetPasswordComponent = function(props: ModalProps) {
  const { onClose } = props;
  const classes = useStyles();
  const { userId, setUserId } = props;

  const [forgetPasswordSubmitState, setForgetPasswordSubmitState] = useState(
    false,
  );
  const [forgotPasswordError, setForgotPasswordError] = useState(null);
  const forgetPassword = async (e: any) => {
    e.preventDefault();
    setForgotPasswordError(null);
    const res = await forgetPasswordRequest({
      username: userId,
    });
    if (res.data.code === 200) {
      setForgetPasswordSubmitState(true);
    } else {
      setForgotPasswordError(res.data.message);
    }
  };

  const isOptionDisabled = () => {
    return !!userId.length;
  };

  return (
    <div>
      <h2 className={classes.title}>Forget Password</h2>
      {!forgetPasswordSubmitState ? (
        <>
          <InputContainer>
            <FormControl fullWidth={true}>
              <TextField
                label="User ID"
                type={'text'}
                value={userId}
                onChange={e => {
                  setUserId(e.target.value);
                }}
                variant="outlined"
                fullWidth={true}
              />
            </FormControl>
          </InputContainer>
        </>
      ) : (
        <ForgetPasswordContainer>
          <p>
            Link to reset your password has been sent to your <br />
            registered email id. Please login to your email and follow <br />
            the steps to reset your password.
          </p>
        </ForgetPasswordContainer>
      )}
      {forgotPasswordError && (
        <ErrorMsgEdit>{forgotPasswordError}</ErrorMsgEdit>
      )}
      {!forgetPasswordSubmitState ? (
        <Center>
          <ButtonEdit
            onClick={(event: any) => forgetPassword(event)}
            disabled={!isOptionDisabled()}
          >
            Reset Password
          </ButtonEdit>
        </Center>
      ) : (
        <Center>
          <Button onClick={onClose}>Okay, Got it</Button>
        </Center>
      )}
    </div>
  );
};

export default ForgetPasswordComponent;
