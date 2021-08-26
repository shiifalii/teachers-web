import React, { useState } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { sliderProps, PASSWORD_IMAGES } from 'app/constants/data.constants';
import { Button } from 'app/components/atoms/button';
import {
  LoginContainer as Container,
  ErrorMsgEdit,
  FormEdit,
  GridContainer,
  InputContainerEdit,
  LoginCard as Card,
  ShowPassword,
} from 'app/components/common/login.styled.components';
import { updatePasswordRequest } from 'app/helpers/public.api.helper';
import { useHistory } from 'react-router-dom';
import Slider from 'app/components/atoms/slider/slider.component';

import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import { Right } from 'app/components';

const ErrorContainer = styled.div`
  margin: 11px 0 20px 0;
`;

const showPassword = (setShowPassword: any, password: boolean) => {
  return {
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={() => {
            setShowPassword((prevPassword: boolean) => !prevPassword);
          }}
        >
          <ShowPassword src={PASSWORD_IMAGES(password)} alt="" />
        </IconButton>
      </InputAdornment>
    ),
  };
};

const ResetPasswordScreen = function(props: any) {
  const { newPassword, confirmPassword } = props;
  const {
    setNewPassword,
    setConfirmPassword,
    setIsPasswordResetSuccessful,
  } = props;
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);

  const [resetPasswordError, setResetPasswordError] = useState(null);

  const history = useHistory();

  const resetPassword = async (e: any) => {
    e.preventDefault();
    setResetPasswordError(null);

    // Get secret from query params
    const params = new URLSearchParams(history.location.search);
    const secret = params.get('secret')!;

    const res = await updatePasswordRequest(secret, {
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    });
    if (res.data.code === 200) {
      setIsPasswordResetSuccessful(true);
      history.push('/login');
    } else {
      setResetPasswordError(res.data.message);
    }
  };

  const isValidInputs = function() {
    if (newPassword.length > 0 && confirmPassword === newPassword) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      <Container>
        <Card>
          <img
            src="https://mypat-v2-prod.s3-us-west-2.amazonaws.com/webcontent/web_img/teacher-v3/mypat-teachers-logo.svg"
            alt=""
          />
          <GridContainer>
            <div>
              <Slider height={400} width={535} sliderProps={sliderProps} />
            </div>
            <div>
              <FormEdit>
                <h1>Reset Password</h1>
                <p>Please create a new password</p>

                <InputContainerEdit>
                  <FormControl fullWidth={true}>
                    <TextField
                      label="New Password"
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={e => {
                        setNewPassword(e.target.value);
                      }}
                      variant="outlined"
                      fullWidth={true}
                      InputProps={showPassword(
                        setShowNewPassword,
                        showNewPassword,
                      )}
                    />
                  </FormControl>
                </InputContainerEdit>

                <InputContainerEdit>
                  <FormControl fullWidth={true}>
                    <TextField
                      label="Confirm Password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={e => {
                        setConfirmPassword(e.target.value);
                      }}
                      variant="outlined"
                      fullWidth={true}
                      InputProps={showPassword(
                        setshowConfirmPassword,
                        showConfirmPassword,
                      )}
                    />
                  </FormControl>
                </InputContainerEdit>

                <ErrorContainer>
                  <span>
                    {resetPasswordError && (
                      <ErrorMsgEdit>{resetPasswordError}</ErrorMsgEdit>
                    )}
                  </span>
                </ErrorContainer>

                <Right>
                  <Button onClick={resetPassword} disabled={!isValidInputs()}>
                    Reset Password
                  </Button>
                </Right>
              </FormEdit>
            </div>
          </GridContainer>
        </Card>
      </Container>
    </div>
  );
};

export default ResetPasswordScreen;
